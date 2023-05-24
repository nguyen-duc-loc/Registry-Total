import { Button, Collapse, Descriptions } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import {
  IoCallOutline,
  IoCalendarOutline,
  IoPersonOutline,
  IoMailOutline,
  IoConstructOutline,
  IoLocationOutline,
  IoIdCardOutline,
  IoShieldCheckmarkOutline,
  IoSyncOutline,
  IoCheckmark,
  IoClose,
} from "react-icons/io5";
import TextWithIcon from "../../UI/TextWithIcon";

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Collapse
        defaultActiveKey="inspection"
        accordion
        style={{ width: "100%" }}
      >
        <Panel header="Thông tin chủ sở hữu" key="owner">
          <Descriptions
            column={1}
            style={{ padding: "1.2rem" }}
            layout="vertical"
          >
            <Item
              label={<TextWithIcon Icon={IoPersonOutline} text="Họ và tên" />}
            >
              {owner.name}
            </Item>
            <Item
              label={<TextWithIcon Icon={IoLocationOutline} text="Địa chỉ" />}
            >
              {owner.address}
            </Item>
            <Item
              label={<TextWithIcon Icon={IoCallOutline} text="Số điện thoại" />}
            >
              {owner.phone}
            </Item>
            <Item label={<TextWithIcon Icon={IoMailOutline} text="Email" />}>
              {owner.email}
            </Item>
            <Item
              label={<TextWithIcon Icon={IoIdCardOutline} text="Chủ sở hữu" />}
            >
              Chủ sở hữu{" "}
              {owner.role === "organization" ? "doanh nghiệp" : "cá nhân"}
            </Item>
          </Descriptions>
        </Panel>
        <Panel header="Phương tiện" key="car">
          <Descriptions column={1} style={{ padding: "1.2rem" }}>
            <Item label="Biển đăng kí">{car.numberPlate}</Item>
            <Item label="Số đăng kí">{car.registrationNumber}</Item>
            <Item label="Ngày đăng kí">
              {processDate(car.registrationDate)}
            </Item>
            <Item label="Loại phương tiện">{car.type}</Item>
            <Item label="Nhãn hiệu">{car.brand}</Item>
            <Item label="Số loại">{car.modelCode}</Item>
            <Item label="Số máy">{car.engineNumber}</Item>
            <Item label="Số khung">{car.chassisNumber}</Item>
            <Item label="Năm sản xuất">{car.manufacturedYear}</Item>
            <Item label="Nước sản xuất">{car.manufacturedCountry}</Item>
            <Item label="Kinh doanh vận tải">
              {car.purpose === "business" ? (
                <IoCheckmark style={{ color: "#379237" }} />
              ) : (
                <IoClose />
              )}
            </Item>
            <Item label="Cải tạo" style={{ padding: 0 }}>
              {car.recovered ? (
                <IoCheckmark style={{ color: "#379237" }} />
              ) : (
                <IoClose style={{ color: "#ED2B2A" }} />
              )}
            </Item>
          </Descriptions>
        </Panel>
        <Panel header="Thông số kĩ thuật" key="specification">
          <Descriptions
            column={1}
            style={{ padding: "1.2rem" }}
            layout="vertical"
          >
            <Item label="Công thức bánh xe">{specification.wheelFormula}</Item>
            <Item label="Vết bánh xe">{specification.wheelTread}</Item>
            <Item label="Kích thước bao">{specification.overallDimension}</Item>
            <Item label="Kích thước lòng thùng hàng">
              {specification.containerDimension}
            </Item>
            <Item label="Chiều dài cơ sở">{specification.lengthBase}</Item>
            <Item label="Khối lượng bản thân">{specification.kerbMass}</Item>
            <Item label="Khối lượng hàng CC theo TK/CP TGGT">
              {specification.designedAndAuthorizedPayload}
            </Item>
            <Item label="Khối lượng toàn bộ theo TK/CP TGGT">
              {specification.designedAndAuthorizedTotalMass}
            </Item>
            <Item label="Khối lượng kéo theo TK/CP TGGT">
              {specification.designedAndAuthorizedTowedMass}
            </Item>
            <Item label="Số người cho phép chở">
              {specification.permissibleCarry}
            </Item>
            <Item label="Loại nhiên liệu">{specification.fuel}</Item>
            <Item label="Thể tích làm việc của động cơ">
              {specification.engineDisplacement}
            </Item>
            <Item label="Công suất lớn nhất trên tốc độ quay">
              {specification.maximumOutputToRpmRatio}
            </Item>
            <Item label="Số lượng lốp, cỡ lốp">
              {specification.numberOfTiresAndTireSize.replace("tires", "lốp")}
            </Item>
          </Descriptions>
        </Panel>
        <Panel header="Thông tin đăng kiểm" key="inspection">
          <Descriptions column={1} style={{ padding: "1.2rem" }}>
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
                <TextWithIcon
                  Icon={IoConstructOutline}
                  text="Đơn vị kiểm định"
                />
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
                <TextWithIcon
                  Icon={IoPersonOutline}
                  text="Nhân viên đăng kiểm"
                />
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
        </Panel>
      </Collapse>
      <Button
        type="primary"
        size="large"
        style={{ marginTop: "2rem" }}
        icon={<DownloadOutlined />}
      >
        Tải xuống đăng kiểm
      </Button>
    </div>
  );
};

export default InspectionCollapse;
