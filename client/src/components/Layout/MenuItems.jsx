import {
  SwapOutlined,
  LineChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import classes from "./../../styles/Layout/MenuItems.module.css";
import { ConfigProvider, Menu } from "antd";

const styleIcon = {
  verticalAlign: "middle",
  marginLeft: "-2px",
  fontSize: "2rem",
};

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
      <AppstoreOutlined className={classes.icon} style={styleIcon} />
    ),
    getItem(
      props.isMobile ? null : "Yêu cầu",
      "request",
      <SwapOutlined className={classes.icon} style={styleIcon} />
    ),
    getItem(
      props.isMobile ? null : "Quản lý",
      "manage",
      <DatabaseOutlined className={classes.icon} style={styleIcon} />
    ),
    getItem(
      props.isMobile ? null : "Thống kê",
      "statistics",
      <LineChartOutlined className={classes.icon} style={styleIcon} />
    ),
    getItem(
      props.isMobile ? null : "Cài đặt",
      "settings",
      <SettingOutlined className={classes.icon} style={styleIcon} />
    ),
    getItem(
      props.isMobile ? null : "Đăng xuất",
      "logout",
      <LogoutOutlined className={classes.icon} style={styleIcon} />
    ),
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "var(--color-grey-dark-2)",
          colorBgTextHover: "var(--color-grey-dark-1)",
          controlItemBgActive: "var(--color-grey-dark-1)",
          borderRadius: "1.2rem",
          controlHeightLG: props.controlHeightLG,
          colorFillQuaternary: "transparent",
          padding: 22,
        },
      }}
    >
      <Menu
        mode={props.mode}
        defaultSelectedKeys={"dashboard"}
        items={items}
        className={classes.menu}
        style={{ border: "none" }}
      />
    </ConfigProvider>
  );
};

export default MenuItem;
