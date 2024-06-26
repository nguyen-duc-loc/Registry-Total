import { Card, Tabs, Timeline } from "antd";
import classes from "./../../../styles/Content/Car/ViewCar.module.css";
import Icon from "@ant-design/icons";
import TextWithIcon from "../../UI/TextWithIcon";
import {
  IoBuildOutline,
  IoCarOutline,
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoSyncOutline,
  IoTimerOutline,
} from "react-icons/io5";
import Owner from "./Owner";
import Car from "./Car";
import Specification from "./Specification";
import { Link } from "react-router-dom";
import NoData from "../../UI/NoData";
import PageNotExist from "../../UI/PageNotExist";

const processDate = (date) => {
  if (!date) return;
  const newDate = new Date(date);
  const [month, day, year] = newDate.toLocaleDateString().split("/");
  return [day.padStart(2, "0"), month.padStart(2, "0"), year].join("-");
};

const compare = (ins1, ins2) => {
  return new Date(ins1.inspectionDate) - new Date(ins2.inspectionDate);
};

const ViewCar = (props) => {
  const inspections = props.anotherData.inspections;
  const timelineItems = [];
  const inspected = props.carData.inspected;

  if (inspections) {
    inspections.sort(compare);

    inspections.forEach((ins, index) => {
      const inspectionDate = ins.inspectionDate;
      const expiredDate = ins.expiredDate;
      const id = ins.id;

      const now = new Date();
      const isExpired = new Date(expiredDate) < now;

      timelineItems.push({
        dot: <IoShieldCheckmarkOutline style={{ fontSize: "16px" }} />,
        color: "green",
        label: processDate(inspectionDate),
        children: (
          <Link to={`/inspections/${id}`} style={{ color: "currentcolor" }}>
            Đăng kiểm lần thứ {index + 1}
          </Link>
        ),
      });
      timelineItems.push({
        dot: isExpired ? (
          <IoTimerOutline style={{ fontSize: "16px" }} />
        ) : (
          <Icon
            component={IoSyncOutline}
            style={{ fontSize: "16px" }}
            className={classes.spin}
          />
        ),
        color: isExpired ? "red" : "blue",
        label: processDate(expiredDate),
        children: isExpired
          ? `Hết hạn đăng kiểm thứ ${index + 1}`
          : `Sẽ hết hạn đăng kiểm lần thứ ${index + 1}`,
      });
    });
  }

  const items = [
    {
      key: "owner",
      label: <TextWithIcon Icon={IoRocketOutline} text="Thông tin chủ xe" />,
      children: (
        <Owner
          owner={props.anotherData.owner}
          columnProps={{
            sm: 2,
            xs: 1,
          }}
        />
      ),
    },
    {
      key: "car",
      label: <TextWithIcon Icon={IoCarOutline} text="Phương tiện" />,
      children: <Car car={props.carData} />,
    },
    {
      key: "specification",
      label: <TextWithIcon Icon={IoBuildOutline} text="Thông số kĩ thuật" />,
      children: inspected ? (
        <Specification
          specification={props.anotherData.specification}
          columnProps={{
            md: 2,
            sm: 1,
            xs: 1,
          }}
        />
      ) : (
        <NoData text="Phương tiện chưa được đăng kiểm :(" />
      ),
    },
    inspections && {
      key: "inspections",
      label: (
        <TextWithIcon
          Icon={IoShieldCheckmarkOutline}
          text="Lịch sử đăng kiểm"
        />
      ),
      children: inspected ? (
        <Timeline
          style={{ marginTop: "2rem", marginLeft: "-4rem" }}
          mode="left"
          items={timelineItems}
        />
      ) : (
        <NoData text="Phương tiện chưa được đăng kiểm :(" />
      ),
    },
  ];

  return props.error ? (
    <PageNotExist />
  ) : (
    <Card
      className={classes.container}
      loading={props.isLoading}
      title={props.title}
    >
      <Tabs
        className={classes.tabs}
        defaultActiveKey="car"
        items={items}
        centered={true}
      />
    </Card>
  );
};

export default ViewCar;
