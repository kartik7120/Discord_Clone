import { Outlet } from "react-router-dom";
import { clsx, createStyles } from "@mantine/core";
import ProfileComponent from "./ProfileComponent";
import FriendChannel from "./FriendRoom";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "@mantine/hooks";
import { friend } from "./interfaces/interfaces";
const useStyles = createStyles((theme, _params, getRef) => ({
    left_column_class: {
        backgroundColor: theme.colors.discord_palette[2],
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative"
    },
}))
function FriendsBar() {
    const { user } = useAuth0();
    const { classes } = useStyles();
    const [friends] = useLocalStorage<friend[]>({ key: `${user?.sub}-friends`, defaultValue: [] });
    return <>
        <div className={clsx(classes.left_column_class, "Friends-bar")}>
            {friends ? friends.map((friend, index: number) => {
                return <FriendChannel {...friend} key={Math.random() * 565 * index} />
            }) : ""}
            <ProfileComponent />
        </div>

        <Outlet />
    </>
}
export default FriendsBar;