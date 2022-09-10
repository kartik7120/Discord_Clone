import { Outlet } from "react-router-dom";
import { clsx, createStyles, Skeleton, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import ProfileComponent from "./ProfileComponent";
import { socket } from "../globalImports";
import { socketContext } from "../globalImports";
import FriendChannel from "./FriendRoom";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "@mantine/hooks";
import { friend } from "./interfaces/interfaces";
import React from "react";
const useStyles = createStyles((theme, _params, getRef) => ({
    left_column_class: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.discord_palette[2] : theme.fn.darken(theme.white, 0.1),
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
        width: "20%"
    },
    grid_wrapper: {
        display: "grid",
        gridTemplateColumns: "minmax(0,3fr) minmax(0,1fr)",
        width: "100%",
        height: "100vh"
    },
    text_class: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black
    },
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}))
function FriendsBar() {
    const theme = useMantineTheme();
    const { user } = useAuth0();
    const { classes } = useStyles();
    const [friends] = useLocalStorage<friend[]>({ key: `${user?.sub}-friends`, defaultValue: [] });
    React.useEffect(function () {
        if (socket.connected === false)
            socket.connect();
        socket.on("connection", () => {
            console.log(`socket ${socket.id} connected`);
        })
        return () => { // this will run on unmount
            console.log("disconnecting from namespace");
            socket.emit("disconnect_namespace", socket.id);
            socket.disconnect();
        }
    }, [])
    return <>
        <socketContext.Provider value={socket}>
            <div className={clsx(classes.left_column_class, "Friends-bar")}>
                <Text size="xl" className={classes.text_class}>Direct Messages</Text>
                {friends && friends.length > 0 ? friends.map((friend, index: number) => {
                    return <FriendChannel {...friend} key={Math.random() * 565 * index} />
                }) : ""}
                <ProfileComponent />
            </div>
            <Outlet />
        </socketContext.Provider>
    </>
}
export default FriendsBar;