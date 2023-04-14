import {
  SwapOutlined,
  LineChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import classes from "./styles/App.module.css";

const { Content, Footer, Sider } = Layout;

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

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

  const items = [
    getItem(
      isMobile ? null : "Bảng điều khiển",
      "dashboard",
      <AppstoreOutlined className={classes.icon} />
    ),
    getItem(
      isMobile ? null : "Yêu cầu",
      "request",
      <SwapOutlined className={classes.icon} />
    ),
    getItem(
      isMobile ? null : "Thống kê",
      "statistics",
      <LineChartOutlined className={classes.icon} />
    ),
    getItem(
      isMobile ? null : "Cài đặt",
      "settings",
      <SettingOutlined className={classes.icon} />
    ),
    getItem(
      isMobile ? null : "Đăng xuất",
      "logout",
      <LogoutOutlined className={classes.icon} />
    ),
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [controlHeightLG, setControlHeightLG] = useState(55);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "#737373",
          fontFamily: "Inter",
          colorBgTextHover: "#ddd",
          controlItemBgActive: "#ddd",
          borderRadius: 12,
          fontSize: 16,
          controlHeightLG: controlHeightLG,
          colorPrimary: "#3C4048",
          colorFillQuaternary: "transparent",
        },
      }}
    >
      <Layout>
        {!isMobile && (
          <Sider
            breakpoint="lg"
            onCollapse={(collapsed) => {
              if (collapsed) setControlHeightLG(50);
              else setControlHeightLG(60);
            }}
            className={classes.sider}
            width={280}
          >
            <div className={classes.logo}>
              {isTablet ? (
                <CarOutlined className={classes.icon} />
              ) : (
                <h1>Logo</h1>
              )}
            </div>
            <Menu
              defaultSelectedKeys={"dashboard"}
              items={items}
              className={classes.menu}
            />
          </Sider>
        )}
        <Content>
          <div
            className={classes.content}
            style={{
              background: colorBgContainer,
            }}
          >
            Content
          </div>
        </Content>
        {isMobile && (
          <Footer
            className={classes.footer}
            style={{
              position: "sticky",
              bottom: 0,
            }}
          >
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["dashboard"]}
              items={items}
              className={classes.menu}
            />
          </Footer>
        )}
      </Layout>
    </ConfigProvider>
  );
};
export default App;
