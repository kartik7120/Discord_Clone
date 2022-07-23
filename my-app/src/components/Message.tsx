interface MessageProps {
    message: string,
    username?: string,
}
function Message(props: MessageProps) {
    
    return <span>{props.message}</span>
}
export default Message;