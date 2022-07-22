import { createStyles } from "@mantine/core";
import { Textarea } from "@mantine/core";
const useStyles = createStyles((theme, _params, getRef) => ({
    middle_column_class: {
        backgroundColor: theme.colors.discord_palette[2],
        padding: "2em",
        position: "relative"
    }
}))
function MiddleColumn() {
    const { classes } = useStyles();
    return <div className={classes.middle_column_class}>
        <span >I am a middle column</span>
        <Textarea placeholder="Enter your message" autosize minRows={1} />
    </div>

}
export default MiddleColumn;