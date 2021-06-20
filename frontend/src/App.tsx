import {
    Breadcrumb, Layout, Table,
} from "antd";
import React from "react";
import {
    BrowserRouter as  Router, Switch, Route, Link,
} from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import MainMenu from "./MainMenu";
import CreateCourse from "./CreateCourse";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./common/Profile";
import TestCourses from "./common/TestCourses";
import EditCourse from "./EditCourse";
import { Courses } from "./courses/Courses";
import CourseDetail from "./CourseDetail";

const { Header, Content, Footer } = Layout;

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function MyCourses() {

    // query MyQuery {
    //     enrolment(where: {user_id: {_eq: 2}}) {
    //       course {
    //         name
    //         detail
    //       }
    //     }
    //   }
      
    const data = {
        "data": {
            "enrolment": [
                {
                    "course": {
                        "name": "IB102",
                        "detail": "Simple introduction to algorithms for dummies"
                    }
                },
                {
                    "course": {
                        "name": "PV178",
                        "detail": "Martin teaching C# basics."
                    }
                }
            ]
        }
    };

    const dataSource = data.data.enrolment.map((course) => {return {
        "name" : course.course.name,
        "detail": course.course.detail,
    };});
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "detail",
            dataIndex: "detail",
            key: "detail",
        },
    ];

    return (
        <>
            <h1>My Courses</h1>
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default function App() {
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading</div>;
    }
  
    return (
        <Router>
            <Layout className="layout">
                <Header>
                    <div className="logo">
                        <h1 className="logo-text">
                            <Link to="/">
                                Courses Registration
                            </Link>
                        </h1>
                    </div>
                    <MainMenu />

                </Header>
                <Content className="content">
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Switch>
                            <Route path="/about">
                                <About />
                            </Route>
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
                            <Route path="/createcourse">
                                <CreateCourse />
                            </Route>
                            <Route path="/editcourse">
                                <EditCourse />
                            </Route>
                            <Route path="/detail">
                                <CourseDetail />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </Content>
                <Footer className="footer">pb138 ©2021</Footer>
            </Layout>
        </Router>
    );
}
