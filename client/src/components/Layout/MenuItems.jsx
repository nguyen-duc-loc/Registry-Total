import { Avatar, ConfigProvider, Menu } from "antd";
import { NavLink } from "react-router-dom";
import classes from "./../../styles/Layout/MenuItems.module.css";
import { useAuthUser, useSignOut } from "react-auth-kit";
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoBarChart,
  IoBarChartOutline,
  IoFileTrayFullOutline,
  IoGrid,
  IoGridOutline,
  IoSearch,
  IoSearchOutline,
} from "react-icons/io5";
import avatar from "./../../assets/images/avatar.svg";

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

const MenuItem = () => {
  const signOut = useSignOut();
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  const items = [
    getItem(
      <NavLink to="/" style={({ isActive }) => styleLink(isActive)}>
        Bảng điều khiển
      </NavLink>,
      "dashboard",
      <NavLink to="/" style={({ isActive }) => styleLink(isActive)}>
        {({ isActive }) =>
          isActive ? (
            <IoGrid style={styleIcon} />
          ) : (
            <IoGridOutline style={styleIcon} />
          )
        }
      </NavLink>
    ),
    !admin &&
      getItem(
        <span style={defaultStyleLink}>Quản lí đăng kiểm</span>,
        "registration",
        <IoFileTrayFullOutline style={styleIcon} />,
        [
          getItem(
            <NavLink
              to="/inspections/all"
              style={({ isActive }) => styleLink(isActive)}
            >
              Tất cả đăng kiểm
            </NavLink>,
            "all-inspections"
          ),
          getItem(
            <NavLink
              to="/inspections/me"
              style={({ isActive }) => styleLink(isActive)}
            >
              Đăng kiểm của tôi
            </NavLink>,
            "my-inspections"
          ),
        ]
      ),
    !admin &&
      getItem(
        <NavLink
          to="/inspections/create"
          style={({ isActive }) => styleLink(isActive)}
        >
          Tạo đăng kiểm
        </NavLink>,
        "create-registration",
        <NavLink to="/create" style={({ isActive }) => styleLink(isActive)}>
          {({ isActive }) =>
            isActive ? (
              <IoAddCircle style={styleIcon} />
            ) : (
              <IoAddCircleOutline style={styleIcon} />
            )
          }
        </NavLink>
      ),
    getItem(
      <NavLink to="/search" style={({ isActive }) => styleLink(isActive)}>
        Tra cứu phương tiện
      </NavLink>,
      "search",
      <NavLink to="/search" style={({ isActive }) => styleLink(isActive)}>
        {({ isActive }) =>
          isActive ? (
            <IoSearch style={styleIcon} />
          ) : (
            <IoSearchOutline style={styleIcon} />
          )
        }
      </NavLink>
    ),
    getItem(
      <NavLink to="/statistics" style={({ isActive }) => styleLink(isActive)}>
        Thống kê
      </NavLink>,
      "statistics",
      <NavLink to="/statistics" style={({ isActive }) => styleLink(isActive)}>
        {({ isActive }) =>
          isActive ? (
            <IoBarChart style={styleIcon} />
          ) : (
            <IoBarChartOutline style={styleIcon} />
          )
        }
      </NavLink>
    ),
    getItem(
      <span style={{ ...defaultStyleLink, transform: "translateX(-8px)" }}>
        Tài khoản
      </span>,
      "account",
      <NavLink to="/settings">
        <Avatar
          src={avatar}
          size="small"
          style={{ transform: "translateX(-6px)" }}
        />
      </NavLink>,
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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#27272a",
          colorBgTextHover: "var(--color-grey-dark-1)",
          controlItemBgActive: "none",
          borderRadius: "1.2rem",
          controlHeightLG: 48,
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
