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
const useStyles = createStyles((theme, _params, getRef) => ({
    left_column_class: {
        backgroundColor: theme.colors.discord_palette[2],
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-around",
        alignItems: "center"
    },
    center_button: {
        margin: "0 auto"
    }
}))
function LeftColumn() {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const [channels, setChannels] = useLocalStorage({ key: "channels", defaultValue: ["general"] });

    const [opended, setOpened] = React.useState(false);
    return <div className={classes.left_column_class}>
        <Modal overlayOpacity={0.4} title={<Title order={2}>Create Channel</Title>} radius="md" styles={{
            modal: {
                backgroundColor: theme.colors.discord_palette[1]
            }
        }}
            overlayBlur={1} centered onClose={() => setOpened(false)} opened={opended}>
            <ModalCreateChannel setChannels={setChannels} setOpened={setOpened}/>
        </Modal>
        <Button type="button" variant="outline" onClick={() => setOpened(true)}>Create Channel</Button>
        <Stack justify="center">
            {channels.map((channel, index) => (
                <Anchor component={Link} to={channel}>
                    <Button variant="filled" color={"violet"}>{channel}</Button>
                </Anchor>
            ))}
        </Stack>
    </div>
}
export default LeftColumn;