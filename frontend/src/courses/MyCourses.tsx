import { Table } from "antd";
import React from "react";

function MyCourses() {

    // query MyQuery {
    //     enrolment(where: {user_id: {_eq: 2}}) {
    //       course {
    //         name
    //         detail
    //       }
    //     }
    //   }
      
    const data = {
        "data": {
            "enrolment": [
                {
                    "course": {
                        "name": "IB102",
                        "detail": "Simple introduction to algorithms for dummies"
                    }
                },
                {
                    "course": {
                        "name": "PV178",
                        "detail": "Martin teaching C# basics."
                    }
                }
            ]
        }
    };

    const dataSource = data.data.enrolment.map((course) => {return {
        "name" : course.course.name,
        "detail": course.course.detail,
    };});
    const columns = [
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
    ];

    return (
        <>
            <h1>My Courses</h1>
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default MyCourses;
