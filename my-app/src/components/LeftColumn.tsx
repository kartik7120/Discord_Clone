import { createStyles, Title } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import React from "react";
import { Button } from "@mantine/core";
import ModalCreateChannel from "./CreateChannelModal";
// import { useFocusReturn } from "@mantine/hooks";
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
    // const returnFocus = useFocusReturn({
    //     opened: false, transitionDuration: 300
    // });
    const [opended, setOpened] = React.useState(false);
    return <div className={classes.left_column_class}>
        <Modal overlayOpacity={0.4} title={<Title order={2}>Create Channel</Title>} radius="md" styles={{
            modal: {
                backgroundColor: theme.colors.discord_palette[1]
            }
        }}
            overlayBlur={1} centered onClose={() => setOpened(false)} opened={opended}>
            <ModalCreateChannel />
        </Modal>
        <Button type="button" variant="outline" onClick={() => setOpened(true)}>Create Channel</Button>
    </div>
}
export default LeftColumn;