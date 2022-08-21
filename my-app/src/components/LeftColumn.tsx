import { createStyles, Title } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import React from "react";
import { Stack } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import ModalCreateChannel from "./CreateChannelModal";
import { Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import { HiHashtag } from "react-icons/hi";
import GroupChannel from "./GroupChannel";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { socketContext } from "../globalImports";
import ProfileComponent from "./ProfileComponent";
import OptionsComponent from "./OptionsComponent";
import { useQuery } from "@tanstack/react-query";
import { Room } from "./interfaces/interfaces";
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
    const { channel, id } = useParams();
    const { classes } = useStyles();
    const socket = useContext(socketContext);
    const theme = useMantineTheme();
    const { data, isSuccess } = useQuery(["namespace", channel, id, "rooms"], fetchRooms,
        { refetchOnWindowFocus: false });
    const [, setChannels] = useLocalStorage({ key: `${channel}Channels`, defaultValue: ["general"] });

    const [opended, setOpened] = React.useState(false);
    function handleClick(e: React.MouseEvent<HTMLButtonElement>, currChannel: string) {
        socket.emit("joinRoom", { roomName: currChannel }, (response: string) => {
            console.log("Response on joining room = ", response);
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
        <GroupChannel />
        <Stack justify="center" align="stretch" className={classes.stack_class}>
            {
                isSuccess ? data.map((room: Room, index: number) => (
                    <Anchor key={Math.random() * index * 5487} className={classes.leftColumn_channel_button}
                        component={Link} to={room.roomName} align="left" variant="text" size="md"
                        onClick={(e: any) => handleClick(e, room.roomName)}>
                        <HiHashtag color={theme.colors.discord_palette[6]} /> {room.roomName}
                    </Anchor>))
                    : ""
            }
        </Stack>
        <ProfileComponent />
    </div>
}
export default LeftColumn;