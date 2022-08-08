import { createStyles } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import { socketContext } from "../globalImports";
import { getHotkeyHandler } from "@mantine/hooks";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { MdInsertEmoticon } from "react-icons/md";
import { ActionIcon } from "@mantine/core";
import EmojiPicker from "emoji-picker-react";
import { Popover } from '@mantine/core';
import { AiOutlineGif } from "react-icons/ai";
import SearchExperience from "./GiphyComponents/SearchExperience";
import { GiphyFetch } from '@giphy/js-fetch-api';
const useStyles = createStyles((theme, _params, getRef) => ({
    middle_column_class: {
        backgroundColor: theme.colors.discord_palette[1],
        padding: "1em",
        position: "relative",
        fontFamily: 'Nunito',
        color: theme.colorScheme === "dark" ? "white" : "black",
    },
    TextAreaClass: {
        position: "absolute",
        bottom: 23,
        width: "95%",
    },
    listClass: {
        textDecoration: "none",
        listStyle: "none"
    },
    rightSectionClass: {
        display: "flex",
        justifyContent: "space-between"
    }
}))

function MiddleColumn() {
    const gf = new GiphyFetch("V68YK1MFUoaFnLWe6QY41Fd2FDa5xrUk");
    const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 });
    const socket = React.useContext(socketContext);
    const { channelName } = useParams();
    const { classes } = useStyles();
    const [state, setState] = useState("");
    const [chooseEmoji, setChosenEmoji] = useState(null);
    const [message, setMessageState] = useState([""]);
    React.useEffect(() => {
        socket.on("messages", (message: string) => {
            console.log("Message revieved from backend = ", message);
            setMessageState(function (oldMessages) {
                return [...oldMessages, message];
            })
        })
    }, [socket])
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

    function handleEmojiClick(e: any, emojiObject: any) {
        setChosenEmoji(emojiObject);
        setState(function (oldState) {
            return oldState += emojiObject.emoji;
        })
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
                        autosize minRows={1} size={"lg"} onKeyDown={getHotkeyHandler([
                            ["Enter", handleMessageSubmit]
                        ])} rightSectionWidth={100} rightSection={
                            <div className={classes.rightSectionClass}>
                                <Popover position="top">
                                    <Popover.Target>
                                        <ActionIcon variant="outline" color="grape">
                                            <MdInsertEmoticon />
                                        </ActionIcon>
                                    </Popover.Target>
                                    <Popover.Dropdown>
                                        <EmojiPicker onEmojiClick={handleEmojiClick} pickerStyle={{
                                            width: "100%"
                                        }} native />
                                    </Popover.Dropdown>
                                </Popover>
                                <Popover position="top" offset={50}>
                                    <Popover.Target>
                                        <ActionIcon variant="outline" color="grape">
                                            <AiOutlineGif />
                                        </ActionIcon>
                                    </Popover.Target>
                                    <Popover.Dropdown>
                                        <ScrollArea type="hover" style={{ height: "14em" }}>
                                            <SearchExperience />
                                        </ScrollArea>
                                    </Popover.Dropdown>
                                </Popover>
                            </div>
                        } />
                </form>
            </div>
            <Outlet />
        </>
    )
}
export default MiddleColumn;