import {
  Layout,
  Input,
  Divider,
  ConfigProvider,
  Space,
  Avatar,
  Dropdown,
} from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import avatar from "./../../assets/images/avatar.jpg";
import classes from "./../../styles/Layout/Header.module.css";

const { Header } = Layout;
const { Search } = Input;

const items = [
  { icon: <UserOutlined />, label: "Trang cá nhân", key: "profile" },
  {
    icon: <SettingOutlined />,
    label: "Cài đặt tài khoản",
    key: "settings",
  },
  {
    icon: <LogoutOutlined />,
    label: "Đăng xuất",
    key: "logout",
  },
];

const PageHeader = () => {
  return (
    <Header className={classes.header}>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: "100px",
            colorPrimaryActive: "#d9d9d9",
            colorPrimaryHover: "#d9d9d9",
            controlOutline: "none",
            colorIcon: "red",
          },
        }}
      >
        <Search
          size="large"
          placeholder="Tìm kiếm"
          allowClear
          className={classes.searchbox}
        />
      </ConfigProvider>
      <ConfigProvider
        theme={{
          token: {
            colorSplit: "var(--color-grey-dark-1)",
            lineWidth: 2,
          },
        }}
      >
        <Divider type="vertical" style={{ height: "40%" }} />
      </ConfigProvider>
      <Space align="center" size="middle">
        <Avatar src={avatar} />
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space size="large">
              <span style={{ color: "var(--color-black)" }}>
                Nguyễn Đức Lộc
              </span>
              <DownOutlined style={{ color: "var(--color-black)" }} />
            </Space>
          </a>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default PageHeader;
