import { Card, Avatar, Button } from "antd";
import InspectionCollapse from "./InspectionCollpase";
import classes from "./../../../styles/Content/Inspection/ViewInspection.module.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import avatar from "./../../../assets/images/owner.png";
import { useNavigate } from "react-router-dom";

const ViewInspection = (props) => {
  const navigate = useNavigate();

  return (
    <Card
      className={classes.card}
      loading={props.loading}
      title={
        <Button
          icon={<ArrowLeftOutlined />}
          className={classes.btn}
          onClick={() => {
            navigate(-1);
          }}
        />
      }
    >
      <Card.Meta
        avatar={
          <Avatar
            src={avatar}
            size={72}
            style={{
              margin: "2rem",
              outline: "3px solid var(--color-grey-dark-1)",
              outlineOffset: "6px",
            }}
          />
        }
        title={<div style={{ maringBottom: "3rem" }}>Thông tin đăng kiểm</div>}
        description={<InspectionCollapse data={props.data} />}
      />
    </Card>
  );
};

export default ViewInspection;
