import { Col, Row } from "antd";
import CountTotal from "../components/Content/Home/CountTotal";
import CountThisYear from "../components/Content/Home/CountThisYear";
import CountThisMonth from "../components/Content/Home/CountThisMonth";
import CountMe from "../components/Content/Home/CountMe";
import Recently from "../components/Content/Home/Recently";
import Predict from "../components/Content/Statistics/Predict";
import Chart from "../components/Content/Home/Chart";
import { useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import CountCentres from "../components/Content/Home/CountCentres";
import TopCentre from "../components/Content/Home/TopCentre";

const HomePage = () => {
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  useEffect(() => {
    document.title = "Đăng kiểm Việt Nam";
  }, []);

  return (
    <div style={{ padding: "0 2rem" }}>
      <Row gutter={[20, 20]}>
        <Col xl={6} sm={12} xs={24}>
          <CountTotal />
        </Col>
        <Col xl={6} sm={12} xs={24}>
          <CountThisYear />
        </Col>
        <Col xl={6} sm={12} xs={24}>
          <CountThisMonth />
        </Col>
        <Col xl={6} sm={12} xs={24}>
          {admin ? <CountCentres /> : <CountMe />}
        </Col>
        <Col xl={15} sm={24} xs={24}>
          <Chart />
        </Col>
        <Col xl={9} sm={24} xs={24}>
          <Predict height={250} adminStat={admin ? true : false} />
        </Col>
        <Col span={24}>{admin ? <TopCentre /> : <Recently />}</Col>
      </Row>
    </div>
  );
};

export default HomePage;
