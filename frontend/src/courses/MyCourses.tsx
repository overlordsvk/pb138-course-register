import { Table, Button, Skeleton } from "antd";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import { Link } from "react-router-dom";
import { MY_COURSES } from "../utils/queries";
import ServerError from "../status/ServerError";
import { refetchTrigger } from "../state/atoms";
import { isTeacher } from "../utils/helpers";

interface myCourse {
    course: {
        id: string;
        code: string;
        name: string;
    };
}

interface myCourses {
    enrolment: myCourse[];
}

function MyCourses() {
    const Teacher = isTeacher();
    const appUser = useRecoilValue(userState);
    const refetchNow = useRecoilValue(refetchTrigger);
    const { data, error, loading, refetch } = useQuery<myCourses>(MY_COURSES, {
        variables: { id: appUser.id },
    });

    useEffect(() => {
        let mounted = true;
        if (mounted) refetch();
        return () => {
            mounted = false;
        };
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

    const dataSource = data?.enrolment.map((enrolment: myCourse) => {
        return {
            id: enrolment.course.id,
            code: enrolment.course.code,
            name: enrolment.course.name,
            key: enrolment.course.id,
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
            key: "id-myStudents",
            width: 20,
            render: (id: number) => {
                const path = `/course/${id}/students`;
                if (!Teacher) return <></>;
                return (
                    <Link to={path}>
                        <Button> My Students </Button>
                    </Link>
                );
            },
        },
        {
            title: "",
            dataIndex: "id",
            key: "id-detail",
            width: 20,
            render: (id: number) => {
                const path = `/course/${id}`;
                return (
                    <Link to={path}>
                        <Button> Details </Button>
                    </Link>
                );
            },
        },
    ];

    if (!Teacher) {
        columns.splice(2, 1);
    }

    return (
        <>
            <h1>My Courses</h1>
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default MyCourses;
