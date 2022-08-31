import { Avatar, Text } from "@mantine/core";
// import { useAuth0 } from "@auth0/auth0-react";
import { createStyles, Space } from "@mantine/core";
const useStyles = createStyles((theme, _params, getDef) => ({
    message_wrapper: {
        display: "grid",
        gridTemplateColumns: "1fr 16fr",
        marginBottom: "1em"
    },
    text_class: {
        lineHeight: "1.5",
        margin: 0
    }
}))
function Message(props: any) {
    // const { user } = useAuth0();
    const { classes } = useStyles();
    // const { userData } = useFetchUser({ sub: props.sub });
    return <div className={classes.message_wrapper}>
        <div>
            <Avatar src={props?.message_bearer.picture} radius="lg" />
        </div>
        <div>
            <Text weight={500}>{props?.message_bearer.username}</Text>
            <Space h="xs" />
            {
                props.category === "text" ? <p className={classes.text_class}>
                    <>
                        {props.message_content}
                    </>
                </p> : props.category === "video" ?
                    <video autoPlay loop muted style={{ borderRadius: "0.5em" }} src={props.message_content} />
                    : <img alt="sticker" style={{ borderRadius: "0.5em", width: "6em" }} src={props.message_content} />
            }
        </div>
    </div>
}
export default Message;