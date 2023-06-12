import { Card, Tabs, Button } from "antd";
import CentreInformation from "./CentreInformation";
import StaffInformation from "./StaffInformation";
import CentreInspections from "./CentreInspections";
import { useNavigate, useParams } from "react-router-dom";
import CentreStatistics from "./CentreStatistics";
import CentrePredict from "./CentrePredict";
import { IoArrowBackOutline } from "react-icons/io5";

const ViewCentre = (props) => {
  const { centreId } = useParams();
  const navigate = useNavigate();

  const items = [
    {
      key: "centre-info",
      label: `Thông tin trung tâm`,
      children: (
        <CentreInformation centreId={centreId} setError={props.setError} />
      ),
    },
    {
      key: "staff-info",
      label: `Thông tin nhân viên`,
      children: <StaffInformation centreId={centreId} />,
    },
    {
      key: "inspections",
      label: `Tất cả đăng kiểm`,
      children: <CentreInspections centreId={centreId} />,
    },
    {
      key: "statistics",
      label: `Thống kê`,
      children: <CentreStatistics centreId={centreId} />,
    },
    {
      key: "this-month",
      label: `Trong tháng này`,
      children: <CentrePredict centreId={centreId} />,
    },
  ];

  return (
    <Card
      style={{ maxWidth: "90rem", margin: "2.4rem auto" }}
      title={
        <Button
          type="text"
          icon={
            <IoArrowBackOutline
              style={{ fontSize: "2rem", verticalAlign: "middle" }}
            />
          }
          onClick={() => {
            navigate(-1);
          }}
        />
      }
    >
      <Tabs defaultActiveKey="centre-info" items={items} centered />
    </Card>
  );
};

export default ViewCentre;
