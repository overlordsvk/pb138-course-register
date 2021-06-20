/* eslint-disable no-unused-vars */
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { Spin } from "antd";
import Loading from "./Loading";

const query = gql`
    query Courses {
        course {
            capacity
            detail
            enrolment_end
            enrolment_start
            name
            id
            semester_id
        }
    }
`;

export default function TestCourses() {
    const { loading, error, data } = useQuery(query);

    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <h2>Data loaded into DATA, map it, print it, etc...</h2>
        </div>
    );
}
