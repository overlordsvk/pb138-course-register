import React from "react";
import {
    Form, Input, Button, Cascader, InputNumber 
} from "antd";
import { DatePicker } from "./dateComponents";

import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import { getSemestersAsCascaderOptions, Semester } from "./helpers";

const { RangePicker } = DatePicker;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};



const course = {
    "id": 1,
    "code": "IB102",
    "detail": "Simple introduction to algorithms for dummies\nwith very very \nlong description\nand many rows",
    "capacity": 100,
    "enrolment_start": "2021-02-10T00:00:00+00:00",
    "enrolment_end": "2021-07-10T00:00:00+00:00",
    "semester_id": 1,
    "name": "Simple introduction to algorithms for dummies",
    "semester": {
        "id": 1,
        "term": "Spring",
        "year": 2021
    }
};




const semesters :Semester[] = [
    {
        "id": 1,
        "year": 2021,
        "term": "Spring"
    },
    {
        "id": 4,
        "year": 2021,
        "term": "Autumn"
    },
    {
        "id": 3,
        "year": 2020,
        "term": "Spring"
    }
];

const options = getSemestersAsCascaderOptions(semesters);

const initialValues={
    "course-code":course.code,
    "course-name":course.name,
    "course-detail":course.detail,
    "capacity":course.capacity,
    "registration-time-interval":
[dayjs(course.enrolment_start), dayjs(course.enrolment_end)]

    
};

function EditCourse() {
    const onFinish = (values: any) => {
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            <h1>Edit course {course.code}</h1>
            <Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={initialValues}>
                <Form.Item label="Course code" name="course-code" rules={[{ required: true, message: "Please input code for the course", whitespace: false }]}>
                    <Input placeholder="Course code" />
                </Form.Item>
                <Form.Item label="Course name" name="course-name" rules={[{ required: true, message: "Please input name for the course", whitespace: true }]}>
                    <Input placeholder="Course name" />
                </Form.Item>
                <Form.Item label="Detail" name="course-detail">
                    <TextArea rows={4} placeholder="Detail" />
                </Form.Item>
                <Form.Item label="Semester" name="semester" rules={[{ required: true, message: "Please select semester"}]}>
                    <Cascader
                        options={options}
                    />
                </Form.Item>
                <Form.Item label="Capacity" name="capacity" rules={[{ required: true, type: "number", min: 0, message: "Capacity must be 0 or more"}]}>
                    <InputNumber placeholder="Capacity" />
                </Form.Item>
                <Form.Item label="Registration availability time" name="registration-time-interval">
                    <RangePicker showTime />
                </Form.Item>
                <Form.Item label="Confirm">
                    <Button htmlType="submit" type="primary">Create</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditCourse;
