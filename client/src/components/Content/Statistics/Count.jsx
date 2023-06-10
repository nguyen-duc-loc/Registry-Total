import { Col, Row } from "antd";
import CountTotal from "../Home/CountTotal";
import CountThisYear from "../Home/CountThisYear";

const Count = () => {
  return (
    <Row style={{ height: "100%" }} gutter={[16, 16]}>
      <Col xl={24} sm={12} xs={24}>
        <CountTotal height={90} />
      </Col>
      <Col xl={24} sm={12} xs={24}>
        <CountThisYear height={90} />
      </Col>
    </Row>
  );
};

export default Count;
