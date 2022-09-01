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
import { useMutation, useQuery } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { BiError } from "react-icons/bi";
import { messageMutate } from "./interfaces/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import ChatSkeleton from "./ChatSkeleton";
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
            queryClient.setQueryData(["channel", id, "room", roomId], (old: any): any => {
                return [...old, {
                    category,
                    message_content: message,
                    message_bearer: {
                        username: userName,
                        picture: userPicture,
                        sub_id: userSub
                    }
                }]
            });
        })
        socket.on("gif", (gifURL: string, { userSub,
            userPicture, userName,
            category, roomId, channelId }: messageMutate) => {
            queryClient.setQueryData(["channel", id, "room", roomId], (old: any): any => {
                return [...old, {
                    category,
                    message_content: gifURL,
                    message_bearer: {
                        username: userName,
                        picture: userPicture,
                        sub_id: userSub
                    }
                }]
            });
        })
        socket.on("sticker", (stickerURL: string, { userSub,
            userPicture, userName,
            category, roomId, channelId }: messageMutate) => {
            queryClient.setQueryData(["channel", id, "room", roomId], (old: any): any => {
                return [...old, {
                    category,
                    message_content: stickerURL,
                    message_bearer: {
                        username: userName,
                        picture: userPicture,
                        sub_id: userSub
                    }
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
                        )) : <ChatSkeleton />}
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
                                            <SearchExperience socket={socket} mutate={mutate} />
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
                                            <Stickers socket={socket} mutate={mutate} />
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