import { Outlet } from "react-router-dom";
function FriendsBar() {
    return <>
        <div className="Friends-bar">I am a friends bar</div>
        <Outlet />
    </>
}
export default FriendsBar;