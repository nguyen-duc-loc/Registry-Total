import { Col, Row } from "antd";
import StaffColumnChart from "../components/Content/Statistics/StaffColumnChart";
import AdminColumnChart from "../components/Content/Statistics/AdminColumnChart";
import Count from "../components/Content/Statistics/Count";
import LineChart from "../components/Content/Statistics/LineChart";
import Predict from "../components/Content/Statistics/Predict";
import { useEffect } from "react";
import { useAuthUser } from "react-auth-kit";

const StatisticsPage = () => {
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  useEffect(() => {
    document.title = "Thống kê";
  }, []);

  return (
    <div style={{ padding: "0 1.6rem" }}>
      <Row gutter={[20, 20]}>
        <Col xl={7} sm={24} xs={24}>
          <Count />
        </Col>
        <Col xl={17} sm={24} xs={24}>
          {admin ? <AdminColumnChart /> : <StaffColumnChart />}
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
