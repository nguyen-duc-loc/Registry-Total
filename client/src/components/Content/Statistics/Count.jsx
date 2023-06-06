import { Col, Row } from "antd";
import image1 from "./../../../assets/images/grow-1.svg";
import image2 from "./../../../assets/images/grow-2.svg";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import CardStatistics from "../../UI/CardStatistics";

const now = new Date();
const year = now.getFullYear();

const Count = () => {
  const [numberOfAllInspections, setNumberOfAllInspections] = useState(0);
  const [numberOfInspectionsThisYear, setNumberOfInspectionsThisYear] =
    useState(0);
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const allResponse = await fetch(
          `https://sleepy-coast-93816.herokuapp.com/api/v1/users/registrationCentres/inspections?limit=45000`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        const yearResponse = await fetch(
          `https://sleepy-coast-93816.herokuapp.com/api/v1/inspections/centreStatistics/year/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        if (!allResponse.ok || !yearResponse.ok) {
          throw new Error("Can not get.");
        }

        const allData = await allResponse.json();
        const yearData = await yearResponse.json();

        setNumberOfAllInspections(allData.results);
        setNumberOfInspectionsThisYear(
          yearData.data.data.filter((d) => d.year === year)[0].count
        );

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Row style={{ height: "100%" }} gutter={[16, 16]}>
      <Col xl={24} sm={12} xs={24}>
        <CardStatistics
          title="Tổng số lượng đăng kiểm"
          loading={loading}
          value={numberOfAllInspections}
          src={image1}
          height={90}
        />
      </Col>
      <Col xl={24} sm={12} xs={24}>
        <CardStatistics
          title="Số lượng đăng kiểm trong năm nay"
          loading={loading}
          value={numberOfInspectionsThisYear}
          src={image2}
          height={90}
        />
      </Col>
    </Row>
  );
};

export default Count;
