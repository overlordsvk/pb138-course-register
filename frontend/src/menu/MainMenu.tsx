import React, { useState } from "react";
import { Menu } from "antd";
import { SolutionOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./MainMenu.css";
import { Link } from "react-router-dom";
import AuthenticationButton from "../auth/AuthenticationButton";
import { useAuth0 } from "@auth0/auth0-react";

function MainMenu() {
    const [current, setCurrent] = useState({ key: "mail" });
    const { isAuthenticated } = useAuth0();
    return (
        <div>
            <Menu
                theme="dark"
                onClick={setCurrent}
                selectedKeys={[current.key]}
                mode="horizontal"
            >
                {isAuthenticated ? (
                    <>
                        <Menu.Item
                            className="menu-item"
                            key="mail"
                            icon={<SolutionOutlined />}
                        >
                            <Link to="/mycourses">My courses</Link>
                        </Menu.Item>
                        <Menu.Item
                            className="menu-item"
                            key="app"
                            icon={<UnorderedListOutlined />}
                        >
                            <Link to="/courses">Course list</Link>
                        </Menu.Item>
                        <Menu.Item key="profile" className="menu-item">
                            <Link to="/profile">Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="test-courses" className="menu-item">
                            <Link to="/test-courses">Test courses</Link>
                        </Menu.Item>
                    </>
                ) : (
                    <></>
                )}

                <Menu.Item key="logout" className="menu-logout">
                    <AuthenticationButton />
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MainMenu;
