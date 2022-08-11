import { createStyles, Title } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import React from "react";
import { Button } from "@mantine/core";
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
function LeftColumn() {
    const { channel } = useParams();
    const { classes } = useStyles();
    const socket = useContext(socketContext);
    const theme = useMantineTheme();
    const [channels, setChannels] = useLocalStorage({ key: `${channel}Channels`, defaultValue: ["general"] });

    const [opended, setOpened] = React.useState(false);
    function handleClick(e: React.MouseEvent<HTMLButtonElement>, currChannel: string) {
        socket.emit("joinRoom", { roomName: currChannel }, (response: string) => {
            console.log("Response on joining room = ", response);
        })
    }
    return <div className={classes.left_column_class}>
        <Modal overlayOpacity={0.4} title={<Title order={2}>Create Channel</Title>} radius="md" styles={{
            modal: {
                backgroundColor: theme.colors.discord_palette[1]
            }
        }}
            overlayBlur={1} centered onClose={() => setOpened(false)} opened={opended}>
            <ModalCreateChannel setChannels={setChannels} setOpened={setOpened} />
        </Modal>
        <Button type="button" variant="outline" onClick={() => setOpened(true)}>Create Channel</Button>
        <GroupChannel />
        <Stack justify="center" align="stretch" className={classes.stack_class}>
            {channels.map((channel, index) => (
                <Anchor key={Math.random() * index * 5487} className={classes.leftColumn_channel_button}
                    component={Link} to={channel} align="left" variant="text" size="md"
                    onClick={(e: any) => handleClick(e, channel)}>
                    <HiHashtag color={theme.colors.discord_palette[6]} /> {channel}
                </Anchor>
            ))}
        </Stack>
        <ProfileComponent />
    </div>
}
export default LeftColumn;