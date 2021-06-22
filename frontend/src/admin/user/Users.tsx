import React, { useState } from "react";
import { Button, Form, Radio, Spin, Table, Tag } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, UPDATE_USER_ROLE } from "../../utils/queries";
import Loading from "../../common/Loading";
import ServerError from "../../status/ServerError";
import { LoadingOutlined } from "@ant-design/icons";
import { User, UserRole } from "../../utils/gqlTypes";



function Users() {
    const { loading, error, data, refetch } =
        useQuery<{ users: User[] }>(GET_ALL_USERS);
    const [updateUser] = useMutation(UPDATE_USER_ROLE);
    const [showLoading, setShowLoading] = useState(false);
    // const [value, setValue] = React.useState("student");

    if (loading) return <Loading />;
    if (error || !data) return <ServerError />;

    async function changeRole(values: { key: string; role: UserRole }) {
        setShowLoading(true);
        console.log(values);
        console.log(values.key);
        console.log(values.role);
        await updateUser({
            variables: {
                id: values.key,
                role: values.role,
            },
        });
        await refetch();
        setShowLoading(false);
    }

    const dataSource = data.users.map((u) => {
        return {
            key: u.auth0_id,
            name: u.name,
            email: u.email,
            role: u.role,
            action: u.role,
        };
    });

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: String) => (
                <Tag
                    color={
                        role.includes("admin")
                            ? "volcano"
                            : role.includes("teacher")
                                ? "green"
                                : "blue"
                    }
                >
                    {role.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, item: any) => (
                <Form
                    onFinish={changeRole}
                    initialValues={{ key: item.key, role: item.role }}
                >
                    <Form.Item
                        style={{
                            marginBottom: "0",
                        }}
                    >
                        <Form.Item name="key" hidden />
                        <Form.Item
                            name="role"
                            style={{
                                display: "inline-block",
                                marginRight: "1em",
                                marginBottom: "0",
                            }}
                        >
                            <Radio.Group name="role">
                                <Radio.Button value="student">
                                    student
                                </Radio.Button>
                                <Radio.Button value="teacher">
                                    teacher
                                </Radio.Button>
                                <Radio.Button value="admin">admin</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            style={{
                                display: "inline-block",
                                marginBottom: "0",
                            }}
                        >
                            <Button htmlType="submit" type="primary">
                                Save
                            </Button>
                        </Form.Item>
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <Spin
            spinning={showLoading}
            indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />}
        >
            <Table dataSource={dataSource} columns={columns} />
        </Spin>
    );
}

export default Users;
