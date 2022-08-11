import { Avatar } from "@mantine/core"
import { useAuth0 } from "@auth0/auth0-react"
interface MessageProps {
    message: string,
}
function Message(props: MessageProps) {
    const { user } = useAuth0();
    return <div>
        <Avatar src={user?.picture} />
        {props.message}
    </div>
}
export default Message;