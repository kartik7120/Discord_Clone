import { createStyles } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import { useLocalStorage, getHotkeyHandler } from "@mantine/hooks";
import React, { useState } from "react";
const useStyles = createStyles((theme, _params, getRef) => ({
    middle_column_class: {
        backgroundColor: theme.colors.discord_palette[2],
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
    const { classes } = useStyles();
    const [state, setState] = useState("");
    const [message, setMessageState] = useLocalStorage({ key: "messages", defaultValue: [""] });
    function handleChange(e: any) {
        const message: string = e.target.value;
        setState(message);
    }
    function handleMessageSubmit(e: any) {
        setMessageState(function (oldMessages) {
            return [...oldMessages, state];
        })
        setState("");
    }
    return <div className={classes.middle_column_class}>
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
}
export default MiddleColumn;