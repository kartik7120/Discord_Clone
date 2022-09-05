import { useQuery } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { useAuth0 } from "@auth0/auth0-react";
import { TiTickOutline } from "react-icons/ti";
import { BiError } from "react-icons/bi";
import FriendRequestData from "./FriendRequestData";
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
    const { isLoading, isError, error, data, isSuccess } = useQuery(["Friends", "requests", user?.sub], fetchFriendRequest);

    if (isSuccess) {
        console.log(`data recieved while fetching friend request = ${JSON.stringify(data)}`);
        showNotification({
            title: "Success",
            message: "Friend request send",
            icon: <TiTickOutline />,
            color: "green"
        })
    }

    if (isError) {
        console.log(error);
        showNotification({
            title: "Error",
            message: "Error occured while sending friend request",
            icon: <BiError />,
            color: "red"
        })
    }
    return <>
        <FriendRequestData />
    </>
}
export default FriendRequest;