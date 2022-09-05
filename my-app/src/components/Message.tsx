import { Avatar, Button, Text, Title } from "@mantine/core";
import React from "react"
import { createStyles, Space, Modal } from "@mantine/core";
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
function Message(props: any) {
    const { classes } = useStyles();
    const [opened, setOpened] = React.useState(false);
    return <div className={classes.message_wrapper}>
        <div>
            <Avatar src={props?.message_bearer.picture} radius="lg" />
        </div>
        <div>
            <Modal opened={opened} centered onClose={() => setOpened(false)} withCloseButton={true} title={<Title>User Profile</Title>}>
                <Button variant="filled" size="lg">Send friend request</Button>
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
                            <video controls loop muted style={{ borderRadius: "0.5em", width: "50%" }} src={props.message_content} /> :
                            props.category === "audio_file" ?
                                <audio src={props.message_content} controls muted style={{ borderRadius: "0.5em" }} />
                                : <img alt="sticker" style={{ borderRadius: "0.5em", width: "50%" }} src={props.message_content} />
            }
        </div>
    </div>
}
export default Message;