import ActiveNow from "./ActiveNow";
import { Tabs } from "@mantine/core";
import Friends from "./Friends";
import { useMantineTheme, createStyles } from "@mantine/core";
import { FaUserFriends } from "react-icons/fa";
import FriendRequest from "./FriendRequest";
import { GoRequestChanges } from "react-icons/go"

const useStyles = createStyles((theme, _params, getRef) => ({
    tab_class: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.discord_palette[2] : theme.white,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        width:"90%"
    }
}))
function ChatWindow() {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    return <>
        <div className="chat-window">
            <Tabs color={theme.colors.discord_palette[0]} className={classes.tab_class} defaultValue="Friends">
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
    </>
}
export default ChatWindow;