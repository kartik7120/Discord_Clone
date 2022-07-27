import { createStyles } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import socket from "../globalImports";
import { getHotkeyHandler } from "@mantine/hooks";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
const useStyles = createStyles((theme, _params, getRef) => ({
    middle_column_class: {
        backgroundColor: theme.colors.discord_palette[1],
        padding: "1em",
        position: "relative",
        fontFamily: 'Nunito',
        color: theme.colorScheme === "dark" ? "white" : "black"
    },
    TextAreaClass: {
        position: "absolute",
        bottom: 23,
        width: "90%",
    },
    listClass: {
        textDecoration: "none",
        listStyle: "none"
    }
}))
function MiddleColumn() {
    const { channelName } = useParams();
    const { classes } = useStyles();
    const [state, setState] = useState("");
    const [message, setMessageState] = useState([""]);
    React.useEffect(() => {
        socket.on("messages", (message) => {
            console.log("Message revieved from backend = ", message);
            setMessageState(function (oldMessages) {
                return [...oldMessages, message];
            })
        })
    }, [])
    function handleChange(e: any) {
        const message: string = e.target.value;
        setState(message);
    }
    function handleMessageSubmit(e: any) {
        socket.emit("message", state, channelName);
        setMessageState(function (oldMessages) {
            return [...oldMessages, state];
        })
        setState("");
    }
    return (
        <>
            <div className={classes.middle_column_class}>
                <ScrollArea type="hover" style={{ height: "40rem" }}>
                    <ol>
                        {message.map((ele: string, index: number) => (
                            <li key={Math.random() * index * 54239} className={classes.listClass}>{ele}</li>
                        ))}
                    </ol>
                </ScrollArea>
                <form action="" method="get">
                    <Textarea className={classes.TextAreaClass} value={state} onChange={handleChange}
                        placeholder="Enter your message"
                        autosize minRows={1} size={"md"} onKeyDown={getHotkeyHandler([
                            ["Enter", handleMessageSubmit]
                        ])} />
                </form>
            </div>
            <Outlet />
        </>
    )
}
export default MiddleColumn;