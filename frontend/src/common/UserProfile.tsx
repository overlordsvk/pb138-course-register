import React from "react";
import { GET_STUDENT } from "../utils/queries";
import { Users } from "../utils/gqlTypes";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import ServerError from "../status/ServerError";
import { useParams } from "react-router-dom";
import { defaultPicture } from "../utils/constants";
import { formatDate } from "../utils/helpers";


function UserProfile() {
    let { id } = useParams<{ id: string }>();
    const { loading, error, data } = useQuery<Users>(
        GET_STUDENT,
        {
            variables: { id: id },
        }
    );
    if (loading)
        return (
            <Loading />
        );

    if (error || !data) {
        return <ServerError />;
    }

    const user = data.users[0];

    console.log(defaultPicture);
    return (
        <div>
            <h1>{user.name} profile</h1>
            <img src={user.picture ? user.picture : defaultPicture}
                alt={user.name} />
            <h2>Name: {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>ID: {user.auth0_id}</p>
            <p>Role: {user.role}</p>
            <p>Created at: {formatDate(user.created_at)}</p>
            <p>Last seen: {formatDate(user.last_seen)}</p>
        </div>
    );
}

export default UserProfile;