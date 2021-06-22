import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    InputNumber,
    message,
    Spin,
} from "antd";
import { useMutation } from "@apollo/client";
import { SEMESTER_CREATE } from "../../utils/queries";
import { useRecoilState } from "recoil";
import { refetchTrigger } from "../../state/atoms";
import { Redirect } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

function SemesterCreate() {
    const [createSemester] = useMutation(SEMESTER_CREATE);
    const [refetchNow, setRefetchNow] = useRecoilState(refetchTrigger);
    const [done, setDone] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const onFinish = async (values: { term: string, year: string }) => {
        setShowLoading(true);
        await createSemester({
            variables: {
                term: values.term,
                year: +values.year,
            },
        });
        setRefetchNow(!refetchNow);
        message.success("Created semester");
        setDone(true);
        setShowLoading(false);
    };
    const onFinishFailed = () => {
        message.error("Check inputs");
    };

    if (done) return <Redirect to="/semesters" />;

    return (
        <Spin
            spinning={showLoading}
            indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />}
        >
            <h1>Create new semester</h1>
            <Form
                {...layout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Term"
                    name="term"
                    rules={[
                        {
                            required: true,
                            message: "Please input term",
                            whitespace: false,
                        },
                    ]}
                >
                    <Input placeholder="Term" />
                </Form.Item>
                <Form.Item
                    label="Year"
                    name="year"
                    rules={[
                        {
                            required: true,
                            type: "number",
                            min: 2000,
                            message: "Year must be 2000 or more",
                        },
                    ]}
                >
                    <InputNumber placeholder="Year" />
                </Form.Item>
                <Form.Item label="Confirm">
                    <Button htmlType="submit" type="primary">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Spin >
    );
}

export default SemesterCreate;
