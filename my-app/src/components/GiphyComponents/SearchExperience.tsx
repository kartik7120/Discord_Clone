import { SearchContextManager } from "@giphy/react-components";
import Components from "../GiphyComponents/Components";
type message = messageObj<string | Element | JSX.Element>[];
interface messageObj<T> {
    sub: string,
    message: T
}
interface SearchInterface {
    socket: any,
    setMessageState: React.Dispatch<React.SetStateAction<message>>
}

function SearchExperience(props: any) {
    return <div style={{ width: "80%" }}>
        <SearchContextManager apiKey={"V68YK1MFUoaFnLWe6QY41Fd2FDa5xrUk"}>
            <Components socket={props.socket} setMessageState={props.setMessageState} mutate={props.mutate}/>
        </SearchContextManager>
    </div>
}
export default SearchExperience;