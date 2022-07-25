import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme, _params, getRef) => ({
    right_column_class: {
        backgroundColor: theme.colors.discord_palette[1],
        borderLeft:"2px solid white"
    }
}))
function RightColumn() {
    const { classes } = useStyles();
    return <div className={classes.right_column_class}>
        <span>I am right</span>
    </div>
}
export default RightColumn;