import { Avatar, Text } from "@mantine/core";
// import { useAuth0 } from "@auth0/auth0-react";
import { createStyles, Space } from "@mantine/core";
import useFetchUser from "../hooks/FetchUserDetails";
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
    sub: string,
    message: T
}
type message = messageObj<string | Element | JSX.Element>;
function Message(props: message) {
    // const { user } = useAuth0();
    const { classes } = useStyles();
    const { userData } = useFetchUser({ sub: props.sub });
    return <div className={classes.message_wrapper}>
        <div>
            <Avatar src={userData?.picture} radius="lg" />
        </div>
        <div>
            <Text weight={500}>{userData?.name}</Text>
            <Space h="xs" />
            <p className={classes.text_class}>
                <>
                    {props.message}
                </>
            </p>
        </div>
    </div>
}
export default Message;