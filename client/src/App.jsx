import { ConfigProvider, Layout } from "antd";
import React, { useEffect, useState } from "react";
import Sider from "./components/Layout/Sider";
import Content from "./components/Layout/Content";
import Footer from "./components/Layout/Footer";
import "./styles/App.css";
import Header from "./components/Layout/Header";

const useWindowSize = () => {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

const App = () => {
  const [_, windowWidth] = useWindowSize();
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth >= 768 && windowWidth <= 992;

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter",
          colorPrimary: "#27272a",
        },
      }}
    >
      <Layout>
        {!isMobile && <Sider isTablet={isTablet} />}
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
