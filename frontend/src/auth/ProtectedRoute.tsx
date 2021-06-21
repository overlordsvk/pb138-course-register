import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import { useQuery } from "@apollo/client";
import { GET_USER_ROLE } from "../utils/queries";
import { UserRole } from "../utils/gqlTypes";
import Loading from "../common/Loading";


const ProtectedRoute: React.FC<RouteProps> = ({ path, children, ...rest }) => {
    const { isAuthenticated } = useAuth0();
    const userId = useRecoilValue(userState);
    const { loading, data } = useQuery<UserRole>(GET_USER_ROLE, {
        variables: { id: userId },
    });

    if (loading)
        return (
            <Loading />
        );
    const isTeacher = data?.users[0].role === "teacher";
    return (
        <Route
            {...rest}
            render={() => {
                if (!isAuthenticated || (!isTeacher &&
                    path?.includes("new") || path?.includes("edit"))) {
                    return <Redirect to="/unauthorized" />;
                }

                return children;
            }}
        />
    );
};

export default ProtectedRoute;

