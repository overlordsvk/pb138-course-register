import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./common/Profile";
import CourseDetail from "./courses/CourseDetail";
import { Courses } from "./courses/Courses";
import CreateCourse from "./courses/CreateCourse";
import EditCourse from "./courses/EditCourse";
import MyCourses from "./courses/MyCourses";
import MyCourseStudents from "./courses/MyCourseStudents";
import Home from "./Home";
import NotFound from "./status/NotFound";
import Unauthorized from "./status/Unauthorized";

function ContentRouting() {
    return (
        <div className="site-layout-content">
            <Switch>
                <ProtectedRoute path="/mycourses">
                    <MyCourses />
                </ProtectedRoute>
                <ProtectedRoute path="/courses">
                    <Courses />
                </ProtectedRoute>
                <ProtectedRoute path="/profile">
                    <Profile />
                </ProtectedRoute>
                <ProtectedRoute path="/course/new">
                    <CreateCourse />
                </ProtectedRoute>
                <ProtectedRoute path="/course/:id/edit">
                    <EditCourse />
                </ProtectedRoute>
                <ProtectedRoute path="/course/:id/students">
                    <MyCourseStudents />
                </ProtectedRoute>
                <ProtectedRoute path="/course/:id">
                    <CourseDetail />
                </ProtectedRoute>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/unauthorized">
                    <Unauthorized />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </div>
    );
}

export default ContentRouting;
