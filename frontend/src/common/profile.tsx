import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
        return <Spin indicator={antIcon} />;
    }
    if (!isAuthenticated || !user){
        return <div>Not authenticated ...</div>;
    }
    return (
        <div>
            <h1>Profile from Auth0, not for production</h1>
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
            
export default Profile;                                                                                                                                                                                                                                                                                