import { createStyles } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import React from "react";
import { Button } from "@mantine/core";
// import { useFocusReturn } from "@mantine/hooks";
const useStyles = createStyles((theme, _params, getRef) => ({
    left_column_class: {
        backgroundColor: theme.colors.discord_palette[2],
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
        <Modal overlayOpacity={0.8} styles={{
            body: {
                backgroundColor: theme.colorScheme === "dark" ?
                    theme.colors.discord_palette[2] : "white"
            }
        }}
            overlayBlur={1} centered onClose={() => setOpened(false)} opened={opended}>
            I am a modal
        </Modal>
        <Button type="button" variant="outline" onClick={() => setOpened(true)}>Create Channel</Button>
    </div>
}
export default LeftColumn;