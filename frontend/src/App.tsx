import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";
import MainMenu from "./menu/MainMenu";
import { useAuth0 } from "@auth0/auth0-react";
import ContentRouting from "./ContentRouting";
import Breadcrumbs from "./Breadcrumbs";
import { userState } from "./state/userState";
import { useSetRecoilState } from "recoil";
import Loading from "./common/Loading";

const { Header, Content, Footer } = Layout;

export default function App() {
    const setUserState = useSetRecoilState(userState);
    const { user, isLoading } = useAuth0();

    if (isLoading) {
        return loadingLayout;
    }

    if (user) {
        setUserState(user.sub ?? "");
    }

    return (
        <Router>
            <Layout className="layout">
                <Header>
                    <Logo />
                    <MainMenu />
                </Header>
                <Content className="content">
                    <Breadcrumbs />
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
            <Breadcrumbs />
            <div className="site-layout-content">
                <Loading />
            </div>
        </Content>
        <Footer className="footer">pb138 ©2021</Footer>
    </Layout>
);
