import { useAuth0 } from "@auth0/auth0-react";
import { useMantineTheme, createStyles, ActionIcon, Avatar, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BiError } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { friend } from "./interfaces/interfaces";
const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: theme.colorScheme === "dark" ?
                theme.fn.lighten(theme.colors.discord_palette[2], 0.1) : theme.fn.darken(theme.white, 0.1)
        },
        margin: "0.7em",
        height: "3em"
    },
    button_div: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "10%"
    },
    name_div: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }
}))

async function removeFriend({ user_id, _id, friend_id, friendSub }: any) {
    console.log(`UserSub = ${user_id} and _id of friend = ${_id}`);
    const URL = `${process.env.REACT_APP_API_URL}namespace/friends/deleteFriend`;
    const config = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ userSub: user_id, _id, friendSub, friend_id })
    }
    try {
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

function UserFriend(props: friend) {
    const { user } = useAuth0();
    const queryClient = useQueryClient();
    const { classes } = useStyles();
    const [friends, setFriends] = useLocalStorage<friend[]>({ key: `${user?.sub}-friends`, defaultValue: [] })
    const { isLoading, isError, error, mutate } = useMutation(["friends", user?.sub], removeFriend, {
        onSuccess(data, variables, context) {
            queryClient.setQueryData(["Friends", user?.sub], data);
        },
    });

    if (isError) {
        console.log(error);
        showNotification({
            title: "Error",
            message: "Error occured while fetching friends",
            icon: <BiError />,
            color: "red"
        })
    }

    function handleClick() {
        const isPresent = friends.find((friend) => friend.user_id === props.user_id);
        if (isPresent === undefined) {
            setFriends(function (oldFriends) {
                return [...oldFriends, {
                    picture: props.picture,
                    _id: props._id,
                    username: props.username,
                    user_id: props.user_id
                }]
            })
        }
    }

    return <div className={classes.wrapper} onClick={handleClick}>
        <div className={classes.name_div}>
            <Avatar src={props.picture} alt="Friend request image" />
            <Text size="lg">{props.username}</Text>
        </div>
        <div className={classes.button_div}>
            <ActionIcon variant="outline" onClick={() => mutate({
                user_id: user?.sub, _id: props._id,
                friend_id: props._id, friendSub: props.user_id
            })}
                color="red"><ImCross />
            </ActionIcon>
        </div>
    </div>
}
export default UserFriend;