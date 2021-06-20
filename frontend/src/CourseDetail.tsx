import React from "react";
import { message, Popconfirm, Progress, Space, Tooltip, } from "antd";
import dayjs from "dayjs";
import "./CourseDetail.css";
import Button from "antd/es/button";

const teacher = false;
const course = {
    "id": 1,
    "code": "IB102",
    "name": "Simple introduction to algorithms for dummies",
    "detail": "Simple introduction to algorithms for dummies\nwith very very \nlong description\nand many rows",
    "capacity": 100,
    "enrolment_start": "2021-02-10T00:00:00+00:00",
    "enrolment_end": "2021-07-10T00:00:00+00:00",
    "semester_id": 1,
    "semester": {
        "id": 1,
        "term": "Spring",
        "year": 2021
    },
    "teacher": {
        "name": "Fred Johnson"
    }
};
const enrolledStudents = 25;

function confirm(e :any) {
    console.log(e);
    const success = true;
    if(success){
        message.success("Course registered");
    } else{
        message.error("Something went wrong");

    }
}
  
function CourseDetail() {
    const isRegistrationEnabled = dayjs(course.enrolment_start) < dayjs() && dayjs() < dayjs(course.enrolment_end);
    return (
        <>
            <Space direction="vertical" >
                <div>
                    <h1>{`${ course.code}: ${ course.name }`}</h1>
                    <h3>{course.semester.term} {course.semester.year}</h3>
                </div>
                <div>
                    <h3>Teacher:</h3>
                    <p>{course.teacher.name}</p>
                </div>
                <div>
                    <h3>Description:</h3>
                    <p>{course.detail}</p>
                </div>
                <div>
                    <h3>Number of registrations:</h3>
                    <span>{`${enrolledStudents}/${course.capacity}`}</span>
                    {
                        enrolledStudents >= course.capacity 
                            ? <Progress className="progressbar" percent={enrolledStudents/course.capacity*100} showInfo={false} status="exception"/>
                            : <Progress className="progressbar" percent={enrolledStudents/course.capacity*100} showInfo={false}/>
                    }
                </div>
                <div>
                    <h3>Registration time start:</h3>
                    <p>{dayjs(course.enrolment_start).format("D.M.YYYY HH:mm") }</p>
                </div>
                <div>
                    <h3>Registration time end:</h3>
                    <p>{dayjs(course.enrolment_end).format("D.M.YYYY HH:mm") }</p>
                </div>
                
                {teacher
                    ?<></>
                    :<Popconfirm
                        disabled={!isRegistrationEnabled}
                        title="Are you sure you want to register this course?"
                        onConfirm={confirm}
                        placement="right"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title={isRegistrationEnabled ? "" : "Registration is not available now!"}>
                            <Button type="primary" disabled={!isRegistrationEnabled}>Register</Button>
                        </Tooltip>
                    </Popconfirm>}
            
            </Space>
        </>
    );
}

export default CourseDetail;
