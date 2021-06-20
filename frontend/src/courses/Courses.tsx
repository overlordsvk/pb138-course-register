import React from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";

// const query = query MyQuery {
//     course {
//       capacity
//       detail
//       name
//       enrolments_aggregate {
//         aggregate {
//           count
//         }
//       }
//     }
//   }

export function Courses() {
    const data = {
        data: {
            course: [
                {
                    capacity: 100,
                    detail: "Simple introduction to algorithms for dummies",
                    name: "IB102",
                    enrolments_aggregate: {
                        aggregate: {
                            count: 2,
                        },
                    },
                },
                {
                    capacity: 20,
                    detail: "Martin teaching C# basics.",
                    name: "PV178",
                    enrolments_aggregate: {
                        aggregate: {
                            count: 1,
                        },
                    },
                },
            ],
        },
    };

    const courses = data.data.course.map((course) => {
        return {
            name: course.name,
            detail: course.detail,
            capacity: `${course.enrolments_aggregate.aggregate.count} / ${course.capacity}`,
        };
    });

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
            <Link to="/course/1/edit">
                <Button>Edit</Button>
            </Link>
            <Link to="/course/1">
                <Button>Detail</Button>
            </Link>
            <Table dataSource={courses} columns={columns} />
        </>
    );
}
