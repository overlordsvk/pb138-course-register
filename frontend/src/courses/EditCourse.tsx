import React from "react";
import { Form, Input, Button, Cascader, InputNumber, Skeleton } from "antd";
import { DatePicker } from "../dateComponents";

import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import { getSemestersAsCascaderOptions } from "../utils/helpers";
import { useParams } from "react-router-dom";
import NotFound from "../status/NotFound";
import { getCourse, getSemesters } from "../utils/queries";
import { useQuery } from "@apollo/client";
import ServerError from "../status/ServerError";
import { CourseReply, SemestersReply } from "../utils/gqlTypes";

const { RangePicker } = DatePicker;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

function EditCourse() {
    let { id } = useParams<{ id: string }>();
    if (isNaN(Number(id))) return <NotFound />;
    const {
        loading: loadingCourse,
        error: errorCourse,
        data: dataCourse,
    } = useQuery<CourseReply>(getCourse(+id));
    const {
        loading: loadingSemesters,
        error: errorSemesters,
        data: dataSemesters,
    } = useQuery<SemestersReply>(getSemesters());
    if (loadingCourse || loadingSemesters)
        return (
            <Skeleton
                className={"detail-skeleton"}
                active
                paragraph={{ rows: 13 }}
            />
        );
    if (errorCourse || errorSemesters) return <ServerError />;

    if (
        dataCourse?.course.length == 0 ||
        dataCourse?.course[0] == undefined ||
        dataSemesters?.semesters.length == 0 ||
        dataSemesters?.semesters == undefined
    )
        return <NotFound />;

    const course = dataCourse?.course[0];
    const semesters = dataSemesters?.semesters;
    const options = getSemestersAsCascaderOptions(semesters);

    const initialValues = {
        "course-code": course.code,
        "course-name": course.name,
        "course-detail": course.detail,
        semester: [course.semester.year, course.semester.id],
        capacity: course.capacity,
        "registration-time-interval": [
            dayjs(course.enrolment_start),
            dayjs(course.enrolment_end),
        ],
    };

    const onFinish = (values: any) => {
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <h1>Edit course {course.code}</h1>
            <Form
                {...layout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={initialValues}
            >
                <Form.Item
                    label="Course code"
                    name="course-code"
                    rules={[
                        {
                            required: true,
                            message: "Please input code for the course",
                            whitespace: false,
                        },
                    ]}
                >
                    <Input placeholder="Course code" />
                </Form.Item>
                <Form.Item
                    label="Course name"
                    name="course-name"
                    rules={[
                        {
                            required: true,
                            message: "Please input name for the course",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input placeholder="Course name" />
                </Form.Item>
                <Form.Item label="Detail" name="course-detail">
                    <TextArea rows={4} placeholder="Detail" />
                </Form.Item>
                <Form.Item
                    label="Semester"
                    name="semester"
                    rules={[
                        { required: true, message: "Please select semester" },
                    ]}
                >
                    <Cascader options={options} />
                </Form.Item>
                <Form.Item
                    label="Capacity"
                    name="capacity"
                    rules={[
                        {
                            required: true,
                            type: "number",
                            min: 0,
                            message: "Capacity must be 0 or more",
                        },
                    ]}
                >
                    <InputNumber placeholder="Capacity" />
                </Form.Item>
                <Form.Item
                    label="Registration availability time"
                    name="registration-time-interval"
                >
                    <RangePicker showTime />
                </Form.Item>
                <Form.Item label="Confirm">
                    <Button htmlType="submit" type="primary">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditCourse;
