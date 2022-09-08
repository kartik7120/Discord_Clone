import { Avatar, createStyles, Indicator, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React from "react"
import { useMantineTheme } from "@mantine/core";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@mantine/core";
import { socketContext } from "../globalImports";
const useStyles = createStyles((theme, _params, getRef) => ({
    right_column_class: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.discord_palette[1] : theme.white,
        borderLeft: theme.colorScheme === "dark" ? "2px solid white" : "3px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    profile_class: {
        display: "flex",
        justifyContent: "space-between",
        margin: "1em"
    }
}))
function RightColumn() {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const { channel, id, channelName, roomId } = useParams();
    const [users, setUsers] = useLocalStorage<string[]>({ key: `${channel}-${channelName}-${id}-${roomId}`, defaultValue: [] });
    console.log(`channel name = ${channelName} and room id = ${roomId}`);
    const socket = React.useContext(socketContext);
    React.useEffect(() => {
        socket.on("userJoined", (users: string[]) => {
            // console.log(`User in right column ${JSON.stringify(users)}`);
            setUsers(users);
        })
    }, [socket])
    return <div className={classes.right_column_class}>
        <Text size="xl" weight="revert" color={theme.colorScheme === "dark" ? theme.white : theme.black}>Users Online</Text>
        <ScrollArea type="hover" style={{ height: "90vh" }}>
            {
                users.map((user: any) => {
                    return <div className={classes.profile_class}>
                        <Indicator position="bottom-end" inline withBorder offset={6} size={9} color="green">
                            <Avatar src={user?.userPicture} alt="username" size="lg" radius="xl" />
                        </Indicator>
                        <Text size="sm" color={theme.colorScheme === "dark" ? theme.white : theme.black} style={{ alignSelf: "center" }}>{user?.userName}</Text>
                    </div>
                })
            }
        </ScrollArea>
    </div>
}
export default RightColumn;