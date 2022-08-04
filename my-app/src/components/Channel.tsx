import LeftColumn from "./LeftColumn";
import { createStyles } from "@mantine/core";
import { Outlet, useParams } from "react-router-dom";
import React from "react";
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
    const { classes } = useStyles();
    const { channel } = useParams();
    React.useEffect(function () {
        const socket = io(`http://localhost:4000/${channel}`);
        socket.on("connect", () => {
            console.log(`Connected to ${channel} namespace`);
        })
    }, [])
    console.log(channel);
    return <div className={classes.grid_wrapper}>
        <LeftColumn />
        <Outlet />
    </div>
}
export default Channel;