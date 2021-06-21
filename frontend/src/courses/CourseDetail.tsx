import React from "react";
import { message, Popconfirm, Progress, Skeleton, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import "./CourseDetail.css";
import Button from "antd/es/button";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import NotFound from "../status/NotFound";
import { GET_COURSE } from "../utils/queries";
import ServerError from "../status/ServerError";
import { CourseReply } from "../utils/gqlTypes";
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

function CourseDetail() {
    let { id } = useParams<{ id: string }>();
    if (isNaN(Number(id))) return <NotFound />;

    const { loading, error, data } = useQuery<CourseReply>(GET_COURSE, {
        variables: { id: +id },
    });
    if (loading)
        return (
            <Skeleton
                className={"detail-skeleton"}
                active
                paragraph={{ rows: 13 }}
            />
        );
    console.log(error);
    if (error) return <ServerError />;

    if (data?.course.length == 0 || data?.course[0] == undefined)
        return <NotFound />;
    const enrolledStudents = data?.course[0].enrolments.length!;
    const course = data?.course[0];

    const isRegistrationEnabled =
        dayjs(course.enrolment_start) < dayjs() &&
        dayjs() < dayjs(course.enrolment_end) &&
        enrolledStudents < course.capacity;
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
