import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { showNotification } from "@mantine/notifications";
import { BiError } from "react-icons/bi";
import { friend } from "./interfaces/interfaces";
import UserFriend from "./UserFriend";
async function fetchFriends({ userSub }: any) {
    const URL = `${process.env.REACT_APP_API_URL}namespace/friends/${userSub}`;
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }
    try {
        const response = await fetch(URL, config);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
function Friends() {
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

    if (isSuccess) {
        console.log(`Friends data = ${data}`);
    }

    return <>
        {isSuccess ? data.map((friend: friend) => {
            return <UserFriend {...friend} />
        }) : ""}
    </>
}
export default Friends;