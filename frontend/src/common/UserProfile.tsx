import React from "react";
import { GET_STUDENT } from "../utils/queries";
import { Users } from "../utils/gqlTypes";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import ServerError from "../status/ServerError";
import { useParams } from "react-router-dom";


function UserProfile() {
    let { id } = useParams<{ id: string }>();
    console.log(`${id} - id`);
    const { loading, error, data } = useQuery<Users>(
        GET_STUDENT,
        {
            variables: { id: id },
        }
    );
    console.log(`${data} - data`);
    if (loading)
        return (
            <Loading />
        );

    if (error || !data) {
        return <ServerError />;
    }

    const user = data.users[0];


    return (
        <div>
            <h1>{user.name} profile</h1>
            {user.picture ?
                <img src={user.picture} alt={user.name} /> :
                <span>{"Picture missing"}</span>
            }
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.auth0_id}</p>
            <h3>From recoil</h3>
            <h3>User Metadata</h3>
        </div>
    );
}

export default UserProfile;