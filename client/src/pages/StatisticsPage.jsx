import { Col, Row } from "antd";
import ColumnChart from "../components/Content/Statistics/ColumnChart";
import Count from "../components/Content/Statistics/Count";
import LineChart from "../components/Content/Statistics/LineChart";
import Predict from "../components/Content/Statistics/Predict";

const StatisticsPage = () => {
  return (
    <div style={{ padding: "0 1.6rem" }}>
      <Row gutter={[20, 20]}>
        <Col xl={7} sm={24} xs={24}>
          <Count />
        </Col>
        <Col xl={17} sm={24} xs={24}>
          <ColumnChart />
        </Col>
        <Col xl={15} sm={24} xs={24}>
          <LineChart />
        </Col>
        <Col xl={9} sm={24} xs={24}>
          <Predict height={300} />
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsPage;
