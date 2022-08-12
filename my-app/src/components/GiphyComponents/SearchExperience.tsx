import { SearchContextManager } from "@giphy/react-components";
import Components from "../GiphyComponents/Components";
type message = (string | Element | JSX.Element)[];
interface SearchInterface {
    socket: any,
    setMessageState: React.Dispatch<React.SetStateAction<message>>
}
function SearchExperience(props: SearchInterface) {
    return <div style={{ width: "80%" }}>
        <SearchContextManager apiKey={"V68YK1MFUoaFnLWe6QY41Fd2FDa5xrUk"}>
            <Components socket={props.socket} setMessageState={props.setMessageState}/>
        </SearchContextManager>
    </div>
}
export default SearchExperience;