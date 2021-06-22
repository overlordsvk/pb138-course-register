import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Loading from "../common/Loading";
import { userState } from "../state/userState";

interface IProtectedRouteProps {
    path: string;
    role: string;
    [key: string]: any
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children, role = "student", ...rest }) => {
    const appUser = useRecoilValue(userState);
    const isAuthorized = role.includes(appUser.role);
    const { isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        return <Redirect to="/unauthorized" />;
    }
    if (appUser.role == "") {
        return <Loading />;
    }
    if (!isAuthorized) {
        return <Redirect to="/unauthorized" />;
    }
    return (
        <Route
            {...rest}
            render={() => {

                return children;
            }}
        />
    );
};

export default ProtectedRoute;

