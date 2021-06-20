import { Breadcrumb } from "antd";
import React from "react";

function Breadcrumbs() {
    return (
        <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default Breadcrumbs;
