import { useQuery } from "@apollo/client";
import { Table } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";
import ServerError from "../status/ServerError";
import { CourseStudents, EnrolledStudent } from "../utils/gqlTypes";
import { GET_COURSE_STUDENTS } from "../utils/queries";

function MyCourseStudents() {
    let { id } = useParams<{ id: string }>();
    const { data, error, loading } = useQuery<CourseStudents>(GET_COURSE_STUDENTS, {
        variables: { id: +id}
    });

    if (loading)
        return (<Loading />);

    console.log(`error \n${error}`);

    if (error || !data) return <ServerError />;

    const dataSource = data.course[0].enrolments
        .map((e: EnrolledStudent) => {
            return {
                id: e.user.id,
                name: e.user.name,
                email: e.user.email,
                key: e.user.id
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
    ];

    return (
        <>
            <h1>{data.course[0].name}</h1>
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default MyCourseStudents;