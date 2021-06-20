import React from "react";
import { Route, Switch } from "react-router-dom";
import Profile from "./common/Profile";
import TestCourses from "./common/TestCourses";
import CourseDetail from "./courses/CourseDetail";
import { Courses } from "./courses/Courses";
import CreateCourse from "./courses/CreateCourse";
import EditCourse from "./courses/EditCourse";
import MyCourses from "./courses/MyCourses";
import Home from "./Home";

function ContentRouting() {
    return (
        <div className="site-layout-content">
            <Switch>
                <Route path="/mycourses">
                    <MyCourses />
                </Route>
                <Route path="/courses">
                    <Courses />
                </Route>
                <Route path="/test-courses">
                    <TestCourses />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/course/new">
                    <CreateCourse />
                </Route>
                <Route path="/course/:id/edit">
                    <EditCourse />
                </Route>
                <Route path="/course/:id">
                    <CourseDetail />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default ContentRouting;
