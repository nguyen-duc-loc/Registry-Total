import { Collapse, Descriptions } from "antd";
import {
  IoCallOutline,
  IoCalendarOutline,
  IoPersonOutline,
  IoMailOutline,
  IoConstructOutline,
  IoShieldCheckmarkOutline,
  IoSyncOutline,
  IoCheckmark,
} from "react-icons/io5";
import TextWithIcon from "../../UI/TextWithIcon";
import Car from "../Car/Car";
import Owner from "../Car/Owner";
import Specification from "../Car/Specification";
import InspectionPDF from "./InspectionPDF";
import { useMediaQuery } from "react-responsive";

const { Panel } = Collapse;

const { Item } = Descriptions;

const processDate = (date) => {
  if (!date) return;
  const newDate = new Date(date);
  const [month, day, year] = newDate.toLocaleDateString().split("/");
  return [day.padStart(2, "0"), month.padStart(2, "0"), year].join("/");
};

const InspectionCollapse = (props) => {
  const data = props.data;
  const owner = data.car.owner;
  const specification = data.car.specification;
  const car = data.car;

  const breakPoint = useMediaQuery({ query: "(max-width: 768px)" });

  const items = [
    {
      key: "owner",
      label: "Thông tin chủ sở hữu",
      children: <Owner owner={owner} />,
    },
    {
      key: "car",
      label: "Phương tiện",
      children: <Car car={car} showLink={true} carId={car.id} />,
    },
    {
      key: "specification",
      label: "Thông số kĩ thuật",
      children: <Specification specification={specification} />,
    },
    {
      key: "inspection",
      label: "Thông tin đăng kiểm",
      children: (
        <Descriptions
          column={1}
          style={{ padding: "1.2rem" }}
          layout={breakPoint ? "vertical" : "horizontal"}
        >
          <Item
            label={
              <TextWithIcon
                Icon={IoShieldCheckmarkOutline}
                text="Số đăng kiểm"
              />
            }
          >
            {data.inspectionNumber}
          </Item>
          <Item
            label={
              <TextWithIcon Icon={IoCalendarOutline} text="Ngày đăng kiểm" />
            }
          >
            {processDate(data.inspectionDate)}
          </Item>
          <Item
            label={
              <TextWithIcon
                Icon={IoCalendarOutline}
                text="Có hiệu lực đến ngày"
              />
            }
          >
            {processDate(data.expiredDate)}
          </Item>
          <Item
            label={
              <TextWithIcon Icon={IoConstructOutline} text="Đơn vị kiểm định" />
            }
          >
            {data.madeBy.workFor.name}
          </Item>
          <Item
            label={<TextWithIcon Icon={IoCallOutline} text="Số điện thoại" />}
          >
            {data.madeBy.workFor.phone}
          </Item>
          <Item label={<TextWithIcon Icon={IoMailOutline} text="Email" />}>
            {data.madeBy.workFor.email}
          </Item>
          <Item
            label={
              <TextWithIcon Icon={IoPersonOutline} text="Nhân viên đăng kiểm" />
            }
          >
            {data.madeBy.name}
          </Item>
          {data.firstTime && (
            <Item
              label={
                <TextWithIcon Icon={IoSyncOutline} text="Đăng kiểm lần đầu" />
              }
            >
              <div>
                <IoCheckmark style={{ color: "#379237" }} />
              </div>
            </Item>
          )}
        </Descriptions>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Collapse
        items={items}
        defaultActiveKey="inspection"
        accordion
        style={{ width: "100%" }}
      />
      <InspectionPDF car={car} specification={specification} data={data} />
    </div>
  );
};

export default InspectionCollapse;
