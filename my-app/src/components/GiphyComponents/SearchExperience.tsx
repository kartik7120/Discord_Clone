import { SearchContextManager } from "@giphy/react-components";
import Components from "../GiphyComponents/Components";
interface SearchInterface {
    socket: any
}
function SearchExperience(props: SearchInterface) {
    return <div style={{ width: "80%" }}>
        <SearchContextManager apiKey={"V68YK1MFUoaFnLWe6QY41Fd2FDa5xrUk"}>
            <Components socket={props.socket} />
        </SearchContextManager>
    </div>
}
export default SearchExperience;