import { Avatar, Text } from "@mantine/core";
// import { useAuth0 } from "@auth0/auth0-react";
import { createStyles, Space } from "@mantine/core";
import useFetchUser from "../hooks/FetchUserDetails";
import { messageMutate } from "./interfaces/interfaces";
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
interface messageObj<T> {
    sub: any,
    message: T
}
type message = messageObj<string | Element | JSX.Element>;
function Message(props: any) {
    // const { user } = useAuth0();
    const { classes } = useStyles();
    console.log(props);
    // const { userData } = useFetchUser({ sub: props.sub });
    return <div className={classes.message_wrapper}>
        <div>
            <Avatar src={props?.message_bearer.picture} radius="lg" />
        </div>
        <div>
            <Text weight={500}>{props?.message_bearer.username}</Text>
            <Space h="xs" />
            <p className={classes.text_class}>
                <>
                    {props.message_content}
                </>
            </p>
        </div>
    </div>
}
export default Message;