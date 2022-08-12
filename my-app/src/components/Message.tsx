import { Avatar, Text } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { createStyles, Space } from "@mantine/core";
const useStyles = createStyles((theme, _params, getDef) => ({
    message_wrapper: {
        display: "grid",
        gridTemplateColumns: "1fr 16fr",
        // gridTemplateRows: "minmax(2fr,auto)",
        marginBottom: "1em"
    },
    avatar_class: {
    },
    text_class: {
        lineHeight: "1.5",
        margin: 0
    }
}))
interface MessageProps {
    message: string,
}
function Message(props: MessageProps) {
    const { user } = useAuth0();
    const { classes } = useStyles();
    return <div className={classes.message_wrapper}>
        <div className={classes.avatar_class}>
            <Avatar src={user?.picture} radius="lg" />
        </div>
        <div>
            <Text weight={500}>{user?.name}</Text>
            <Space h="xs" />
            <p className={classes.text_class}>{props.message}</p>
        </div>
    </div>
}
export default Message;