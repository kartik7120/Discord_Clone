import { useQuery } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { useAuth0 } from "@auth0/auth0-react";
import { TiTickOutline } from "react-icons/ti";
import { BiError } from "react-icons/bi";
import FriendRequestData from "./FriendRequestData";
import { friendRequest } from "./interfaces/interfaces";
import { Center, Text } from "@mantine/core";
async function fetchFriendRequest({ queryKey }: any) {
    const [, , _key3] = queryKey;
    const URL = `${process.env.REACT_APP_API_URL}namespace/friends/friendRequest/${_key3}`;
    try {
        const response = await fetch(URL);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

function FriendRequest() {
    const { user } = useAuth0();
    const { isLoading, data, isSuccess } = useQuery(["Friends", "requests", user?.sub], fetchFriendRequest, {

        onSuccess(data) {
            console.log(`data recieved while fetching friend request = ${JSON.stringify(data)}`);
            showNotification({
                title: "Success",
                message: "Friend request send",
                icon: <TiTickOutline />,
                color: "green"
            })
        },
        onError(err) {
            console.log(err);
            showNotification({
                title: "Error",
                message: "Error occured while sending friend request",
                icon: <BiError />,
                color: "red"
            })
        },
    });

    if (!data) {
        return <Center>
            <Text variant="text" color="dimmed" size="xl">No friend requests</Text>
        </Center>
    }
    else
        if (data.length === 0)
            return <Center>
                <Text variant="text" color="dimmed" size="xl">No friend requests</Text>
            </Center>

    return <>

        {isSuccess ? data.map((user: friendRequest) => (
            <FriendRequestData {...user} />
        )) : ""}
    </>
}
export default FriendRequest;