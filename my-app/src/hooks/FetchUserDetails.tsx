import { useAuth0 } from "@auth0/auth0-react";
interface userProps {
    sub: string
}
function useFetchUser(props: userProps) {
    const { getAccessTokenSilently } = useAuth0();
    let userData: any = "";
    const getUser = async () => {
        const domain = process.env.REACT_APP_AUTH_DOMAIN;
        try {
            const accessToken = await getAccessTokenSilently({
                audience: `https://${domain}/api/v2/`,
                scope: "openid profile",
            });
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${props?.sub}`;

            const metadataResponse = await fetch(userDetailsByIdUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const user = await metadataResponse.json();
            userData = JSON.stringify(user);
            console.log(`userData in useFetchUser hook = ${JSON.parse(userData)}`);
        } catch (e: any) {
            console.log(e.message);
        }
    }
    getUser();
    return userData;
}
export default useFetchUser;