import Menu from "./MenuItems";
import { Layout } from "antd";
import classes from "./../../styles/Layout/Footer.module.css";

const { Footer } = Layout;

const PageFooter = () => {
  return (
    <Footer className={classes.footer}>
      <Menu mode="horizontal" isMobile={true} controlHeightLG={40} />
    </Footer>
  );
};

export default PageFooter;
