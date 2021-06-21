import React, { useState } from "react";
import {
    Alert,
    message,
    Popconfirm,
    Progress,
    Skeleton,
    Space,
    Spin,
    Tooltip,
} from "antd";
import dayjs from "dayjs";
import "./CourseDetail.css";
import Button from "antd/es/button";
import { Redirect, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import NotFound from "../status/NotFound";
import { CREATE_ENROLMENT, GET_COURSE } from "../utils/queries";
import ServerError from "../status/ServerError";
import { CourseReply } from "../utils/gqlTypes";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import { LoadingOutlined } from "@ant-design/icons";
// import Loading from "../common/Loading";

const teacher = false;

function CourseDetail() {
    const [showLoading, setShowLoading] = useState(false);
    const [done, setDone] = useState(false);

    let { id } = useParams<{ id: string }>();
    if (isNaN(Number(id))) return <NotFound />;
    const userId = useRecoilValue(userState);

    const { loading, error, data } = useQuery<CourseReply>(GET_COURSE, {
        variables: { id: +id },
    });
    const [createEnrolment] = useMutation(CREATE_ENROLMENT);

    if (done) return <Redirect to="/courses" />;
    if (loading)
        return (
            <Skeleton
                className={"detail-skeleton"}
                active
                paragraph={{ rows: 13 }}
            />
        );
    if (error) return <ServerError />;

    if (data?.course.length == 0 || data?.course[0] == undefined)
        return <NotFound />;
    const course = data?.course[0];
    const enrolledStudents = course.enrolments.length!;
    const isAlreadyEnrolled =
        course.enrolments.find((e) => e.user_id == userId) == undefined;

    const isRegistrationEnabled =
        dayjs(course.enrolment_start) < dayjs() &&
        dayjs() < dayjs(course.enrolment_end) &&
        enrolledStudents < course.capacity;

    async function confirm() {
        setShowLoading(true);

        await createEnrolment({
            variables: { id: +id, user_id: userId },
        });
        setShowLoading(false);

        message.success("You have succesfuly enrolled in " + course.code);
        setDone(true);
    }
    return (
        <Spin
            spinning={showLoading}
            indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />}
        >
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

                {/*TODO: if already registered show unregister choice*/}

                {isAlreadyEnrolled ? (
                    <Alert
                        message="You are enroled in this course!"
                        type="info"
                    />
                ) : (
                    <></>
                )}
                {teacher || isAlreadyEnrolled ? (
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
        </Spin>
    );
}

export default CourseDetail;
