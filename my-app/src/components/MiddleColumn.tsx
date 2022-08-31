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
import { useMutation, useQuery } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { BiError } from "react-icons/bi";
import { messageMutate } from "./interfaces/interfaces";
import { useQueryClient } from "@tanstack/react-query";
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
async function fetchRoomMessage({ queryKey }: any) {
    const [, , , _key4] = queryKey;
    const URL = `${process.env.REACT_APP_API_URL}namespace/messages/${_key4}`;
    try {
        const response = await fetch(URL);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

async function fetchUpdateMessages({ userSub, category, message_content, userPicture, userName, roomId }: messageMutate) {
    const URL = `${process.env.REACT_APP_API_URL}namespace/messages/${roomId}`;
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/jsons"
        },
        body: JSON.stringify({
            userSub, category, message_content, userPicture, userName
        })
    }
    try {
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

function MiddleColumn() {
    const queryClient = useQueryClient();
    const { user } = useAuth0();
    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement>({ axis: "y" });
    const socket = React.useContext(socketContext);
    const { channelName, id, roomId } = useParams();
    const { classes } = useStyles();
    const [state, setState] = useState("");
    const [, setChosenEmoji] = useState(null);
    const [message, setMessageState] = useState(messageArray);
    const { isLoading, isError, error, data, isSuccess } = useQuery(["channel", id, "room", roomId], fetchRoomMessage, {
        refetchOnWindowFocus: false
    })
    const { isLoading: isLoading2, isError: isError2, mutate } = useMutation(["channel", id, "room", roomId, "message"],
        fetchUpdateMessages, {
        onSuccess: (data, varaibles, context) => {
            queryClient.setQueryData(["channel", id, "room", roomId], data);
        }
    })
    React.useEffect(() => {
        scrollIntoView({ alignment: "end" });
        socket.on("messages", (message: string, { userSub,
            userPicture, userName,
            category, roomId, channelId }: messageMutate) => {
            console.log("Message revieved from backend = ", message);
            queryClient.setQueryData(["channel", id, "room", roomId], (old: any): any => {
                return [...old, {
                    category,
                    message_content:message,
                    message_bearer: {
                        username: userName,
                        picture: userPicture,
                        sub_id: userSub
                    }
                }]
            });
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

    if (isError) {
        console.log(`Error occured while fetching messages = ${error}`);
        showNotification({
            title: "Error",
            message: "Error occured while fetching messages",
            icon: <BiError />,
            color: "red"
        })
    }
    if (isSuccess) {
        showNotification({
            title: "Success",
            message: "Messages loaded successfully",
            color: "green"
        })
    }
    function handleChange(e: any) {
        const message: string = e.target.value;
        setState(message);
    }
    function handleMessageSubmit(e: any) {
        if (state !== "") {
            socket.emit("message", state, {
                message_content: state,
                userSub: user?.sub!,
                userPicture: user?.picture!, userName: user?.name!,
                category: "text", roomId: roomId!, channelId: id!, channelName
            });
            setMessageState(function (oldMessages) {
                return [...oldMessages, {
                    message: state, sub: {
                        userSub: user?.sub!,
                        userPicture: user?.picture, userName: user?.name,
                        roomId,
                    }
                }];
            })
            mutate(
                {
                    message_content: state,
                    userSub: user?.sub!,
                    userPicture: user?.picture!, userName: user?.name!,
                    category: "text", roomId: roomId!, channelId: id!
                }
            )
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
                        {isSuccess ? data.map((ele: messageMutate, index: number) => (
                            <li key={Math.random() * index * 54239} className={classes.listClass}><Message {...ele} /></li>
                        )) : ""}
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