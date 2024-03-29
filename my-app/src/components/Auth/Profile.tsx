import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
function Profile() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [userMetaData, setUserMetaData] = useState(null);

    useEffect(function () {
        const getUserMetadata = async () => {
            const domain = process.env.REACT_APP_AUTH_DOMAIN;
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetaData(user_metadata);
            } catch (e: any) {
                console.log(e.message);
            }

        }
        getUserMetadata();
    }
        , [getAccessTokenSilently, user?.sub]);
    if (isLoading) {
        return <div>... Loading</div>
    }

    if (!isAuthenticated) {
        <div>No user is logged in</div>
    }

    return (
        <div>
            <img src={user?.picture} alt={user?.name} />
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <h3>User meta data</h3>
            <img src={user?.picture} alt="This is a user profile" />
            {userMetaData ? (
                <pre>
                    {JSON.stringify(userMetaData, null, 2)}
                </pre>
            ) : "No user meta defined"}
        </div>
    )
}
export default Profile;