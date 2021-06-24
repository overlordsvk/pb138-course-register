import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Skeleton, Table, Tag } from "antd";
import { gql, useQuery } from "@apollo/client";
import ServerError from "../status/ServerError";
import { useRecoilValue } from "recoil";
import { refetchTrigger } from "../state/atoms";
import { isTeacher } from "../utils/helpers";
import dayjs from "dayjs";

interface allCourses {
    code: string;
    name: string;
    detail: string;
    id: number;
    capacity: number;
    enrolment_start: Date;
    enrolment_end: Date;
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
            enrolment_start
            enrolment_end
            enrolments_aggregate(where: { user: { role: { _eq: student } } }) {
                aggregate {
                    count
                }
            }
        }
    }
`;

export function Courses() {
    const Teacher = isTeacher();
    const refetchNow = useRecoilValue(refetchTrigger);
    const { loading, error, data, refetch } =
        useQuery<allCoursesReply>(TheCourses);

    useEffect(() => {
        refetch();
    }, [refetchNow]);

    if (loading)
        return (
            <Skeleton
                className={"detail-skeleton"}
                active
                paragraph={{ rows: 13 }}
            />
        );

    if (error) return <ServerError />;

    const Courses = data?.course.map((course: allCourses) => {
        return {
            id: course.id,
            code: course.code,
            name: course.name,
            detail: course.detail,
            capacity: course.capacity,
            enrolment_start: course.enrolment_start,
            enrolment_end: course.enrolment_end,
            enrolments_aggregate: course.enrolments_aggregate,
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
            title: "Enrolled",
            dataIndex: "capacity",
            key: "capacity",
            width: 20,
            render: (_: any, course: allCourses) =>
                `${course.enrolments_aggregate.aggregate.count} / ${course.capacity}`,
        },
        {
            title: "Registration",
            key: "registration",
            width: 20,
            render: (_: any, item: allCourses) => (
                <Tag
                    color={
                        isRegistrationEnabled(
                            item.enrolment_start,
                            item.enrolment_end
                        )
                            ? "green"
                            : "volcano"
                    }
                >
                    {isRegistrationEnabled(
                        item.enrolment_start,
                        item.enrolment_end
                    )
                        ? "Active"
                        : "Disabled"}
                </Tag>
            ),
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
    ];

    function isRegistrationEnabled(start: Date, end: Date) {
        return dayjs(start) < dayjs() && dayjs() < dayjs(end);
    }

    return (
        <>
            <h1> Courses</h1>
            {Teacher && (
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
