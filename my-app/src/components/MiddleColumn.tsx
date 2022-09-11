import { Button, createStyles, FileInput, Portal, Text } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import { socketContext } from "../globalImports";
import { getHotkeyHandler } from "@mantine/hooks";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { updateNotification } from "@mantine/notifications";
import { MdInsertEmoticon } from "react-icons/md";
import { ActionIcon } from "@mantine/core";
import EmojiPicker from "emoji-picker-react";
import { Popover } from '@mantine/core';
import { FiUpload } from "react-icons/fi";
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
import { TiTickOutline } from "react-icons/ti";
import { useLocalStorage } from "@mantine/hooks";
import JoinChannelPortal from "./joinChannelPortal";
const useStyles = createStyles((theme, _params, getRef) => ({
    middle_column_class: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.discord_palette[1] : theme.white,
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
    },
    orderListClass: {
        marginBottom: "3em"
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

async function uploadFile({ file, category }: any) {
    const formData = new FormData();
    if (category === "video_file") {
        category = "video";
        formData.append("resource_type", "video")
    }
    else
        if (category === "audio_file") {
            category = "audio";
            formData.append("resource_type", "audio")
        }
        else
            if (category === "image") {
                formData.append("resource_type", "image")
            }
    formData.append("file", file);
    formData.append("upload_preset", "zya1vrnx");
    formData.append("api_key", `${process.env.REACT_APP_CLOUDINARY_API_KEY}`);
    const URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
        const config = {
            method: "POST",
            body: formData
        }
        const response = await fetch(URL, config);
        const result = await response.json();
        console.log(`Result from cloudinary API = ${JSON.stringify(result)}`);
        return result.secure_url;
    } catch (error) {
        throw error;
    }
}
function MiddleColumn() {
    // const [state, setState] = useLocalStorage<string>({ key: "message", defaultValue: "" });
    const [file, setFile] = useState<File | null>(null);
    const queryClient = useQueryClient();
    const location = useLocation();
    const { user } = useAuth0();
    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement>({ axis: "y" });
    const socket = React.useContext(socketContext);
    const { channelName, id, roomId, channel } = useParams();
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
    const { isError: isError3, mutate: mutateFile, error: error3, isLoading: isLoading3, isSuccess: isSuccess3, reset } = useMutation(
        ["channel", id, "room", roomId, "message"]
        , uploadFile, {
        onSuccess: (data, variables: any, context) => {
            socket.emit("message", data, {
                message_content: data,
                userSub: user?.sub!,
                userPicture: user?.picture!, userName: user?.name!,
                category: variables.category, roomId: roomId!, channelId: id!, channelName
            });
            mutate({
                category: variables.category,
                channelId: id!,
                roomId: roomId!,
                userName: user?.name!,
                message_content: data,
                userSub: user?.sub!,
                userPicture: user?.picture!
            })
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

    if (isError3) {
        console.log(`Error occured while uploading filr = ${error3}`);
        showNotification({
            title: "Error File upload",
            message: "Error occured while uploading file",
            icon: <BiError />,
            color: "red"
        })
    }
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
    if (isLoading3) {
        showNotification({
            id: 'load-data',
            loading: true,
            title: 'Uploading your file',
            message: 'Please wait while data is being uploaded',
            autoClose: false,
            disallowClose: true,
        });
    }
    if (isSuccess3) {
        updateNotification({
            id: 'load-data',
            color: 'teal',
            title: 'File uploaded',
            message: 'File uploaded successfully',
            icon: <TiTickOutline size={16} />,
            autoClose: 2000,
        });
        reset();
    }
    async function handleUpload(e: any) {
        let category: messageMutate["category"];
        if (file !== null) {
            const reg1 = new RegExp("video/*")
            const reg2 = new RegExp("audio/*")
            const reg3 = new RegExp("image/*")
            if (reg1.test(file.type)) {
                category = "video_file";
            }
            else
                if (reg2.test(file.type)) {
                    category = "audio_file";
                }
                else
                    if (reg3.test(file.type)) {
                        category = "image";
                    }
                    else
                        category = "text";
            mutateFile
                (
                    {
                        file, category
                    }
                )
            scrollIntoView({ alignment: "end" });
            setFile(null);
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
                    <ol className={classes.orderListClass}>
                        <Text ref={scrollableRef}></Text>
                        {isSuccess ? data ? data.map((ele: messageMutate, index: number) => (
                            <li key={Math.random() * index * 54239} className={classes.listClass}><Message {...ele} /></li>
                        )) : <ChatSkeleton /> : ""}
                        <Text ref={targetRef}></Text>
                    </ol>
                </ScrollArea>
                <form action="" method="get">
                    <Textarea disabled={location.state ? true : false} className={classes.TextAreaClass} value={state} onChange={handleChange}
                        placeholder="Enter your message" maxRows={6}
                        autosize minRows={1} size={"xl"} onKeyDown={getHotkeyHandler([
                            ["Enter", handleMessageSubmit]
                        ])} rightSectionWidth={120} rightSection={
                            <div className={classes.rightSectionClass}>
                                <Popover position="top">
                                    <Popover.Target>
                                        <ActionIcon variant="outline" color="grape">
                                            <FiUpload />
                                        </ActionIcon>
                                    </Popover.Target>
                                    <Popover.Dropdown>
                                        <FileInput
                                            placeholder="Choose your file"
                                            label="Upload file"
                                            withAsterisk
                                            value={file}
                                            onChange={setFile}
                                        />
                                        <Button variant="filled" color="violet" onClick={handleUpload}>Upload</Button>
                                    </Popover.Dropdown>
                                </Popover>
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
            {/* {location.state ? <Portal target="#portalDiv">
                <JoinChannelPortal channelId={id!} channelName={channel!} />
            </Portal> : ""} */}
            <Outlet />
        </>
    )
}
export default MiddleColumn;