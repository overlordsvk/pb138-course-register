import { Table, Button, Skeleton } from "antd";
import React from "react";
import { useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import { Link } from "react-router-dom";
import { MY_COURSES } from "../utils/queries";
import ServerError from "../status/ServerError";

interface myCourse{
    course: {
        id : string,
        code: string,
        name: string,
    }}

interface myCourses{
    enrolment: myCourse[],
}


function MyCourses() {

    const myId = useRecoilValue(userState);
    const { data, error, loading } = useQuery<myCourses>(MY_COURSES, {
        variables: {id :myId}
    });
    if (loading)
        return (
            <Skeleton
                className={"detail-skeleton"}
                active
                paragraph={{ rows: 13 }}
            />
        );
    console.log("error");
    console.log(error);
    if (error) return <ServerError />;
    console.log(data);
    if (data?.enrolment.length == 0 || data?.enrolment[0] == undefined)
        return <h1> No courses found </h1>;
        
    const dataSource = data.enrolment.map((enrolment: myCourse) => {
        return {
            id: enrolment.course.id,
            code: enrolment.course.code,
            name: enrolment.course.name,
        };
    });

    const columns = [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            render: (id : number) => {
                const path = `course/${id}`;
                return (<Link to={path}>
                    <Button> Details </Button>
                </Link>);                
            }
        },
    ];

    return (
        <>
            <h1>My Courses</h1>
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default MyCourses;
