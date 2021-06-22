import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./common/Profile";
import CourseDetail from "./courses/CourseDetail";
import { Courses } from "./courses/Courses";
import CreateCourse from "./courses/CreateCourse";
import EditCourse from "./courses/EditCourse";
import MyCourses from "./courses/MyCourses";
import Home from "./Home";
import NotFound from "./status/NotFound";
import Unauthorized from "./status/Unauthorized";
import { UserRole } from "./utils/helpers";
/* <ProtectedRoute path="/users" role={UserRole.student + UserRole.teacher}>
                    <Users />
                </ProtectedRoute>
                <ProtectedRoute path="/semesters" role={UserRole.student + UserRole.teacher}>
                    <Semesters />
                </ProtectedRoute>*/
function ContentRouting() {
    return (
        <div className="site-layout-content">
            <Switch>
                <ProtectedRoute path="/mycourses" role={UserRole.student + UserRole.teacher}>
                    <MyCourses />
                </ProtectedRoute>
                <ProtectedRoute path="/courses" role={UserRole.student + UserRole.teacher}>
                    <Courses />
                </ProtectedRoute>
                <ProtectedRoute path="/profile" role={UserRole.student + UserRole.teacher + UserRole.admin}>
                    <Profile />
                </ProtectedRoute>
                <ProtectedRoute path="/course/new" role={UserRole.teacher}>
                    <CreateCourse />
                </ProtectedRoute>
                <ProtectedRoute path="/course/:id/edit" role={UserRole.teacher}>
                    <EditCourse />
                </ProtectedRoute>
                <ProtectedRoute path="/course/:id" role={UserRole.student + UserRole.teacher}>
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
