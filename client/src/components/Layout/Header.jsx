import { Layout, Input, Divider } from "antd";
import classes from "./../../styles/Layout/Header.module.css";

const { Header } = Layout;
const { Search } = Input;

const PageHeader = () => {
  return (
    <Header className={classes.header}>
      <Search
        size="large"
        placeholder="input search text"
        allowClear
        style={{
          width: 200,
        }}
      />
      <Divider type="vertical" />
      Text
    </Header>
  );
};

export default PageHeader;
