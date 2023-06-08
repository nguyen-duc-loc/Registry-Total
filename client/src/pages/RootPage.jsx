import { Layout } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import Sider from "../components/Layout/Sider";
import Header from "../components/Layout/Header";
import Content from "../components/Layout/Content";

const RootPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Layout hasSider>
      {!isMobile && <Sider />}
      <Layout style={{ height: "100vh" }}>
        {isMobile && <Header />}
        <Content />
      </Layout>
    </Layout>
  );
};

export default RootPage;
