import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";

interface IProtectedRouteProps {
    path: string;
    role: string;
    [key: string]: any
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children, role = "student", ...rest }) => {
    const appUser = useRecoilValue(userState);
    let isAuthorized = role.includes(appUser.role);
    if (appUser.role == "")
        isAuthorized = false;
    return (
        <Route
            {...rest}
            render={() => {
                if (!isAuthorized) {
                    return <Redirect to="/unauthorized" />;
                }
                return children;
            }}
        />
    );
};

export default ProtectedRoute;

