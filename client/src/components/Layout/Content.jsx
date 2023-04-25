import { Layout } from "antd";
import Breadcrumb from "../Content/Breadcrumb";
import classes from "./../../styles/Layout/Content.module.css";

const { Content } = Layout;

const PageContent = () => {
  return (
    <Content className={classes.content}>
      <Breadcrumb />
    </Content>
  );
};

export default PageContent;
