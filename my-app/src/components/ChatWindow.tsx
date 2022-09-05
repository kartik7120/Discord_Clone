import ActiveNow from "./ActiveNow";
import { Tabs } from "@mantine/core";
import Friends from "./Friends";
import { useMantineTheme } from "@mantine/core";
import { FaUserFriends } from "react-icons/fa";
import FriendRequest from "./FriendRequest";
import { GoRequestChanges } from "react-icons/go"
function ChatWindow() {
    const theme = useMantineTheme();
    return <>
        <div className="chat-window">
            <Tabs color={theme.colors.discord_palette[0]} defaultValue="Friends">
                <Tabs.List position="center" grow>
                    <Tabs.Tab value="Friends" icon={<FaUserFriends />}>Friends</Tabs.Tab>
                    <Tabs.Tab value="Friend request" icon={<GoRequestChanges />}>Friend Request</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="Friends" pt="xs">
                    <Friends />
                </Tabs.Panel>
                <Tabs.Panel value="Friend request" pt="xs">
                    <FriendRequest />
                </Tabs.Panel>
            </Tabs>
        </div>
        <ActiveNow />
        {/* {isAuthenticated ? <Profile /> : ""} */}
    </>
}
export default ChatWindow;