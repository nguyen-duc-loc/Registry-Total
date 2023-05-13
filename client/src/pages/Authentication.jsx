import { Col, Row } from "antd";
import IntroCarousel from "../components/Authentication/IntroCarousel";
import AuthenticationForm from "./../components/Authentication/AuthenticationForm";

const AuthenticationPage = () => {
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
