import { Layout } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import Sider from "./../components/Layout/Sider";
import { Outlet } from "react-router-dom";
import Header from "./../components/Layout/Header";

const RootPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Layout>
      {!isMobile && <Sider />}
      <Layout>
        {isMobile && <Header />}
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default RootPage;
