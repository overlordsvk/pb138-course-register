import { useQuery } from "@apollo/client";
import { Button, Table } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../common/Loading";
import ServerError from "../status/ServerError";
import { CourseStudents, EnrolledStudent } from "../utils/gqlTypes";
import { GET_COURSE_STUDENTS } from "../utils/queries";

function MyCourseStudents() {
    let { id } = useParams<{ id: string }>();
    const { data, error, loading } = useQuery<CourseStudents>(GET_COURSE_STUDENTS, {
        variables: { id: +id }
    });

    if (loading)
        return (<Loading />);

    if (error || !data) {
        return <ServerError />;
    }
    
    const dataSource = data.course[0].enrolments
        .map((e: EnrolledStudent) => {
            return {
                id: e.user.auth0_id,
                name: e.user.name,
                email: e.user.email,
                key: e.user.auth0_id,
            };
        });
    let columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "",
            dataIndex: "id",
            key: "id-detail",
            width: 20,
            render: (id: string) => {
                const path = `/student/${id}`;
                return (
                    <Link to={path}>
                        <Button> Details </Button>
                    </Link>
                );
            },
        },
    ];

    return (
        <>
            <h1>{data.course[0].name}</h1>
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default MyCourseStudents;