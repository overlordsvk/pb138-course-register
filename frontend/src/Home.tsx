import {
    SolutionOutlined,
    UnorderedListOutlined,
    RobotOutlined,
    PoweroffOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useResetRecoilState } from "recoil";
import { userState } from "./state/userState";

function Home() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const resetUserState = useResetRecoilState(userState);

    if (!isAuthenticated) {
        return <a
            onClick={() => {
                loginWithRedirect();
            }}
        >
            <Card className="grid-wrap">
            
                <div className="tile">
                    <PoweroffOutlined className="tile__image" />
                    <h4 className="tile__text">Log In</h4>
                </div>
            
            </Card>
        </a>;
    }
    return (
        <Card className="grid-wrap">
            <Card.Grid className="card-tile">
                <Link to="/mycourses">
                    <div className="tile">
                        <SolutionOutlined className="tile__image" />
                        <h4 className="tile__text">My courses</h4>
                    </div>
                </Link>
            </Card.Grid>
            <Card.Grid className="card-tile">
                <Link to="/courses">
                    <div className="tile">
                        <UnorderedListOutlined className="tile__image" />
                        <h4 className="tile__text">Course List</h4>
                    </div>
                </Link>
            </Card.Grid>
            <Card.Grid className="card-tile">
                <Link to="/profile">
                    <div className="tile">
                        <RobotOutlined className="tile__image" />
                        <h4 className="tile__text">Profile</h4>
                    </div>
                </Link>
            </Card.Grid>
            <Card.Grid className="card-tile">
                <a
                    onClick={() => {
                        logout({ returnTo: window.location.origin });
                        resetUserState;
                    }}
                >
                    <div className="tile">
                        <PoweroffOutlined className="tile__image" />
                        <h4 className="tile__text">Log Out</h4>
                    </div>
                </a>
            </Card.Grid>
        </Card>
    );
}

export default Home;
