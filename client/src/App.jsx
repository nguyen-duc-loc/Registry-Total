import { ConfigProvider, Layout } from "antd";
import React, { useEffect, useState } from "react";
import PageSider from "./components/Layout/PageSider";
import PageContent from "./components/Layout/PageContent";
import PageFooter from "./components/Layout/PageFooter";
import "./styles/App.css";

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
          fontSize: "1.6rem",
          colorPrimary: "#27272a",
        },
      }}
    >
      <Layout>
        {!isMobile && <PageSider isTablet={isTablet} />}
        <PageContent />
        {isMobile && <PageFooter />}
      </Layout>
    </ConfigProvider>
  );
};
export default App;
