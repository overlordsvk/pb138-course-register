import React, { useState } from "react";
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import { Menu } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
// import mySubjects from "./icons/book-reader-solid.svg";

// import { MainMenu } from "./Menu";

function Home() {
    return <h2>My Subjects</h2>;
}

function About() {
    return <h2>Subject List</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
const { SubMenu } = Menu;


export default function App() {
    const [current, setCurrent] = useState({"key":"mail"});
    return (
        <Router>
            <div>
                <Menu onClick={setCurrent} selectedKeys={[current.key]} mode="horizontal" >
                    <Menu.Item key="mail" icon={<UserOutlined/>}>
                        <Link to="/" > My Subjects</Link>
                    </Menu.Item>
                    <Menu.Item key="app" icon={<BookOutlined />}>
                        <Link to="/Subject List">Subject List</Link>
                    </Menu.Item>
                    <SubMenu key="SubMenu" title="Navigation Three - Submenu">
                        <Menu.ItemGroup title="Item 1">
                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Item 2">
                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <Menu.Item key="alipay">
                        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                            Navigation Four - Link
                        </a>
                    </Menu.Item>
                </Menu>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/Subject List">
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
