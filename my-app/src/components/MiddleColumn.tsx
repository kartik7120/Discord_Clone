import { createStyles, Text } from "@mantine/core";
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
import { useScrollIntoView } from "@mantine/hooks";
import { BsFillStickiesFill } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { messageUser } from "./interfaces/interfaces";
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
interface messageObj<T> {
    sub: any,
    message: T
}
type message = messageObj<string | Element | JSX.Element>[];
const messageArray: message = [];
function MiddleColumn() {
    const { user } = useAuth0();
    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement>({ axis: "y" });
    const socket = React.useContext(socketContext);
    const { channelName } = useParams();
    const { classes } = useStyles();
    const [state, setState] = useState("");
    const [, setChosenEmoji] = useState(null);
    const [message, setMessageState] = useState(messageArray);
    React.useEffect(() => {
        scrollIntoView({ alignment: "end" });
        socket.on("messages", (message: string, user: messageUser) => {
            console.log("Message revieved from backend = ", message);
            setMessageState(function (oldMessages) {
                return [...oldMessages, { message, sub: user }];
            })
        })
        socket.on("gif", (gifURL: string, userSub: string) => {
            setMessageState(function (oldMessages) {
                return [...oldMessages, {
                    message: <video autoPlay loop muted style={{ borderRadius: "0.5em" }} src={gifURL} />,
                    sub: { userSub: user?.sub!, userPicture: user?.picture, userName: user?.name }
                }]
            })
        })
        socket.on("sticker", (stickerURL: string, userSub: string) => {
            setMessageState(function (oldMessages) {
                return [...oldMessages, {
                    message: <img alt="sticker" style={{ borderRadius: "0.5em", width: "6em" }} src={stickerURL} />
                    , sub: { userSub: user?.sub!, userPicture: user?.picture, userName: user?.name }
                }]
            })
        })
    }, [])
    function handleChange(e: any) {
        const message: string = e.target.value;
        setState(message);
    }
    function handleMessageSubmit(e: any) {
        if (state !== "") {
            socket.emit("message", state, channelName, user?.sub, user?.picture, user?.name);
            setMessageState(function (oldMessages) {
                return [...oldMessages, { message: state, sub: { userSub: user?.sub!, userPicture: user?.picture, userName: user?.name } }];
            })
            scrollIntoView({ alignment: "end" });
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
            <div className={classes.middle_column_class} id="messages">
                <ScrollArea type="hover" style={{ height: "40rem" }}>
                    <ol >
                        <Text ref={scrollableRef}></Text>
                        {message.map((ele: any, index: number) => (
                            <li key={Math.random() * index * 54239} className={classes.listClass}><Message {...ele} /></li>
                        ))}
                        <Text ref={targetRef}></Text>
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