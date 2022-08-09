import { SearchBar, SearchContext, SuggestionBar, Grid } from "@giphy/react-components";
import { useContext } from "react";
interface SearchInterface {
    socket: any
}
function Components(props: SearchInterface) {
    const { fetchGifs, searchKey } = useContext(SearchContext);
    function handleGifClick(gif: any, e: any) {
        e.preventDefault();
        console.log(gif);
        const gifURL: string = gif.images.looping.mp4;
        props.socket.emit("gif", gifURL);
    }
    return (
        <>
            {/* <div style={{ width: "100%" }}> */}
            <SearchBar />
            {/* </div> */}
            {/* <SuggestionBar /> */}
            <Grid width={400} columns={2} fetchGifs={fetchGifs} key={searchKey} onGifClick={handleGifClick} />
        </>
    )
}
export default Components;