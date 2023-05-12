import {
  SwapOutlined,
  LineChartOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import classes from "./../../styles/Layout/MenuItems.module.css";
import { useSignOut } from "react-auth-kit";

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

const items = [
  getItem(
    "Bảng điều khiển",
    "dashboard",
    <AppstoreOutlined className={classes.icon} style={styleIcon} />
  ),
  getItem(
    "Yêu cầu",
    "request",
    <SwapOutlined className={classes.icon} style={styleIcon} />
  ),
  getItem(
    "Quản lý",
    "manage",
    <DatabaseOutlined className={classes.icon} style={styleIcon} />
  ),
  getItem(
    "Thống kê",
    "statistics",
    <LineChartOutlined className={classes.icon} style={styleIcon} />
  ),
  getItem(
    "Tài khoản",
    "account",
    <UserOutlined className={classes.icon} style={styleIcon} />,
    [getItem("Cài đặt", "settings"), getItem("Đăng xuất", "logout")]
  ),
];

const MenuItem = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#27272a",
          colorText: "var(--color-grey-dark-2)",
          colorBgTextHover: "var(--color-grey-dark-1)",
          controlItemBgActive: "var(--color-grey-dark-1)",
          borderRadius: "1.2rem",
          controlHeightLG: 50,
          colorFillQuaternary: "transparent",
          padding: 22,
        },
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={"dashboard"}
        items={items}
        className={classes.menu}
        style={{ border: "none" }}
        onClick={({ key }) => {
          if (key === "logout") {
            signOut();
          } else {
            navigate(`${key}`);
          }
        }}
      />
    </ConfigProvider>
  );
};

export default MenuItem;
