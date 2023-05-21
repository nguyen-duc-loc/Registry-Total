import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumb from "../Content/Breadcrumb";
import classes from "./../../styles/Layout/Content.module.css";
import { useState } from "react";

const { Content } = Layout;

const PageContent = () => {
  return (
    <Content className={classes.content}>
      <Breadcrumb />
      <Outlet />
    </Content>
  );
};

export default PageContent;
