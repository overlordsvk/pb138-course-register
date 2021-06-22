import { SolutionOutlined, UnorderedListOutlined, RobotOutlined, PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useResetRecoilState } from "recoil";
import { userState } from "./state/userState";


function Home() {
    const { logout } = useAuth0();
    const resetUserState = useResetRecoilState(userState);

    return  <Card>
        <Card.Grid>
            <Link to="/mycourses">
                <div className="tile">
                    <SolutionOutlined className="tile__image"/>
                    <span className="tile__text">my courses</span>
                </div>
            </Link>
        </Card.Grid>
        <Card.Grid>
            <Link to="/courses">
                <div className="tile">
                    <UnorderedListOutlined className="tile__image"/>
                    <span className="tile__text">Course List</span>
                </div>
            </Link>
        </Card.Grid>
        <Card.Grid>
            <Link to="/profile">
                <div className="tile">
                    <RobotOutlined className="tile__image"/>
                    <span className="tile__text">Profile</span>
                </div>
            </Link>
        </Card.Grid>
        <Card.Grid>
            <a onClick={() => { logout({ returnTo: window.location.origin }); resetUserState; }}>
                <div className="tile">
                    <PoweroffOutlined className="tile__image"/>
                    <span className="tile__text">Log Out</span>
                </div>
            </a>
        </Card.Grid>
    </Card>;
}

export default Home;
