import { Layout } from "antd";
import classes from "./../../styles/Layout/PageContent.module.css";

const { Content } = Layout;

const PageContent = () => {
  return (
    <Content>
      <div className={classes.content}>Content</div>
    </Content>
  );
};

export default PageContent;
