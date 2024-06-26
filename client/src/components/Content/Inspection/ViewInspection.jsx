import { Card, Button } from "antd";
import InspectionCollapse from "./InspectionCollpase";
import classes from "./../../../styles/Content/Inspection/ViewInspection.module.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import PageNotExist from "../../UI/PageNotExist";

const ViewInspection = (props) => {
  const navigate = useNavigate();

  return props.error ? (
    <PageNotExist />
  ) : (
    <Card
      className={classes.card}
      loading={props.loading}
      title={
        <Button
          type="text"
          icon={
            <IoArrowBackOutline
              style={{ fontSize: "2rem", verticalAlign: "middle" }}
            />
          }
          className={classes.btn}
          onClick={() => {
            navigate(-1);
          }}
        />
      }
    >
      <Card.Meta
        style={{ padding: "0 3rem " }}
        title={<div style={{ maringBottom: "3rem" }}>Thông tin đăng kiểm</div>}
        description={<InspectionCollapse data={props.data} />}
      />
    </Card>
  );
};

export default ViewInspection;
