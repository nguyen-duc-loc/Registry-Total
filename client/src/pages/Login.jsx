import { Col, Row } from "antd";
import Login from "./../components/Login/Login";
import IntroCarousel from "../components/Login/IntroCarousel";

const LoginPage = () => {
  return (
    <Row>
      <Col lg={10}>
        <IntroCarousel />
      </Col>
      <Col lg={14} xs={24}>
        <Login />
      </Col>
    </Row>
  );
};

export default LoginPage;
