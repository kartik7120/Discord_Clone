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
import Message from "./Message";
import Stickers from "./StipopComponents/Stickers";
import { BsFillStickiesFill } from "react-icons/bs";
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
type message = (string | Element | JSX.Element)[];
const messageArray: message = [""]
function MiddleColumn() {
    const socket = React.useContext(socketContext);
    const { channelName } = useParams();
    const { classes } = useStyles();
    const [state, setState] = useState("");
    const [, setChosenEmoji] = useState(null);
    const [message, setMessageState] = useState(messageArray);
    React.useEffect(() => {
        socket.on("messages", (message: string) => {
            console.log("Message revieved from backend = ", message);
            setMessageState(function (oldMessages) {
                return [...oldMessages, message];
            })
        })
        socket.on("gif", (gifURL: string) => {
            setMessageState(function (oldMessages) {
                return [...oldMessages, <video autoPlay loop muted style={{ borderRadius: "0.5em" }} src={gifURL} />]
            })
        })
        socket.on("sticker", (stickerURL: string) => {
            setMessageState(function (oldMessages) {
                return [...oldMessages, <img alt="sticker" style={{ borderRadius: "0.5em", width: "6em" }} src={stickerURL} />]
            })
        })
    }, [])
    function handleChange(e: any) {
        const message: string = e.target.value;
        setState(message);
    }
    function handleMessageSubmit(e: any) {
        if (state !== "") {
            socket.emit("message", state, channelName);
            setMessageState(function (oldMessages) {
                return [...oldMessages, state];
            })
            setState("");
        }
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
                        {message.map((ele: any, index: number) => (
                            <li key={Math.random() * index * 54239} className={classes.listClass}><Message message={ele} /></li>
                        ))}
                    </ol>
                </ScrollArea>
                <form action="" method="get">
                    <Textarea className={classes.TextAreaClass} value={state} onChange={handleChange}
                        placeholder="Enter your message"
                        autosize minRows={1} size={"xl"} onKeyDown={getHotkeyHandler([
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
                                <Popover position="top" offset={50} width="25em">
                                    <Popover.Target>
                                        <ActionIcon variant="outline" color="grape">
                                            <AiOutlineGif />
                                        </ActionIcon>
                                    </Popover.Target>
                                    <Popover.Dropdown>
                                        <ScrollArea type="hover" style={{ height: "14em" }}>
                                            <SearchExperience socket={socket} setMessageState={setMessageState} />
                                        </ScrollArea>
                                    </Popover.Dropdown>
                                </Popover>
                                <Popover position="top" offset={50} width="25em">
                                    <Popover.Target>
                                        <ActionIcon variant="outline" color="grape">
                                            <BsFillStickiesFill />
                                        </ActionIcon>
                                    </Popover.Target>
                                    <Popover.Dropdown>
                                        <ScrollArea type="hover" style={{ height: "14em" }}>
                                            <Stickers socket={socket} setMessageState={setMessageState} />
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