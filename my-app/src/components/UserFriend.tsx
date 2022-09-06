import { useAuth0 } from "@auth0/auth0-react";
import { useMantineTheme, createStyles, ActionIcon, Avatar, Text } from "@mantine/core";
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
            backgroundColor: theme.fn.darken(theme.colors.discord_palette[2], 0.2)
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

async function removeFriend({ userSub, _id }: any) {
    const URL = `${process.env.REACT_APP_API_URL}namespace/friends`;
    const config = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ user_id: userSub, _id })
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
    const { isLoading, isError, error, mutate } = useMutation(["friends", user?.sub], removeFriend);

    if (isError) {
        console.log(error);
        showNotification({
            title: "Error",
            message: "Error occured while fetching friends",
            icon: <BiError />,
            color: "red"
        })
    }
    return <div className={classes.wrapper}>
        <div className={classes.name_div}>
            <Avatar src={props.picture} alt="Friend request image" />
            <Text size="lg">{props.user_id}</Text>
        </div>
        <div className={classes.button_div}>
            <ActionIcon variant="outline" onClick={() => mutate({ user_id: user?.sub, _id: props._id })}
                color="red"><ImCross />
            </ActionIcon>
        </div>
    </div>
}
export default UserFriend;