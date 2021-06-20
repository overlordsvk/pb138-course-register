import React, { useState } from "react";
import { Menu } from "antd";
import  {SolutionOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./MainMenu.css";
import { Link } from "react-router-dom";


function MainMenu() {
    const [current, setCurrent] = useState({"key":"mail"});
    return (
        <div>
            <Menu theme="dark" onClick={setCurrent} selectedKeys={[current.key]} mode="horizontal"  >
                
                <Menu.Item className="menu-item" key="mail" icon={<SolutionOutlined />}>
                    <Link to="/mycourses">
                        My courses
                    </Link>
                </Menu.Item>
                <Menu.Item className="menu-item" key="app" icon={<UnorderedListOutlined/>}>
                    <Link to="/courses">
                        Course list  
                    </Link>
                </Menu.Item>
                <Menu.Item key="logout" className="menu-logout">
                    <a>
                        Logout
                    </a>

                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MainMenu;
