import { Text } from "@mantine/core";
import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme, _params, getRef) => ({
    loading_wrapper: {
        backgroundColor: theme.colors.discord_palette[2],
        width: "100%",
        height: "100vh",
        color: theme.white,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))
function LoadingScreen() {
    const { classes } = useStyles();
    return <div className={classes.loading_wrapper}>
        <span>Loading ...</span>
    </div>
}
export default LoadingScreen;