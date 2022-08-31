import { SearchBar, SearchContext, Grid } from "@giphy/react-components";
import { useContext } from "react";
import { createStyles } from "@mantine/core"
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
const useStyles = createStyles((theme, _params, getRef) => ({
    video_class: {
        borderRadius: "0.5em"
    }
}));
type message = messageObj<string | Element | JSX.Element>[];
interface SearchInterface {
    socket: any,
    setMessageState: React.Dispatch<React.SetStateAction<message>>
}
interface messageObj<T> {
    sub: string,
    message: T
}

function Components(props: any) {
    const { user } = useAuth0();
    const { classes } = useStyles();
    const { fetchGifs, searchKey } = useContext(SearchContext);
    const { channelName, id, roomId } = useParams();
    function handleGifClick(gif: any, e: any) {
        e.preventDefault();
        const gifURL: string = gif.images.looping.mp4;
        props.socket.emit("gif", gifURL, {
            message_content: gifURL,
            userSub: user?.sub!,
            userPicture: user?.picture!, userName: user?.name!,
            category: "video", roomId: roomId!, channelId: id!, channelName
        });
        props.mutate({
            message_content: gifURL,
            userSub: user?.sub!,
            userPicture: user?.picture!, userName: user?.name!,
            category: "video", roomId: roomId!, channelId: id!
        })
    }
    return (
        <>
            <SearchBar />
            <Grid width={400} columns={2} fetchGifs={fetchGifs} key={searchKey} onGifClick={handleGifClick} />
        </>
    )
}
export default Components;