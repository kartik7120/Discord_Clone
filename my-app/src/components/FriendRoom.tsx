import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Text, createStyles, ActionIcon, useMantineTheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IoClose } from "react-icons/io5";
import { friend } from "./interfaces/interfaces";
import { useNavigate } from "react-router-dom";
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
function FriendChannel(props: friend) {
    const navigate = useNavigate();
    const { classes } = useStyles();
    const { user } = useAuth0();
    const theme = useMantineTheme();
    const [, setFriends] = useLocalStorage<friend[]>({ key: `${user?.sub}-friends`, defaultValue: [] });

    function handleClick() {
        setFriends(function (oldFriends) {
            return oldFriends.filter((friend) =>
                friend.user_id !== props.user_id
            )
        })
    }

    function handleClick2() {
        navigate(`${user?.name}/${user?.sub}/friends/${props._id}`);
    }

    return <div className={classes.wrapper} onClick={handleClick2}>
        <Avatar src={props.picture} alt="Friend profile pic" />
        <Text size="md" color={theme.colorScheme === "dark" ? theme.white : theme.black}>{props.username}</Text>
        <ActionIcon onClick={handleClick}>
            <IoClose size={45} />
        </ActionIcon>
    </div>
}
export default FriendChannel;