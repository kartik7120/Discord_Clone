import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
function LogoutButton() {
    const { logout } = useAuth0();

    return <Button variant="gradient" onClick={() => logout()} gradient={{ from: 'orange', to: 'red' }}>Logout</Button>
}
export default LogoutButton;