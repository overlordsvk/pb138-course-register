/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from "react";
import {
    Alert,
    Descriptions,
    message,
    Popconfirm,
    Progress,
    Skeleton,
    Spin,
    Tooltip,
} from "antd";
import dayjs from "dayjs";
import "./CourseDetail.css";
import Button from "antd/es/button";
import { Link, Redirect, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import NotFound from "../status/NotFound";
import {
    CREATE_ENROLMENT,
    DELETE_ENROLMENT,
    GET_COURSE,
} from "../utils/queries";
import ServerError from "../status/ServerError";
import { CourseReply } from "../utils/gqlTypes";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import { LoadingOutlined } from "@ant-design/icons";
import { refetchTrigger } from "../state/atoms";
import { isTeacher } from "../utils/helpers";

function CourseDetail() {
    let { id } = useParams<{ id: string }>();
    const size = useWindowSize();

    const [showLoading, setShowLoading] = useState(false);
    const [done, setDone] = useState(false);
    const teacher = isTeacher();
    const appUser = useRecoilValue(userState);
    const [refetchNow, setRefetchNow] = useRecoilState(refetchTrigger);
    const { loading, error, data, refetch } = useQuery<CourseReply>(
        GET_COURSE,
        {
            variables: { id: +id },
        }
    );
    const [createEnrolment] = useMutation(CREATE_ENROLMENT);
    const [deleteEnrolment] = useMutation(DELETE_ENROLMENT);

    const path = `/course/${id}/edit`;

    useEffect(() => {
        let mounted = true;
        if (mounted) refetch();
        return () => {
            mounted = false;
        };
    }, [refetchNow]);

    if (isNaN(Number(id))) return <NotFound />;
    if (done) return <Redirect to="/mycourses" />;
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
    const enrolledStudents = course.enrolments.filter((enrolment) => {
        return enrolment.user.role == "student";
    }).length!;
    const isFull = enrolledStudents >= course.capacity;
    const isAlreadyEnrolled =
        course.enrolments.find((e) => e.user_id == appUser.id) != undefined;
    const isRegistrationEnabled =
        dayjs(course.enrolment_start) < dayjs() &&
        dayjs() < dayjs(course.enrolment_end);

    function useWindowSize() {
        // Initialize state with undefined width/height so server and client renders match
        // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
        const [windowSize, setWindowSize] = useState({
            width: undefined as undefined | number,
            height: undefined as undefined | number,
        });
        useEffect(() => {
            // Handler to call on window resize
            function handleResize() {
                // Set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
            // Add event listener
            window.addEventListener("resize", handleResize);
            // Call handler right away so state gets updated with initial window size
            handleResize();
            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        return windowSize;
    }
    async function enroll() {
        setShowLoading(true);

        await createEnrolment({
            variables: { id: +id, user_id: appUser.id },
        });
        setShowLoading(false);
        setRefetchNow(!refetchNow);
        message.success("You have succesfuly enrolled in " + course.code);
        setDone(true);
    }

    async function unroll() {
        setShowLoading(true);

        await deleteEnrolment({
            variables: { course_id: +id, user_id: appUser.id },
        });
        setShowLoading(false);
        setRefetchNow(!refetchNow);
        message.success("You have succesfuly unrolled from " + course.code);
        setDone(true);
    }

    console.log(course.teacher.auth0_id);
    console.log(appUser.id);
    return (
        <Spin
            spinning={showLoading}
            indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />}
        >
            <h1>{`${course.code}: ${course.name}`}</h1>
            {isAlreadyEnrolled && !teacher && (
                <Alert
                    className="descriptions-table"
                    message="You are enroled in this course"
                    type="info"
                />
            )}
            {!isRegistrationEnabled && (
                <Alert
                    className="descriptions-table"
                    message="Registration is not awailable now!"
                    type="warning"
                />
            )}
            <Descriptions
                className="descriptions-table"
                bordered
                layout={
                    size.width && size.width < 700 ? "vertical" : "horizontal"
                }
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 0 }}
            >
                <Descriptions.Item label="Semester">
                    {course.semester.term} {course.semester.year}
                </Descriptions.Item>
                <Descriptions.Item label="Teacher">
                    {course.teacher.name}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    {course.detail}
                </Descriptions.Item>
                <Descriptions.Item label="Number of registrations">
                    <span className="registrations">{`${enrolledStudents}/${course.capacity}`}</span>
                    <Progress
                        className="progressbar"
                        percent={(enrolledStudents / course.capacity) * 100}
                        showInfo={false}
                        status={
                            enrolledStudents >= course.capacity
                                ? "exception"
                                : "normal"
                        }
                    />
                </Descriptions.Item>
                <Descriptions.Item label="Registration begin">
                    {dayjs(course.enrolment_start).format("D.M.YYYY HH:mm")}
                </Descriptions.Item>
                <Descriptions.Item label="Registration end">
                    {dayjs(course.enrolment_end).format("D.M.YYYY HH:mm")}
                </Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: "1em" }}>
                {teacher ? (
                    appUser.id == course.teacher.auth0_id && (
                        <Link to={path}>
                            <Button
                                style={{ marginBottom: "1em" }}
                                type="primary"
                            >
                                edit
                            </Button>
                        </Link>
                    )
                ) : !isAlreadyEnrolled ? (
                    <Popconfirm
                        disabled={!isRegistrationEnabled || isFull}
                        title="Are you sure you want to register this course?"
                        onConfirm={enroll}
                        placement="right"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip
                            title={
                                !isRegistrationEnabled
                                    ? "Registration is not available now!"
                                    : isFull
                                    ? "Course is full"
                                    : ""
                            }
                        >
                            <Button
                                type="primary"
                                disabled={!isRegistrationEnabled || isFull}
                            >
                                Register
                            </Button>
                        </Tooltip>
                    </Popconfirm>
                ) : (
                    <Popconfirm
                        disabled={!isRegistrationEnabled}
                        title="Are you sure you want to unroll from this course?"
                        onConfirm={unroll}
                        placement="right"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip
                            title={
                                !isRegistrationEnabled
                                    ? "Registration is not available now!"
                                    : ""
                            }
                        >
                            <Button
                                type="primary"
                                disabled={!isRegistrationEnabled}
                            >
                                Unroll
                            </Button>
                        </Tooltip>
                    </Popconfirm>
                )}
            </div>
        </Spin>
    );
}

export default CourseDetail;
