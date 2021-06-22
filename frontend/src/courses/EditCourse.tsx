import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    Cascader,
    InputNumber,
    Skeleton,
    message,
    Spin,
} from "antd";
import { DatePicker } from "../dateComponents";

import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import { getSemestersAsCascaderOptions } from "../utils/helpers";
import { Redirect, useParams } from "react-router-dom";
import NotFound from "../status/NotFound";
import { GET_COURSE, GET_SEMESTERS, UPDATE_COURSE } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import ServerError from "../status/ServerError";
import { CourseReply, SemestersReply } from "../utils/gqlTypes";
import { LoadingOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { refetchTrigger } from "../state/atoms";

const { RangePicker } = DatePicker;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

function EditCourse() {
    let { id } = useParams<{ id: string }>();
    const [showLoading, setShowLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [updateCourse] = useMutation(UPDATE_COURSE);
    const [refetchNow, setRefetchNow] = useRecoilState(refetchTrigger);

    const {
        loading: loadingCourse,
        error: errorCourse,
        data: dataCourse,
        refetch,
    } = useQuery<CourseReply>(GET_COURSE, {
        variables: { id: +id },
    });
    const {
        loading: loadingSemesters,
        error: errorSemesters,
        data: dataSemesters,
    } = useQuery<SemestersReply>(GET_SEMESTERS);

    useEffect(() => {
        let mounted = true;
        if (mounted) refetch();
        return () => {
            mounted = false;
        };
    }, [refetchNow]);

    if (isNaN(Number(id))) return <NotFound />;
    if (done) return <Redirect to={`/course/${id}`} />;
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
        code: course.code,
        name: course.name,
        detail: course.detail,
        semester: [course.semester.year, course.semester.id],
        capacity: course.capacity,
        timeIntervals: [
            dayjs(course.enrolment_start),
            dayjs(course.enrolment_end),
        ],
    };

    const onFinish = async (values: any) => {
        setShowLoading(true);
        await updateCourse({
            variables: {
                id: +id,
                code: values.code,
                name: values.name,
                detail: values.detail,
                capacity: values.capacity,
                enrolment_start: values.timeIntervals[0],
                enrolment_end: values.timeIntervals[1],
                semester_id: values.semester[1],
            },
        });
        setRefetchNow(!refetchNow);
        setShowLoading(false);
        message.success("Updated course");
        setDone(true);
    };

    return (
        <>
            <h1>Edit course {course.code}</h1>
            <Spin
                spinning={showLoading}
                indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />}
            >
                <Form
                    {...layout}
                    onFinish={onFinish}
                    initialValues={initialValues}
                >
                    <Form.Item
                        label="Course code"
                        name="code"
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
                        name="name"
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
                    <Form.Item
                        label="Detail"
                        name="detail"
                        rules={[
                            { required: true, message: "Please select detail" },
                        ]}
                    >
                        <TextArea rows={4} placeholder="Detail" />
                    </Form.Item>
                    <Form.Item
                        label="Semester"
                        name="semester"
                        rules={[
                            {
                                required: true,
                                message: "Please select semester",
                            },
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
                        name="timeIntervals"
                        rules={[
                            {
                                required: true,
                                message: "Please select registration time",
                            },
                        ]}
                    >
                        <RangePicker showTime />
                    </Form.Item>
                    <Form.Item label="Confirm">
                        <Button htmlType="submit" type="primary">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </>
    );
}

export default EditCourse;
