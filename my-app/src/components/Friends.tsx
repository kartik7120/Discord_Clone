import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { showNotification } from "@mantine/notifications";
import { BiError } from "react-icons/bi";
async function fetchFriends({ userSub }: any) {
    const URL = `${process.env.REACT_APP_API_URL}friends`;
    try {

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

    return <h1>I will contain all the list of friends</h1>
}
export default Friends;