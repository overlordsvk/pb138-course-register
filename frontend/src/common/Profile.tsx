import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Profile() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    // eslint-disable-next-line no-unused-vars
    const [userMetadata, setUserMetadata] = useState(null);
    const appUser = useRecoilValue(userState);

    if (isLoading) {
        return <Spin indicator={antIcon} />;
    }
    if (!isAuthenticated || !user) {
        return <div>Not authenticated ...</div>;
    }
    return (
        <div>
            <h1>Profile from Auth0, not for production</h1>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.sub}</p>
            <h3>From recoil</h3>
            <p>{appUser.id}</p>
            <p>{appUser.role}</p>
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
