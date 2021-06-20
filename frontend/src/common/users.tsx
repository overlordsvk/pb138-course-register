/* eslint-disable no-unused-vars */
import { gql, useQuery } from "@apollo/client";
import React from "react";


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
  
export default function Users() {
    const { loading, error, data } = useQuery(query);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
        <div>
            <h2>Users</h2>
            <p>
                {data}
            </p>
        </div>
    );
}