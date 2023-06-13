import { Col, Row } from "antd";
import IntroCarousel from "../components/Authentication/IntroCarousel";
import AuthenticationForm from "../components/Authentication/AuthenticationForm";
import { useEffect } from "react";

const AuthenticationPage = () => {
  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  return (
    <Row>
      <Col lg={10} xs={0}>
        <IntroCarousel />
      </Col>
      <Col lg={14} xs={24}>
        <AuthenticationForm />
      </Col>
    </Row>
  );
};

export default AuthenticationPage;
