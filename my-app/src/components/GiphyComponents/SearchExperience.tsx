import { SearchContextManager } from "@giphy/react-components";
import Components from "../GiphyComponents/Components";

function SearchExperience(props: any) {
    return <div style={{ width: "80%" }}>
        <SearchContextManager apiKey={"V68YK1MFUoaFnLWe6QY41Fd2FDa5xrUk"}>
            <Components socket={props.socket} mutate={props.mutate}/>
        </SearchContextManager>
    </div>
}
export default SearchExperience;