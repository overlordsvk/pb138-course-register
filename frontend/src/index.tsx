import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import App from "./App";
import MainMenu from "./Menu";

ReactDOM.render(
    <React.StrictMode>
        {/* <TopMenu /> */}
        <App />
        <MainMenu></MainMenu>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
