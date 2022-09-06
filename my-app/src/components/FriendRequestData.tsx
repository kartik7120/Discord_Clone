import { useMantineTheme, createStyles, ActionIcon, Avatar, Text } from "@mantine/core";
import { TiTickOutline } from "react-icons/ti";
import { friendRequest } from "./interfaces/interfaces";
import { ImCross } from "react-icons/im";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { showNotification } from "@mantine/notifications";
import { BiError } from "react-icons/bi";
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

async function cancelRequest({ user_id, _id }: any) {
    try {
        const URL = `${process.env.REACT_APP_API_URL}namespace/friends/friendRequest`;
        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ userSub: user_id, _id })
        }
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

async function addRequest({ user_id, _id }: any) {
    const URL = `${process.env.REACT_APP_API_URL}namespace/friends`;
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ userSub: user_id, _id })
    }
    try {
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

function FriendRequestData(props: friendRequest) {
    const { user } = useAuth0()
    const queryClient = useQueryClient();
    const { classes } = useStyles();
    const { isLoading, isError, error, mutate } =
        useMutation(["friend", "request", "cancel", user?.sub, props._id], cancelRequest, {
            onSuccess(data, variables, context) {
                queryClient.setQueryData(["Friends", "requests", user?.sub], data);
            },
        });
    const { isError: isError2, error: error2, mutate: mutate2 } =
        useMutation(["friend", "request", "add", user?.sub, props._id], addRequest, {
            onSuccess(data, variables, context) {
                queryClient.setQueryData(["Friends", user?.sub], data);
            },
        });
    if (isError) {
        console.log(`Error occured while cancelling friend request ${error}`);
        showNotification({
            title: "Error",
            message: "Error occured while cancelling friend request",
            icon: <BiError />,
            color: "red"
        })
    }

    console.log(`user_id = ${props.user_id} and _id = ${props._id} in friend request`)
    return <div className={classes.wrapper}>
        <div className={classes.name_div}>
            <Avatar src={props.picture} alt="Friend request image" />
            <Text size="lg">{props.user_id}</Text>
        </div>
        <div className={classes.button_div}>
            <ActionIcon variant="outline" color="green"
                onClick={() => mutate2({ user_id: user?.sub, _id: props._id })}>
                <TiTickOutline size={30} />
            </ActionIcon>
            <ActionIcon variant="outline" onClick={() => mutate({ user_id: user?.sub, _id: props._id })}
                color="red"><ImCross />
            </ActionIcon>
        </div>
    </div>
}
export default FriendRequestData;