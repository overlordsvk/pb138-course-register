import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";
import MainMenu from "./menu/MainMenu";
import { useAuth0 } from "@auth0/auth0-react";
import ContentRouting from "./ContentRouting";
import Loading from "./common/Loading";
import { userState } from "./state/userState";
import { useRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { GET_USER_ROLE } from "./utils/queries";
import { UserRole } from "./utils/gqlTypes";
import { useEffect } from "react";
import ServerError from "./status/ServerError";

const { Header, Content, Footer } = Layout;

export default function App() {
    const { isLoading } = useAuth0();
    const [appUser, setUserState] = useRecoilState(userState); //setUserState
    const { loading, data, error } = useQuery<UserRole>(GET_USER_ROLE, {
        variables: { id: appUser.id },
    });

    useEffect(() => {
        if (appUser.id != "" && data && data.users[0]) {
            const tmpUser = { id: appUser.id, name: appUser.name, role: data.users[0].role, email: appUser.email, picture: appUser.picture };
            setUserState(tmpUser);
        }
    }, [data]);

    if (isLoading || loading) {
        return loadingLayout;
    }
    if (error && appUser.id != "") return <ServerError />;

    return (
        <Router>
            <Layout className="layout">
                <Header>
                    <Logo />
                    <MainMenu />
                </Header>
                <Content className="content">
                    <div style={{ height: "2em" }} />
                    <ContentRouting />
                </Content>
                <Footer className="footer">pb138 ©2021</Footer>
            </Layout>
        </Router>
    );
}

function Logo() {
    return (
        <div className="logo">
            <h1 className="logo-text">
                <Link to="/">Courses Registration</Link>
            </h1>
        </div>
    );
}

const loadingLayout = (
    <Layout className="layout">
        <Header>
            <div className="logo">
                <h1 className="logo-text">
                    <a>Courses Registration</a>
                </h1>
            </div>
        </Header>
        <Content className="content">
            <div style={{ height: "2em" }} />
            <div className="site-layout-content">
                <Loading />
            </div>
        </Content>
        <Footer className="footer">pb138 ©2021</Footer>
    </Layout>
);
