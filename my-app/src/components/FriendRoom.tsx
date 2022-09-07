import { Avatar, Text, createStyles, ActionIcon, useMantineTheme } from "@mantine/core";
import { IoClose } from "react-icons/io5";
const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        '&:hover': {
            backgroundColor: theme.fn.lighten(theme.colors.discord_palette[2], 0.1)
        },
        cursor: "pointer"
    }
}))
function FriendChannel() {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    return <div className={classes.wrapper}>
        <Avatar src={null} alt="Friend profile pic" />
        <Text size="lg" color={theme.colorScheme === "dark" ? theme.white : theme.black}>Friend's username</Text>
        <ActionIcon>
            <IoClose size={45} />
        </ActionIcon>
    </div>
}
export default FriendChannel;