import React from "react";
import { Link } from "react-router-dom";
import { Button, Skeleton, Table } from "antd";
import { gql, useQuery } from "@apollo/client";
import ServerError from "../status/ServerError";
import NotFound from "../status/NotFound";
import isStudent from "../utils/helpers";

interface allCourses {
    code: string;
    name: string;
    detail: string;
    id: number;
    capacity: number;
    enrolments_aggregate: {
        aggregate: {
            count: number;
        };
    };
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
            enrolments_aggregate(where: { user: { role: { _eq: student } } }) {
                aggregate {
                    count
                }
            }
        }
    }
`;

export function Courses() {
    const isTeacher = !isStudent();
    const { loading, error, data } = useQuery<allCoursesReply>(TheCourses);
    if (loading)
        return (
            <Skeleton
                className={"detail-skeleton"}
                active
                paragraph={{ rows: 13 }}
            />
        );

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
            key: course.id,
        };
    });

    let columns = [
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
            width: 20,
            render: (id: number) => {
                const path = `course/${id}/edit`;
                if (!isTeacher) return <></>;
                return (
                    <Link to={path}>
                        <Button> Edit </Button>
                    </Link>
                );
            },
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            width: 20,
            render: (id: number) => {
                const path = `course/${id}`;
                return (
                    <Link to={path}>
                        <Button>{"detail"}</Button>
                    </Link>
                );
            },
        },
        {
            title: "Capacity",
            dataIndex: "capacity",
            key: "capacity",
            width: 20,
        },
    ];

    if (!isTeacher) {
        columns.splice(4, 1);
    }

    return (
        <>
            <h1> Courses</h1>
            {isTeacher && (
                <Link to="/course/new">
                    <Button style={{ marginBottom: "1em" }} type="primary">
                        Create new
                    </Button>
                </Link>
            )}

            <Table dataSource={Courses} columns={columns} />
        </>
    );
}
