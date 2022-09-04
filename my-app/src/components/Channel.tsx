import LeftColumn from "./LeftColumn";
import { createStyles } from "@mantine/core";
import { Outlet, useParams } from "react-router-dom";
import React from "react";
import { socket } from "../globalImports";
import { socketContext } from "../globalImports";
import { useLocalStorage } from "@mantine/hooks";
const useStyles = createStyles((theme, _params, getRef) => ({
    grid_wrapper: {
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,3fr) minmax(0,1fr)",
        width: "100%",
        height: "100vh"
    }
}))
function Channel() {
    const { classes } = useStyles();
    const { channel, id } = useParams();
    const [users,] = useLocalStorage<string[]>({ key: `${channel}-${id}`, defaultValue: [] });
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
