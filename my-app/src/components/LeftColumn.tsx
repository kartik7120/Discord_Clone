import { ActionIcon, createStyles, Title } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import React from "react";
import { Stack } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import ModalCreateChannel from "./CreateChannelModal";
import { Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import { HiHashtag } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { socketContext } from "../globalImports";
import ProfileComponent from "./ProfileComponent";
import OptionsComponent from "./OptionsComponent";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Room } from "./interfaces/interfaces";
import { AiFillDelete } from "react-icons/ai";
import { useHover } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { TiTickOutline } from "react-icons/ti";
import { MdOutlineError } from "react-icons/md";
const useStyles = createStyles((theme, _params, getRef) => ({
    left_column_class: {
        backgroundColor: theme.colors.discord_palette[2],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
    },
    leftColumn_channel_button: {
        width: "100%",
        backgroundColor: theme.colorScheme === "dark" ? "#42464d" : "#f2f3f5",
        '&:hover': {
            backgroundColor: theme.fn.darken("#42464d", 0.3)
        },
        textDecoration: "none",
        borderRadius: theme.radius.md,
        color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[5],
        padding: "0.4em",
    },
    stack_class: {
        width: "80%"
    },
    room_class: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative"
    },
    action_class: {
        position: "absolute",
        right: "2%",
        top: "7%",
        bottom: "0%"
    }
}))
async function fetchRooms({ queryKey }: any) {
    const [, , _key3] = queryKey;
    try {
        const URL = `${process.env.REACT_APP_API_URL}namespace/${_key3}`;
        const response = await fetch(URL);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
function LeftColumn() {
    const { ref } = useHover();
    const { channel, id } = useParams();
    const { classes } = useStyles();
    const queryClient = useQueryClient();
    const socket = useContext(socketContext);
    const theme = useMantineTheme();
    const { data, isSuccess } = useQuery(["namespace", channel, id, "rooms"], fetchRooms,
        { refetchOnWindowFocus: false });
    async function fetchUserRoomDelete({ roomId }: any) {
        const URL = `${process.env.REACT_APP_API_URL}namespace/deleteRooms/${id}/rooms/${roomId}`;
        const config = {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            }
        }
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    }
    const { isError, error, mutate, isSuccess: isSuccess2 } = useMutation(["namespace", channel, id, "room"], fetchUserRoomDelete, {
        onSuccess: function (data: Room[], variables: any, context: any) {
            queryClient.setQueryData(["namespace", channel, id, "rooms"], data);
        }
    })
    const [, setChannels] = useLocalStorage({ key: `${channel}Channels`, defaultValue: ["general"] });

    const [opended, setOpened] = React.useState(false);
    function handleClick(e: React.MouseEvent<HTMLButtonElement>, currChannel: string) {
        socket.emit("joinRoom", { roomName: currChannel }, (response: string) => {
            console.log("Response on joining room = ", response);
        })
    }
    function handleDelete(e: React.MouseEvent<HTMLButtonElement>, roomId: string) {
        mutate({ roomId });
    }
    if (isSuccess2) {
        showNotification({
            title: "Room deleted",
            message: "Room deleted successfully",
            icon: <TiTickOutline />,
            autoClose: 2000
        })
    }
    if (isError) {
        showNotification({
            message: `${error}`,
            title: "Error occured deleting room",
            icon: <MdOutlineError />,
            autoClose: 2000
        })
    }
    return <div className={classes.left_column_class}>
        <OptionsComponent setOpened={setOpened} />
        <Modal overlayOpacity={0.4} title={<Title order={2}>Create Channel</Title>} radius="md" styles={{
            modal: {
                backgroundColor: theme.colors.discord_palette[1]
            }
        }}
            overlayBlur={1} centered onClose={() => setOpened(false)} opened={opended}>
            <ModalCreateChannel setChannels={setChannels} setOpened={setOpened} />
        </Modal>
        <Stack justify="center" align="stretch" className={classes.stack_class}>
            {
                isSuccess ? data.map((room: Room, index: number) => (
                    <div className={classes.room_class} key={Math.random() * index * 5487} ref={ref}>
                        <Anchor className={classes.leftColumn_channel_button}
                            component={Link} to={room.roomName} align="left" variant="text" size="md"
                            onClick={(e: any) => handleClick(e, room.roomName)}>
                            <div style={{ alignSelf: "flex-start" }}>
                                <HiHashtag color={theme.colors.discord_palette[6]} style={{ margin: "0.1em" }} />
                                {room.roomName}
                            </div>
                        </Anchor>
                        <ActionIcon onClick={(e: any) => handleDelete(e, room._id)} variant="transparent" className={classes.action_class} color={theme.colors.discord_palette[0]}>
                            <AiFillDelete />
                        </ActionIcon>
                    </div>
                ))
                    : ""
            }
        </Stack>
        <ProfileComponent />
    </div>
}
export default LeftColumn;