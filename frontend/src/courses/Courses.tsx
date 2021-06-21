import React from "react";
import { Link } from "react-router-dom";
import { Button, Skeleton, Table } from "antd";
import { gql, useQuery } from "@apollo/client";
import ServerError from "../status/ServerError";
import NotFound from "../status/NotFound";

interface allCourses {
    code: string;
    name: string;
    detail: string;
    id: number;
    capacity: number;
    enrolments_aggregate: {
        aggregate: {
            count: number;
        }
    }
}

interface allCoursesReply {
    course: allCourses[];
}


const TheCourses = gql`
  query Courses {
    course {
        id
        code
        name
        capacity
      detail
      enrolments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export function Courses() {
    const { loading, error, data } = useQuery<allCoursesReply>(TheCourses);
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

    if (data?.course.length == 0 || data?.course[0] == undefined)
        return <NotFound />;

    const Courses = data.course.map((course: allCourses) => {
        return {
            id: course.id,
            code: course.code,
            name: course.name,
            detail: course.detail,
            capacity: `${course.enrolments_aggregate.aggregate.count} / ${course.capacity}`,
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
            title: "detail",
            dataIndex: "detail",
            key: "detail",
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            render: (id: number) => {
                const isTeacher = true;
                const path = `course/${id}/edit`;
                if (!isTeacher)
                    return <></>;
                return <Link to={path}>
                    <Button> Edit </Button>
                </Link>;


            }
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            render: (id: number) => {
                const path = `course/${id}`;
                return <Link to={path}>
                    <Button>{"detail"}</Button>
                </Link>;
            }
        },
        {
            title: "Capacity",
            dataIndex: "capacity",
            key: "capacity",
        },
    ];

    return (
        <>
            <h1> Courses</h1>
            <Link to="/course/new">
                <Button>Create new</Button>
            </Link>
            <Table dataSource={Courses} columns={columns} />
        </>
    );
}
