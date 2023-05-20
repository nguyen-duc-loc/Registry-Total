import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import Sider from "./Sider";
import classes from "./../../../styles/Content/Settings/Settings.module.css";

const Settings = () => {
  return (
    <Row
      style={{
        width: "80%",
        backgroundColor: "#fff",
        margin: "3rem auto",
        border: "1px solid var(--color-grey-dark-1)",
      }}
    >
      <Col
        xl={6}
        style={{ borderRight: "1px solid var(--color-grey-dark-1)" }}
        xs={0}
      >
        <Sider />
      </Col>
      <Col xl={18} xs={24} style={{ padding: "3rem" }}>
        <h1 className={classes.title}>Hồ sơ của tôi</h1>
        <Outlet />
      </Col>
    </Row>
  );
};

export default Settings;
