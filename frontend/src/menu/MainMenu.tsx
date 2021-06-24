import React from "react";
import { Menu } from "antd";
import {
    CalendarOutlined,
    PoweroffOutlined,
    RobotOutlined,
    SolutionOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import AuthenticationButton from "../auth/AuthenticationButton";
import { useAuth0 } from "@auth0/auth0-react";
import { isAdmin } from "../utils/helpers";
import "./MainMenu.css";

function MainMenu() {
    const { isAuthenticated } = useAuth0();
    let menu = <></>;
    if (isAuthenticated) {
        menu = (
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
            </>
        );
    }
    if (isAdmin()) {
        menu = (
            <>
                <Menu.Item
                    className="menu-item"
                    key="/users"
                    icon={<UserOutlined />}
                >
                    <Link to="/users">Users</Link>
                </Menu.Item>
                <Menu.Item
                    className="menu-item"
                    key="/semesters"
                    icon={<CalendarOutlined />}
                >
                    <Link to="/semesters">Semesters</Link>
                </Menu.Item>
            </>
        );
    }
    return (
        <div>
            <Menu
                theme="dark"
                selectedKeys={[useLocation().pathname]}
                mode="horizontal"
            >
                {menu}
                {isAuthenticated ? (
                    <Menu.Item
                        key="profile"
                        className="menu-item"
                        icon={<RobotOutlined />}
                    >
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                ) : (
                    <></>
                )}
                <Menu.Item
                    key="logout"
                    className="menu-logout"
                    icon={<PoweroffOutlined />}
                >
                    <AuthenticationButton />
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MainMenu;
