import React from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { gql, useQuery } from "@apollo/client";

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

interface ICourseDataCourse {
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

interface ICourseData {
    course: ICourseDataCourse[];
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
    console.log("courses");
    const { loading, error, data } = useQuery(TheCourses);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const CourseData: ICourseData = data;

    const Courses = CourseData.course.map((course: ICourseDataCourse) => {
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
