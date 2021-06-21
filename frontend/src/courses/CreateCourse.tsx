import React from "react";
import { Form, Input, Button, Cascader, InputNumber } from "antd";
import { DatePicker } from "../dateComponents";
import TextArea from "antd/lib/input/TextArea";
import { getSemestersAsCascaderOptions, Semester } from "../utils/helpers";
import { useMutation } from "@apollo/client";
import { CREATE_COURSE } from "../utils/queries";

const { RangePicker } = DatePicker;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

const semesters: Semester[] = [
    {
        id: 1,
        name: "aaa",
        year: 2021,
        term: "Spring",
    },
    {
        id: 4,
        name: "aaa",
        year: 2021,
        term: "Autumn",
    },
    {
        id: 3,
        name: "aaa",
        year: 2020,
        term: "Spring",
    },
];

const options = getSemestersAsCascaderOptions(semesters);

function CreateCourse() {
    // eslint-disable-next-line no-unused-vars
    const [createCourse] = useMutation(CREATE_COURSE);
    const onFinish = (values: any) => {
        createCourse({
            variables: {
                code: values.code,
                name: values.name,
                detail: values.detail,
                capacity: values.capacity,
                enrolment_start: values.timeIntervals[0],
                enrolment_end: values.timeIntervals[1],
                semester_id: 1,
                teacher_id: 1,
            },
        });
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            <h1>Create new course</h1>
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
                <Form.Item label="Detail" name="detail">
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
                    name="timeIntervals"
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

export default CreateCourse;
