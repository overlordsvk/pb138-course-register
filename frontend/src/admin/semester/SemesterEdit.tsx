import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    InputNumber,
    Skeleton,
    message,
    Spin,
} from "antd";

import { Redirect, useParams } from "react-router-dom";
import NotFound from "../../status/NotFound";
import { SEMESTER_GET, SEMESTER_UPDATE } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import ServerError from "../../status/ServerError";
import { SemestersReply } from "../../utils/gqlTypes";
import { LoadingOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { refetchTrigger } from "../../state/atoms";


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

function SemesterEdit() {
    let { id } = useParams<{ id: string }>();
    const [showLoading, setShowLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [updateSemester] = useMutation(SEMESTER_UPDATE);
    const [refetchNow, setRefetchNow] = useRecoilState(refetchTrigger);

    const {
        loading: loading,
        error: error,
        data: data,
        refetch,
    } = useQuery<SemestersReply>(SEMESTER_GET, {
        variables: { id: +id },
    });

    useEffect(() => {
        refetch();
    }, [refetchNow]);

    if (isNaN(Number(id))) return <NotFound />;
    if (done) return <Redirect to={"/semesters"} />;
    if (loading)
        return (
            <Skeleton
                className={"detail-skeleton"}
                active
                paragraph={{ rows: 4 }}
            />
        );
    if (error) return <ServerError />;

    if (!data ||
        data.semesters.length == 0 ||
        data.semesters[0] == undefined
    )
        return <NotFound />;

    const semester = data.semesters[0];

    const initialValues = {
        term: semester.term,
        year: semester.year,
    };

    const onFinish = async (values: { name: string; term: string; year: string; }) => {
        setShowLoading(true);
        await updateSemester({
            variables: {
                id: +id,
                term: values.term,
                year: +values.year,
            },
        });
        setRefetchNow(!refetchNow);
        setShowLoading(false);
        message.success("Updated semester");
        setDone(true);
    };

    return (
        <>
            <h1>Edit semester</h1>
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
                        label="Term"
                        name="term"
                        rules={[
                            { required: true, message: "Please input name for the semester" },
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
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </>
    );
}

export default SemesterEdit;
