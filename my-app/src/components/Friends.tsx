import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { showNotification } from "@mantine/notifications";
import { BiError } from "react-icons/bi";
import { friend } from "./interfaces/interfaces";
import UserFriend from "./UserFriend";
import { Center, createStyles, Text } from "@mantine/core"
const useStyles = createStyles((theme, _params, getRef) => ({
    wrapper: {
        height: "100%"
    }
}))
async function fetchFriends({ queryKey }: any) {
    const [, _key2] = queryKey;
    const URL = `${process.env.REACT_APP_API_URL}namespace/friends/${_key2}`;
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }
    try {
        const response = await fetch(URL);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
function Friends() {
    const { classes } = useStyles();
    const { user } = useAuth0();
    const { isLoading, isError, data, error, isSuccess } = useQuery(["Friends", user?.sub], fetchFriends);

    if (isError) {
        console.log(error);
        showNotification({
            title: "Error",
            message: "Error occured while fetching friends",
            icon: <BiError />,
            color: "red"
        })
    }

    if (!data || Array.isArray(data) === false) {
        return <Center>
        <Text variant="text" color="dimmed" size="xl">No friends</Text>
    </Center>
    }
    else
        if (data.length === 0)
            return <Center>
                <Text variant="text" color="dimmed" size="xl">No friends</Text>
            </Center>

    return <div className={classes.wrapper}>
        {isSuccess ? data && Array.isArray(data) && data.map((friend: friend, index: number) => {
            console.log(friend);
            return <UserFriend key={Math.random() * 889 * index} {...friend} />
        }) : ""}
    </div>
}
export default Friends;