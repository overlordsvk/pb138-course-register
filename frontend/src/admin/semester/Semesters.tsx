import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Skeleton, Table } from "antd";
import { useQuery } from "@apollo/client";
import ServerError from "../../status/ServerError";
import NotFound from "../../status/NotFound";
import { Semester } from "../../utils/helpers";
import { useRecoilValue } from "recoil";
import { refetchTrigger } from "../../state/atoms";
import { SEMESTER_LIST_QUERY } from "../../utils/queries";

interface allSemestersReply {
    semesters: Semester[];
}

export default function Semesters() {
    const refetchNow = useRecoilValue(refetchTrigger);
    const { loading, error, data, refetch } =
        useQuery<allSemestersReply>(SEMESTER_LIST_QUERY);

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

    if (error || !data) return <ServerError />;

    if (data.semesters.length == 0 || data.semesters[0] == undefined)
        return <NotFound />;

    const Semesters = data.semesters.map((semester: Semester) => {
        return {
            id: semester.id,
            year: semester.year,
            term: semester.term,
            key: semester.id,
        };
    });

    let columns = [
        {
            title: "Year",
            dataIndex: "year",
            key: "year",
        },
        {
            title: "Term",
            dataIndex: "term",
            key: "term",
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            width: 20,
            render: (id: number) => {
                const path = `semester/${id}/edit`;
                return (
                    <Link to={path}>
                        <Button> Edit </Button>
                    </Link>
                );
            },
        },

    ];

    return (
        <>
            <h1> Courses</h1>
            <Link to="/semester/new">
                <Button style={{ marginBottom: "1em" }} type="primary">
                    Create
                </Button>
            </Link>

            <Table dataSource={Semesters} columns={columns} />
        </>
    );
}
