import { ConfigProvider, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Sider from "./components/Layout/Sider";
import Content from "./components/Layout/Content";
import Footer from "./components/Layout/Footer";
import "./styles/App.css";
import Header from "./components/Layout/Header";

const App = () => {
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
          <Header />
          <Content />
          {isMobile && <Footer />}
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default App;
