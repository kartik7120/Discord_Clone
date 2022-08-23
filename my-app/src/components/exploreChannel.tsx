import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
    explore_wrapper: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.discord_palette[1] : theme.white,
        width: "100%"
    }
}))

function ExploreComponents() {
    const { classes } = useStyles();
    return <div className={classes.explore_wrapper}>
        <h1>I am explore component</h1>
    </div>
}
export default ExploreComponents;