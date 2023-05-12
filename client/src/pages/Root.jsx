import { ConfigProvider, Layout } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import Sider from "./../components/Layout/Sider";
import { Outlet } from "react-router-dom";
import Header from "./../components/Layout/Header";

const RootPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter",
          colorText: "#27272a",
        },
      }}
    >
      <Layout>
        {!isMobile && <Sider />}
        <Layout>
          {isMobile && <Header />}
          <Outlet />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default RootPage;
