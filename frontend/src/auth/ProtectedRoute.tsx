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
    if (appUser.role == "") {
        return <Loading />;
    }
    console.log(isAuthorized);
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

