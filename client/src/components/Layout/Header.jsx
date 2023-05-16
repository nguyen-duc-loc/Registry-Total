import { useState } from "react";
import { Layout, Button, Drawer, ConfigProvider } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Menu from "./MenuItems";
import classes from "./../../styles/Layout/Header.module.css";
import Logo from "./Logo";

const { Header } = Layout;

const PageHeader = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Header className={classes.header}>
      <Button
        icon={<MenuOutlined style={{ verticalAlign: "middle" }} />}
        onClick={showDrawer}
      />
      <ConfigProvider theme={{ token: { paddingLG: 16 } }}>
        <Drawer
          placement="left"
          width={300}
          onClose={onClose}
          open={open}
          title={<Logo />}
        >
          <Menu />
        </Drawer>
      </ConfigProvider>
    </Header>
  );
};

export default PageHeader;
