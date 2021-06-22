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
import Users from "./admin/user/Users";
import Semesters from "./admin/semester/Semesters";
import { UserRole } from "./utils/helpers";
import SemesterEdit from "./admin/semester/SemesterEdit";
import SemesterCreate from "./admin/semester/SemesterCreate";

function ContentRouting() {
    return (
        <div className="site-layout-content">
            <Switch>
                <ProtectedRoute
                    path="/mycourses"
                    role={UserRole.student + UserRole.teacher}
                >
                    <MyCourses />
                </ProtectedRoute>
                <ProtectedRoute
                    path="/courses"
                    role={UserRole.student + UserRole.teacher}
                >
                    <Courses />
                </ProtectedRoute>
                <ProtectedRoute
                    path="/profile"
                    role={UserRole.student + UserRole.teacher + UserRole.admin}
                >
                    <Profile />
                </ProtectedRoute>
                <ProtectedRoute path="/course/new" role={UserRole.teacher}>
                    <CreateCourse />
                </ProtectedRoute>
                <ProtectedRoute path="/course/:id/edit" role={UserRole.teacher}>
                    <EditCourse />
                </ProtectedRoute>
                <ProtectedRoute
                    path="/course/:id/students"
                    role={UserRole.student + UserRole.teacher}
                >
                    <MyCourseStudents />
                </ProtectedRoute>
                <ProtectedRoute
                    path="/course/:id"
                    role={UserRole.student + UserRole.teacher}
                >
                    <CourseDetail />
                </ProtectedRoute>
                <ProtectedRoute path="/users" role={UserRole.admin}>
                    <Users />
                </ProtectedRoute>
                <ProtectedRoute path="/semester/new" role={UserRole.admin}>
                    <SemesterCreate />
                </ProtectedRoute>
                <ProtectedRoute path="/semester/:id/edit" role={UserRole.admin}>
                    <SemesterEdit />
                </ProtectedRoute>
                <ProtectedRoute path="/semesters" role={UserRole.admin}>
                    <Semesters />
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
