import { Breadcrumb, Button, Layout,  Table } from "antd";
import React from "react";
import {
    BrowserRouter as Router, Switch, Route, Link,
} from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import MainMenu from "./MainMenu";
import CreateCourse from "./CreateCourse";
const { Header, Content, Footer } = Layout;


function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function MyCourses() {
    const dataSource = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
    ];
      
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
    ];
      
    return <>
        <h1>My Courses</h1>
        <Table dataSource={dataSource} columns={columns} />
    </>; 
}
function Courses() {
    const dataSource = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
    ];
      
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
    ];
      
    return <>
        <h1> Courses</h1>
        <Link to="/createcourse">
            <Button>
                Create new
            </Button>
        </Link>
        <Table dataSource={dataSource} columns={columns} />
    </>;
}

function Users() {
    return <h2>Users</h2>;
}

export default function App() {
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
                    <MainMenu/>


                </Header>
                <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
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
                            <Route path="/users">
                                <Users />
                            </Route>
                            <Route path="/createcourse">
                                <CreateCourse />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>pb138 ©2021</Footer>
            </Layout>
        </Router>
    );
}






