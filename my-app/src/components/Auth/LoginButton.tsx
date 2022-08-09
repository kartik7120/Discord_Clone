import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return <Button onClick={() => loginWithRedirect()} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
        Log In
    </Button>
}
export default LoginButton;