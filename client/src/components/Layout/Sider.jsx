import { Layout } from "antd";
import Menu from "./MenuItems";
import classes from "./../../styles/Layout/Sider.module.css";
import Logo from "./Logo";

const { Sider } = Layout;

const PageSider = () => {
  return (
    <Sider
      breakpoint="lg"
      className={classes.sider}
      width={270}
      style={{
        backgroundColor: "var(--color-white)",
      }}
    >
      <Logo />
      <Menu />
    </Sider>
  );
};

export default PageSider;
