import React from "react";
import { message, Popconfirm, Progress, Skeleton, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import "./CourseDetail.css";
import Button from "antd/es/button";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
// import Loading from "../common/Loading";

const teacher = false;
function confirm(e: any) {
    console.log(e);
    const success = true;
    if (success) {
        message.success("Course registered");
    } else {
        message.error("Something went wrong");
    }
}
function getCourse(id: number) {
    return gql`
        query CourseDetail {
            course(where: {id: {_eq: ${id}}}) {
              id
              capacity
              code
              detail
              enrolment_start
              enrolment_end
              name
              teacher {
                name
              }
              semester {
                id
                year
                term
              }
              enrolments {
                user {
                  id
                  name
                }
              }
            }
          }
          
    `;
}

function CourseDetail() {
    let { id } = useParams<{ id: string }>();
    const { loading, error, data } = useQuery<CourseReply>(getCourse(+id));
    if (loading)
        return (
            <Skeleton
                className={"detail-skeleton"}
                active
                paragraph={{ rows: 13 }}
            />
        );
    if (error) return <p>Error :(</p>;

    const enrolledStudents = data?.course[0]!.enrolments.length!;
    const course = data?.course[0]!;
    console.log(data);

    const isRegistrationEnabled =
        dayjs(course.enrolment_start) < dayjs() &&
        dayjs() < dayjs(course.enrolment_end);
    return (
        <>
            <Space direction="vertical">
                <div>
                    <h1>{`${course.code}: ${course.name}`}</h1>
                    <h3>
                        {course.semester.term} {course.semester.year}
                    </h3>
                </div>
                <div>
                    <h3>Teacher:</h3>
                    <p>{course.teacher.name}</p>
                </div>
                <div>
                    <h3>Description:</h3>
                    <p>{course.detail}</p>
                </div>
                <div>
                    <h3>Number of registrations:</h3>
                    <span>{`${enrolledStudents}/${course.capacity}`}</span>
                    {enrolledStudents >= course.capacity ? (
                        <Progress
                            className="progressbar"
                            percent={(enrolledStudents / course.capacity) * 100}
                            showInfo={false}
                            status="exception"
                        />
                    ) : (
                        <Progress
                            className="progressbar"
                            percent={(enrolledStudents / course.capacity) * 100}
                            showInfo={false}
                        />
                    )}
                </div>
                <div>
                    <h3>Registration time start:</h3>
                    <p>
                        {dayjs(course.enrolment_start).format("D.M.YYYY HH:mm")}
                    </p>
                </div>
                <div>
                    <h3>Registration time end:</h3>
                    <p>
                        {dayjs(course.enrolment_end).format("D.M.YYYY HH:mm")}
                    </p>
                </div>

                {/*TODO: if already registered show message and unregister choice*/}
                {teacher ? (
                    <></>
                ) : (
                    <Popconfirm
                        disabled={!isRegistrationEnabled}
                        title="Are you sure you want to register this course?"
                        onConfirm={confirm}
                        placement="right"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip
                            title={
                                isRegistrationEnabled
                                    ? ""
                                    : "Registration is not available now!"
                            }
                        >
                            <Button
                                type="primary"
                                disabled={!isRegistrationEnabled}
                            >
                                Register
                            </Button>
                        </Tooltip>
                    </Popconfirm>
                )}
            </Space>
        </>
    );
}

export default CourseDetail;

export interface CourseReply {
    course: Course[];
}

export interface Course {
    id: number;
    capacity: number;
    code: string;
    detail: string;
    enrolment_start: string;
    enrolment_end: string;
    name: string;
    teacher: Teacher;
    semester: Semester;
    enrolments: Enrolment[];
}

export interface Enrolment {
    user: User;
}

export interface User {
    id: number;
    name: string;
}

export interface Semester {
    id: number;
    year: number;
    term: string;
}

export interface Teacher {
    name: string;
}
