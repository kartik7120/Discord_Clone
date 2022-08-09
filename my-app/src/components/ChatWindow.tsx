import ActiveNow from "./ActiveNow";
import Profile from "./Auth/Profile";
import { useAuth0 } from "@auth0/auth0-react";
function ChatWindow() {
    const { isAuthenticated } = useAuth0()
    return <><div className="chat-window">I am chat window</div>
        <ActiveNow />
        {isAuthenticated ? <Profile /> : ""}
    </>
}
export default ChatWindow;