import LeftColumn from "./LeftColumn";
import { createStyles } from "@mantine/core";
import { Outlet, useParams } from "react-router-dom";
import React from "react";
import { connectNamespace, socketContext } from "../globalImports";
// import { nsp as socket } from "../globalImports";
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
    const { channel } = useParams();
    const [state, setState] = React.useState(connectNamespace(channel!));
    React.useEffect(function () {
        // const socket = connectNamespace(channel!);
        state.on("connection", () => {
            console.log(`socket ${state.id} connected`);
        })
        return () => { // this will run on unmount
            console.log("disconnecting from namespace");
            state.emit("disconnect_namespace", state.id);
        }
    }, [state])
    return <socketContext.Provider value={state}>
        <div className={classes.grid_wrapper}>
            <LeftColumn />
            <Outlet />
        </div>
    </socketContext.Provider>
}
export default Channel;