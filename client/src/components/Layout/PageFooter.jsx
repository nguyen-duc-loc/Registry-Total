import MenuItem from "./MenuItem";
import { Layout } from "antd";
import classes from "./../../styles/Layout/PageFooter.module.css";

const { Footer } = Layout;

const PageFooter = () => {
  return (
    <Footer className={classes.footer}>
      <MenuItem mode="horizontal" isMobile={true} controlHeightLG={40} />
    </Footer>
  );
};

export default PageFooter;
