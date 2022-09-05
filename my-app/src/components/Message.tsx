import { Avatar, Button, Text, Title } from "@mantine/core";
import React from "react"
import { createStyles, Space, Modal } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest as friendRequest } from "./interfaces/interfaces";
import { BiError } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti"
const useStyles = createStyles((theme, _params, getDef) => ({
    message_wrapper: {
        display: "grid",
        gridTemplateColumns: "1fr 16fr",
        marginBottom: "1em"
    },
    text_class: {
        lineHeight: "1.5",
        margin: 0,
    },
    user_name_text: {
        '&:hover': {
            textDecoration: "underline"
        },
        cursor: "pointer"
    }
}))
async function sendFriendRequest({ userSub, friendSub }: friendRequest) {
    const URL = `${process.env.REACT_APP_API_URL}namespace/friends/friendRequest`;
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/jsonf"
        },
        body: JSON.stringify({ userSub, friendSub })
    }
    try {
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
function Message(props: any) {
    const queryClient = useQueryClient();
    const { classes } = useStyles();
    const { user } = useAuth0();
    const [opened, setOpened] = React.useState(false);
    const { isError, mutate, isSuccess, error } =
        useMutation(["friend request", user?.sub, props.message_content.userSub], sendFriendRequest);

    if (isSuccess) {
        showNotification({
            title: "Success",
            message: "Friend request send",
            icon: <TiTickOutline />,
            color: "green"
        })
    }

    if (isError) {
        console.log(error);
        showNotification({
            title: "Error",
            message: "Error occured while sending friend request",
            icon: <BiError />,
            color: "red"
        })
    }

    function handleClick() {
        setOpened(false);
        mutate({ userSub: user?.sub!, friendSub: props.message_bearer.sub_id });
    }

    return <div className={classes.message_wrapper}>
        <div>
            <Avatar src={props?.message_bearer.picture} radius="lg" />
        </div>
        <div>
            <Modal opened={opened} centered onClose={() => setOpened(false)} withCloseButton={true}
                title={<Title>User Profile</Title>}>
                <Button variant="filled" size="lg" onClick={handleClick}>Send friend request</Button>
            </Modal>
            <Text size="lg" className={classes.user_name_text} onClick={() => setOpened(true)}>
                {props?.message_bearer.username}
            </Text>
            <Space h="xs" />
            {
                props.category === "text" ?
                    <Text className={classes.text_class}>
                        <>
                            {props.message_content}
                        </>
                    </Text> : props.category === "video" ?
                        <video autoPlay loop muted style={{ borderRadius: "0.5em" }} src={props.message_content} /> :
                        props.category === "video_file" ?
                            <video controls loop muted style={{ borderRadius: "0.5em", width: "50%" }}
                                src={props.message_content} /> :
                            props.category === "audio_file" ?
                                <audio src={props.message_content} controls muted style={{ borderRadius: "0.5em" }} />
                                : <img alt="sticker" style={{ borderRadius: "0.5em", width: "50%" }} src={props.message_content} />
            }
        </div>
    </div>
}
export default Message;