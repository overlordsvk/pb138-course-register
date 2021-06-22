import React from "react";
import { Menu } from "antd";
import { SolutionOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import AuthenticationButton from "../auth/AuthenticationButton";
import { useAuth0 } from "@auth0/auth0-react";

function MainMenu() {
    const { isAuthenticated } = useAuth0();
    return (
        <div>
            <Menu
                theme="dark"
                selectedKeys={[useLocation().pathname]}
                mode="horizontal"
            >
                {isAuthenticated ? (
                    <>
                        <Menu.Item
                            className="menu-item"
                            key="/mycourses"
                            icon={<SolutionOutlined />}
                        >
                            <Link to="/mycourses">My courses</Link>
                        </Menu.Item>
                        <Menu.Item
                            className="menu-item"
                            key="/courses"
                            icon={<UnorderedListOutlined />}
                        >
                            <Link to="/courses">Course list</Link>
                        </Menu.Item>
                        <Menu.Item key="profile" className="menu-item">
                            <Link to="/profile">Profile</Link>
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
