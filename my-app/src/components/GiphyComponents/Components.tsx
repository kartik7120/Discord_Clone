import { SearchBar, SearchContext, Grid } from "@giphy/react-components";
import { useContext } from "react";
import { createStyles } from "@mantine/core"
import { useAuth0 } from "@auth0/auth0-react";
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

function Components(props: SearchInterface) {
    const { user } = useAuth0();
    const { classes } = useStyles();
    const { fetchGifs, searchKey } = useContext(SearchContext);
    function handleGifClick(gif: any, e: any) {
        e.preventDefault();
        const gifURL: string = gif.images.looping.mp4;
        props.socket.emit("gif", gifURL);
        props.setMessageState(function (oldMessages) {
            return [...oldMessages, {
                message: <video autoPlay className={classes.video_class} loop muted src={gifURL} />
                , sub: user?.sub!
            }]
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