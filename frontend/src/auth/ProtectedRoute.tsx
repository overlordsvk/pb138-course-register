import React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute: React.FC<RouteProps> = ({children, ...rest}) => {
    const { isAuthenticated } = useAuth0();

    return(
        <Route
            {...rest}
            render={() => {
                return isAuthenticated ?
                    children :
                    <Redirect to="/unauthorized" />;
            }}
        />
    );
};

export default ProtectedRoute;
