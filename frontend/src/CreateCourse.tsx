import {
    Form, Input, Button, DatePicker, Cascader, InputNumber 
} from "antd";
import React from "react";
// import "./CreateCourse.css";
import * as moment from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import TextArea from "antd/lib/input/TextArea";

// const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

function pickRange(dates: RangeValue<moment.Moment>, dateStrings: [string, string]) {
    console.log(dates);
    console.log(dateStrings);
}

const cascaderOptions = [
    {
        value: "2020",
        label: "2020",
        children: [
            {
                value: "Spring",
                label: "Spring",
            },
            {
                value: "Autumn",
                label: "Autumn",
            },
        ],
    },
    {
        value: "2021",
        label: "2021",
        children: [
            {
                value: "Spring",
                label: "Spring",
            },
            {
                value: "Autumn",
                label: "Autumn",
            },
        ],
    },
];

function CreateCourse() {
    const onFinish = (values: any) => {
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item label="Course name" name="coursename" rules={[{ required: true, message: "Please input name for the course", whitespace: true }]}>
                <Input placeholder="Course name" />
            </Form.Item>
            <Form.Item label="Detail">
                <TextArea rows={4} placeholder="Detail" />
            </Form.Item>
            <Form.Item label="Semester">
                <Cascader
                    options={cascaderOptions}
                />
            </Form.Item>
            <Form.Item label="Capacity">
                <InputNumber placeholder="Capacity" />
            </Form.Item>
            <Form.Item label="Registration availability time">
                <RangePicker onChange={pickRange} showTime />
            </Form.Item>
            <Form.Item label="Confirm">
                <Button htmlType="submit" type="primary">Create</Button>
            </Form.Item>

        </Form>
    );
}

export default CreateCourse;
