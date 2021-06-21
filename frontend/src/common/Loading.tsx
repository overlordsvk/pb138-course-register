import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

function Loading() {
    return <Spin indicator={antIcon} style={{ width: "100%" }} />;
}

export default Loading;
