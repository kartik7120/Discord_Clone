import LeftColumn from "./LeftColumn";
import { createStyles } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, useParams } from "react-router-dom";
import React from "react";
// import { socket as socket2 } from "../globalImports";
import { connectNamespace, socketContext } from "../globalImports";
import { useLocalStorage } from "@mantine/hooks";
import { io } from "socket.io-client";
const useStyles = createStyles((theme, _params, getRef) => ({
    grid_wrapper: {
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,3fr) minmax(0,1fr)",
        width: "100%",
        height: "100vh"
    }
}))
function Channel() {
    const { user } = useAuth0();
    const { classes } = useStyles();
    const { channel, id } = useParams();
    const [socket,] = useLocalStorage({
        key: "socket", defaultValue: io(`http://localhost:4000/`, {
            auth: {
                userName: user?.name,
                userSub: user?.sub,
                userPicture: user?.picture
            }
        })
    })
    const [users, setUsers] = useLocalStorage<string[]>({ key: `${channel}-${id}`, defaultValue: [] });
    // const [state,] = React.useState(connectNamespace(channel!, user?.sub!, user?.picture!, user?.name!));
    React.useEffect(function () {
        if (socket.connected === false)
            socket.connect();
        socket.on("connection", () => {
            console.log(`socket ${socket.id} connected`);
        })
        return () => { // this will run on unmount
            console.log("disconnecting from namespace");
            socket.emit("disconnect_namespace", socket.id, users);
            socket.disconnect();
        }
    }, [])
    return <socketContext.Provider value={socket}>
        <div className={classes.grid_wrapper}>
            <LeftColumn />
            <Outlet />
        </div>
    </socketContext.Provider>
}
export default Channel;
// socket.on("disconnect", () => {
//   socket.connect();
// });
