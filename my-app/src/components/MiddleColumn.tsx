import { createStyles } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
const useStyles = createStyles((theme, _params, getRef) => ({
    middle_column_class: {
        backgroundColor: theme.colors.discord_palette[2],
        padding: "1em",
        position: "relative",
        fontFamily: 'Nunito'
    },
    TextAreaClass: {
        position: "absolute",
        bottom: 23,
        width: "90%",
    }
}))
function MiddleColumn() {
    const { classes } = useStyles();

    return <div className={classes.middle_column_class}>
        <ScrollArea type="hover" style={{ height: "40rem" }}>
            <ol>
                <li>I am a list 1</li>
            </ol>
        </ScrollArea>
        <form action="" method="get">
            <Textarea className={classes.TextAreaClass} placeholder="Enter your message" autosize minRows={1} size={"md"} />
        </form>
    </div>
}
export default MiddleColumn;