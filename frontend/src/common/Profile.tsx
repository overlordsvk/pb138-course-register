import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import Loading from "./Loading";
import { GET_STUDENT } from "../utils/queries";
import { useQuery } from "@apollo/client";
import ServerError from "../status/ServerError";
import { Users } from "../utils/gqlTypes";
import { defaultPicture } from "../utils/constants";
import { formatDate } from "../utils/helpers";
import { Avatar, Descriptions, Tag } from "antd";
import "./Profile.css";

function Profile() {
    const appUser = useRecoilValue(userState);
    const { loading, error, data } = useQuery<Users>(
        GET_STUDENT,
        {
            variables: { id: appUser.id },
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

    return (
        <div>
            <div className="avatar">
                <Avatar
                    size={{ xs: 100, sm: 132, md: 140, lg: 164, xl: 180, xxl: 200 }}
                    icon={<img src={user.picture ? user.picture : defaultPicture}
                        alt={user.name} />}
                />
            </div>

            <Descriptions
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="ID">{user.auth0_id}</Descriptions.Item>
                <Descriptions.Item label="Role">                <Tag
                    color={
                        user.role.includes("admin")
                            ? "volcano"
                            : user.role.includes("teacher")
                                ? "green"
                                : "blue"
                    }
                >
                    {user.role.toUpperCase()}
                </Tag></Descriptions.Item>
                <Descriptions.Item label="Last seen">{formatDate(user.last_seen)}</Descriptions.Item>
                <Descriptions.Item label="Created at">{formatDate(user.created_at)}</Descriptions.Item>
            </Descriptions>
        </div>
    );
}

export default Profile;
