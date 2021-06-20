import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently  } = useAuth0();
    // eslint-disable-next-line no-unused-vars
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-8-q69az8.eu.auth0.com";
      
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });
      
                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user!.sub}`;
                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                
      
                const { user_metadata } = await metadataResponse.json();
      
                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };
      
        getUserMetadata();
    }, []);

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    if (isAuthenticated && user) {
        console.log("render PROFILE");
        return (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <h3>User Metadata</h3>
                {userMetadata ? (
                    <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                ) : (
                    "No user metadata defined"
                )}
            </div>
        );
    }
    else {
        return <div>Please log in</div>;
    }

}
            
export default Profile;                                                                                                                                                                                                                                                                                