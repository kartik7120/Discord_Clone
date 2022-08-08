import { SearchBar, SearchContext, SuggestionBar, Grid } from "@giphy/react-components";
import { useContext } from "react";
function Components() {
    const { fetchGifs, searchKey } = useContext(SearchContext);
    return (
        <>
            <SearchBar />
            <SuggestionBar />

            <Grid width={400} columns={2} fetchGifs={fetchGifs} key={searchKey} />
        </>
    )
}
export default Components;