import { Outlet } from "react-router-dom";
import { clsx, createStyles } from "@mantine/core";
import ProfileComponent from "./ProfileComponent";
const useStyles = createStyles((theme, _params, getRef) => ({
    left_column_class: {
        backgroundColor: theme.colors.discord_palette[2],
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative"
    },
}))
function FriendsBar() {
    const { classes } = useStyles();
    return <>
        <div className={clsx(classes.left_column_class, "Friends-bar")}>I am a friends bar
            <ProfileComponent />
        </div>

        <Outlet />
    </>
}
export default FriendsBar;