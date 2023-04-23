import {
  SwapOutlined,
  LineChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import classes from "./../../styles/Layout/MenuItem.module.css";
import { ConfigProvider, Menu, theme } from "antd";

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const MenuItem = (props) => {
  const items = [
    getItem(
      props.isMobile ? null : "Bảng điều khiển",
      "dashboard",
      <AppstoreOutlined className={classes.icon} />
    ),
    getItem(
      props.isMobile ? null : "Yêu cầu",
      "request",
      <SwapOutlined className={classes.icon} />
    ),
    getItem(
      props.isMobile ? null : "Quản lý",
      "manage",
      <DatabaseOutlined className={classes.icon} />
    ),
    getItem(
      props.isMobile ? null : "Thống kê",
      "statistics",
      <LineChartOutlined className={classes.icon} />
    ),
    getItem(
      props.isMobile ? null : "Cài đặt",
      "settings",
      <SettingOutlined className={classes.icon} />
    ),
    getItem(
      props.isMobile ? null : "Đăng xuất",
      "logout",
      <LogoutOutlined className={classes.icon} />
    ),
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "#737373",
          colorBgTextHover: "#ddd",
          controlItemBgActive: "#ddd",
          borderRadius: "1.2rem",
          controlHeightLG: props.controlHeightLG,
          colorFillQuaternary: "transparent",
        },
      }}
    >
      <Menu
        mode={props.mode}
        defaultSelectedKeys={"dashboard"}
        items={items}
        className={classes.menu}
      />
    </ConfigProvider>
  );
};

export default MenuItem;
