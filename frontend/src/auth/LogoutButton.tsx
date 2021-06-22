import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useResetRecoilState } from "recoil";
import { userState } from "../state/userState";

const LogoutButton = () => {
    const { logout } = useAuth0();
    const resetUserState = useResetRecoilState(userState);
    return (
        <a onClick={() => { logout({ returnTo: window.location.origin }); resetUserState; }}>
            Log Out
        </a>
    );
};

export default LogoutButton;