import {
  SwapOutlined,
  LineChartOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Menu } from "antd";
import { NavLink } from "react-router-dom";
import classes from "./../../styles/Layout/MenuItems.module.css";
import { useSignOut } from "react-auth-kit";

const styleIcon = {
  verticalAlign: "middle",
  marginLeft: "-2px",
  fontSize: "2rem",
};

const defaultStyleLink = {
  fontSize: "14px",
  fontWeight: "400",
  marginLeft: "0",
};

const styleLink = (isActive) => {
  return {
    ...defaultStyleLink,
    fontWeight: isActive ? "600" : "400",
  };
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

const items = [
  getItem(
    <NavLink to="/" style={({ isActive }) => styleLink(isActive)}>
      Bảng điều khiển
    </NavLink>,
    "dashboard",
    <AppstoreOutlined style={styleIcon} />
  ),
  getItem(
    <NavLink to="/request" style={({ isActive }) => styleLink(isActive)}>
      Yêu cầu
    </NavLink>,
    "request",
    <SwapOutlined style={styleIcon} />
  ),
  getItem(
    <NavLink to="/manage" style={({ isActive }) => styleLink(isActive)}>
      Quản lý
    </NavLink>,
    "manage",
    <DatabaseOutlined style={styleIcon} />
  ),
  getItem(
    <NavLink to="/statistics" style={({ isActive }) => styleLink(isActive)}>
      Thống kê
    </NavLink>,
    "statistics",
    <LineChartOutlined style={styleIcon} />
  ),
  getItem(
    <span style={defaultStyleLink}>Tài khoản</span>,
    "account",
    <UserOutlined style={styleIcon} />,
    [
      getItem(
        <NavLink to="/settings" style={({ isActive }) => styleLink(isActive)}>
          Cài đặt
        </NavLink>,
        "settings"
      ),
      getItem(<span style={defaultStyleLink}>Đăng xuất</span>, "logout"),
    ]
  ),
];

const MenuItem = () => {
  const signOut = useSignOut();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#27272a",
          colorBgTextHover: "var(--color-grey-dark-1)",
          controlItemBgActive: "none",
          borderRadius: "1.2rem",
          controlHeightLG: 50,
          colorFillQuaternary: "transparent",
          padding: 22,
        },
      }}
    >
      <Menu
        mode="inline"
        items={items}
        className={classes.menu}
        style={{ border: "none" }}
        onClick={(e) => {
          if (e.key === "logout") {
            signOut();
          }
        }}
      />
    </ConfigProvider>
  );
};

export default MenuItem;
