import { useState } from "react";
import { Layout, Button, Drawer, ConfigProvider } from "antd";
import Menu from "./MenuItems";
import classes from "./../../styles/Layout/Header.module.css";
import Logo from "./Logo";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";

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
        type="text"
        icon={
          <IoMenuOutline
            style={{
              verticalAlign: "middle",
              fontSize: "24px",
            }}
          />
        }
        onClick={showDrawer}
      />
      <ConfigProvider theme={{ token: { paddingLG: 16 } }}>
        <Drawer
          placement="left"
          width={300}
          onClose={onClose}
          open={open}
          title={<Logo />}
          closeIcon={
            <IoCloseOutline
              style={{ fontSize: "20px", verticalAlign: "middle" }}
            />
          }
        >
          <Menu />
        </Drawer>
      </ConfigProvider>
    </Header>
  );
};

export default PageHeader;
