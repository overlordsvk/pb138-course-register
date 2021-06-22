import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    Cascader,
    InputNumber,
    Skeleton,
    Spin,
    message,
} from "antd";
import { DatePicker } from "../dateComponents";
import TextArea from "antd/lib/input/TextArea";
import { getSemestersAsCascaderOptions } from "../utils/helpers";
import { useMutation, useQuery } from "@apollo/client";
import {
    CREATE_COURSE,
    CREATE_ENROLMENT,
    GET_SEMESTERS,
} from "../utils/queries";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import { SemestersReply } from "../utils/gqlTypes";
import ServerError from "../status/ServerError";
import NotFound from "../status/NotFound";
import { LoadingOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import { refetchTrigger } from "../state/atoms";

const { RangePicker } = DatePicker;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

function CreateCourse() {
    // eslint-disable-next-line no-unused-vars
    const [showLoading, setShowLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [createCourse] = useMutation(CREATE_COURSE);
    const [createEnrollment] = useMutation(CREATE_ENROLMENT);
    const [refetchNow, setRefetchNow] = useRecoilState(refetchTrigger);

    const {
        loading: loadingSemesters,
        error: errorSemesters,
        data: dataSemesters,
    } = useQuery<SemestersReply>(GET_SEMESTERS);
    const appUser = useRecoilValue(userState);
    if (done) return <Redirect to="/courses" />;
    if (loadingSemesters)
        return (
            <Skeleton
                className={"detail-skeleton"}
                active
                paragraph={{ rows: 13 }}
            />
        );
    if (errorSemesters) return <ServerError />;

    if (
        dataSemesters?.semesters.length == 0 ||
        dataSemesters?.semesters == undefined
    )
        return <NotFound />;

    const semesters = dataSemesters?.semesters;
    const options = getSemestersAsCascaderOptions(semesters);

    const onFinish = async (values: any) => {
        setShowLoading(true);
        const courseId = await createCourse({
            variables: {
                code: values.code,
                name: values.name,
                detail: values.detail,
                capacity: values.capacity,
                enrolment_start: values.timeIntervals[0],
                enrolment_end: values.timeIntervals[1],
                semester_id: values.semester[1],
                teacher_id: appUser.id,
            },
        });
        console.log(courseId);
        await createEnrollment({
            variables: {
                id: courseId.data.insert_course_one.id,
                user_id: appUser.id,
            },
        });
        setRefetchNow(!refetchNow);
        setShowLoading(false);
        message.success("Created course");
        setDone(true);
    };
    const onFinishFailed = () => {
        message.error("Check iputs");
    };
    return (
        <>
            <h1>Create new course</h1>
            <Spin
                spinning={showLoading}
                indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />}
            >
                <Form
                    {...layout}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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

export default CreateCourse;
