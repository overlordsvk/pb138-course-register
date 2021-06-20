import { Form, Input, Button,  DatePicker, Cascader } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import "./CreateCourse.css";
import * as moment from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import TextArea from "antd/lib/input/TextArea";

// const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

function pickRange(dates: RangeValue<moment.Moment>, dateStrings: [string, string]){
    console.log(dates);
    console.log(dateStrings);
}
  
function CreateCourse() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data:any) => console.log(data);
    console.log(errors);
    return (
        <Form {...layout} onFinish={handleSubmit(onSubmit)}>
            <div >
                <Form.Item label="Name">
                    <Input  type="text" placeholder="Name" {...register("Name", {required: true})} />
                </Form.Item>
                <Form.Item label="Detail">
                    <TextArea rows={4} placeholder="Detail" {...register("Detail", {})} />
                </Form.Item>
                <Form.Item label="Capacity">
                    <Input  type="number" placeholder="Capacity" {...register("Capacity", {required: true, min: 0})} />
                </Form.Item>
                
                <Form.Item label="Semester">
                    <Cascader
                        options={[
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
                        ]}
                    />
                    {/* <Select  {...register("Semester", { required: true })}>
                        <Option value="2020">2020</Option>
                        <Option value="2021">2021</Option>
                        <Option value="2022">2022</Option>
                    </Select> */}
                </Form.Item>
                <Form.Item label="Registration availability time">
                    <RangePicker onChange={pickRange} showTime/>
                </Form.Item>
                <Form.Item label="Confirm">
                    <Button htmlType="submit" type="primary">Create</Button>
                </Form.Item>
            </div>
    
        </Form>
    );
}

export default CreateCourse;

