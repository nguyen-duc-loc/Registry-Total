import {
  Document,
  Page,
  Text,
  Font,
  StyleSheet,
  PDFDownloadLink,
  View,
  Image,
} from "@react-pdf/renderer";

import times from "./../../../assets/fonts/times.ttf";
import roboto from "./../../../assets/fonts/roboto.ttf";
import robotoBold from "./../../../assets/fonts/roboto-bold.ttf";
import timesBold from "./../../../assets/fonts/times-bold.ttf";
import timesItalic from "./../../../assets/fonts/times-italic.ttf";
import signature from "./../../../assets/images/signature.png";
import { Button } from "antd";
import { IoDownloadOutline } from "react-icons/io5";

Font.register({
  family: "Times New Roman",
  src: times,
});

Font.register({
  family: "Roboto",
  src: roboto,
});

Font.register({
  family: "Roboto Bold",
  src: robotoBold,
});

Font.register({
  family: "Times New Roman Bold",
  src: timesBold,
});

Font.register({
  family: "Times New Roman Italic",
  src: timesItalic,
});

const flex = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const bold = {
  fontFamily: "Times New Roman Bold",
};

const italic = {
  fontFamily: "Times New Roman Italic",
  fontSize: 12,
};

const center = {
  textAlign: "center",
  textTransform: "uppercase",
  fontSize: 14,
};

const Title = (props) => {
  return (
    <View
      break={props.break}
      style={{ ...props.style, ...flex, fontSize: 14, marginBottom: 6 }}
    >
      <Text
        style={{
          ...bold,
          textTransform: "uppercase",
        }}
      >
        {props.title}{" "}
      </Text>
      <Text
        style={{
          textTransform: "uppercase",
          ...italic,
        }}
      >
        {props.english}
      </Text>
    </View>
  );
};

const Item = (props) => {
  return (
    <View style={flex} break={props.break}>
      <Text>{props.title}: </Text>
      {props.english && <Text style={italic}>{props.english} </Text>}
      <Text
        style={{
          fontFamily: props.bold ? "Roboto Bold" : "Roboto",
          fontSize: 12,
        }}
      >
        {props.value}
      </Text>
    </View>
  );
};

const processDate = (date) => {
  if (!date) return;
  const newDate = new Date(date);
  const [month, day, year] = newDate.toLocaleDateString().split("/");
  return [day.padStart(2, "0"), month.padStart(2, "0"), year].join("/");
};

const convertDate = (date) => {
  if (!date) return [];
  const newDate = new Date(date);

  return [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: 30,
    fontFamily: "Times New Roman",
    fontSize: 13,
  },
});

const InspectionPDF = ({ data, car, specification }) => {
  const [date, month, year] = convertDate(data.inspectionDate);

  const Inspecion = () => (
    <Document>
      <Page size="A5" style={styles.body}>
        <Text style={center}>Bộ giao thông vận tải</Text>
        <Text
          style={{
            ...center,
            fontFamily: "Times New Roman Bold",
            textDecoration: "underline",
          }}
        >
          Cục đăng kiểm Việt Nam
        </Text>
        <Text style={{ ...center, textTransform: "none" }}>
          MOT &ndash; Vietnam Register
        </Text>
        <Text
          style={{
            ...center,
            color: "red",
            fontFamily: "Times New Roman Bold",
            marginTop: 120,
            fontSize: 15,
          }}
        >
          Giấy chứng nhận kiểm định
        </Text>
        <Text
          style={{
            ...center,
            fontFamily: "Times New Roman Bold",
            fontSize: 13,
            color: "red",
            marginTop: 12,
          }}
        >
          An toàn kĩ thuật và bảo vệ môi trường
        </Text>
        <Text
          style={{
            ...center,
            fontFamily: "Times New Roman Bold",
            fontSize: 13,
            marginBottom: 12,
            color: "red",
          }}
        >
          Phương tiện giao thông cơ giới đường bộ
        </Text>
        <Text style={{ ...center, fontFamily: "Roboto Bold", fontSize: 10 }}>
          Periodical inspection certificate
        </Text>
        <Text style={{ ...center, fontFamily: "Roboto Bold", fontSize: 10 }}>
          of motor vehicle for compliance with technical safety
        </Text>
        <Text style={{ ...center, fontFamily: "Roboto Bold", fontSize: 10 }}>
          and environment protection requirements
        </Text>
        <Title break={true} title="1. Phương tiện" english="(Vehicle)" />
        <Item
          title="Biển đăng ký"
          english="(Registration Number)"
          value={car.numberPlate}
          bold={true}
        />
        <Item
          title="Số quản lý"
          english="(Vehicle Inspection No.)"
          value={data.inspectionNumber}
        />
        <Item title="Loại phương tiện" english="(Type)" value={car.type} />
        <Item title="Nhãn hiệu" english="(Mark)" value={car.brand} />
        <Item title="Số loại" english="(Model Code)" value={car.modelCode} />
        <Item
          title="Số máy"
          english="(Engine Number)"
          value={car.engineNumber}
        />
        <Item
          title="Số khung"
          english="(Chassis Number)"
          value={car.chassisNumber}
        />
        <Item
          title="Năm, Nước sản xuất"
          value={`${car.manufacturedYear}, ${car.manufacturedCountry}`}
        />
        <Text style={italic}>(Manufactured Year and Country)</Text>
        <Item
          title="Kinh doanh vận tải"
          english="(Commercial Use)"
          value={car.purpose === "business" ? "Có" : "Không"}
        />
        <Item
          title="Cải tạo"
          english="(Modification)"
          value={car.recovered ? "Có" : "Không"}
        />
        <Title
          break={false}
          title="2. Thông số kỹ thuật"
          english="(Specifications)"
          style={{ marginTop: 10 }}
        />
        <Item
          title="Công thức bánh xe"
          english="(Wheel Formula)"
          value={specification.wheelFormula}
        />
        <Item
          title="Vết bánh xe"
          english="(Wheel Tread)"
          value={specification.wheelTread}
        />
        <Item
          title="Kích thước bao"
          english="(Overall Dimension)"
          value={specification.overallDimension}
        />
        <Item
          title="Kích thước lòng thùng xe"
          value={specification.containerDimension}
        />
        <Text style={italic}>(Inside cargo container dimension)</Text>
        <Item
          title="Chiều dài cơ sở"
          english="(Wheelbase)"
          value={specification.lengthBase}
        />
        <Item
          title="Khối lượng bản thân"
          english="(Kerb mass)"
          value={specification.kerbMass}
        />
        <Item
          title="Khối lượng hàng CC theo TK/CP TGGT"
          value={specification.designedAndAuthorizedPayload}
        />
        <Text style={italic}>(Design/Authorized pay load)</Text>
        <Item
          title="Khối lượng toàn bộ theo TK/CP TGGT"
          value={specification.designedAndAuthorizedTotalMass}
        />
        <Text style={italic}>(Design/Authorized total load)</Text>
        <Item
          title="Khối lượng kéo theo TK/CP TGGT"
          value={specification.designedAndAuthorizedTowedMass}
        />
        <Text style={italic}>(Design/Authorized towed load)</Text>
        <Item
          title="Số lượng người cho phép chở"
          value={`${specification.permissibleCarry} chỗ ngồi, 0 chỗ đứng, 0 chỗ nằm`}
        />
        <Text style={italic}>
          (Permissible No. of Pers Carried: seat, stood place, laying place)
        </Text>
        <Item
          title="Loại nhiên liệu"
          english="(Type of Fuel Used)"
          value={specification.fuel}
        />
        <Item
          title="Thể tích làm việc của động cơ"
          english="(Engine Displacement)"
          value={specification.engineDisplacement}
        />
        <Item
          title="Công suất lớn nhất/tốc độ quay"
          english="(Max output/rpm)"
          value={specification.maximumOutputToRpmRatio}
        />
        <Item
          title="Số lượng lốp, cỡ lốp/trục"
          value={specification.numberOfTiresAndTireSize.replace("tires", "lốp")}
          break={true}
        />
        <Text style={italic}>(Number of tires; Tires size/axle)</Text>
        <View
          style={{
            ...flex,
            marginTop: 30,
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <View style={{ flex: 1, dislay: "flex", alignItems: "center" }}>
            <Text>Có hiệu lực đến hết ngày</Text>
            <View style={flex}>
              <Text style={italic}>(Valid until) </Text>
              <Text style={bold}>{processDate(data.expiredDate)}</Text>
            </View>
          </View>
          <View style={{ dislay: "flex", alignItems: "center" }}>
            <Text>
              {data.madeBy.workFor.name
                .split(" ")
                .slice(4, -2)
                .join(" ")
                .replace("Tỉnh", "")
                .replace("Thành phố", "TP.")
                .trim()}
              , ngày {date} tháng {month} năm {year}
            </Text>
            <Text style={{ ...italic, textAlign: "center" }}>
              (Issued on, Day/Month/Year)
            </Text>
            <Text style={{ ...bold, textTransform: "uppercase" }}>
              Đơn vị kiểm định
            </Text>
            <Text
              style={{ ...italic, fontSize: 13, textTransform: "uppercase" }}
            >
              (Inspection center)
            </Text>
            <Image src={signature} style={{ width: 60, marginTop: 5 }} />
          </View>
        </View>
        <Text style={{ ...center, fontFamily: "Times New Roman Bold" }} break>
          Chủ phương tiện, lái xe cần biết
        </Text>
        <Text
          style={{
            ...italic,
            fontSize: 10,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Vehicle owners, drivers are to be aware of the followings:
        </Text>
        <Text>
          1. Khi tham gia giao thông phải mang theo Giấy chứng nhận kiểm định.
          Nộp lại Giấy chứng nhận kiểm định và Tem kiểm định khi có thông báo
          thu hồi của các Đơn vị đăng kiểm.
        </Text>
        <Text style={{ ...italic, marginTop: 6, marginBottom: 6 }}>
          When in traffic, drivers are requested to carry the certificate of
          inspections. Return certificate and inspection stamp when receiving a
          withdrawal notice from the Registration and Inspection Center.
        </Text>
        <Text>
          2. Lái xe khi lưu hành qua cầu, hầm đường bộ phải tuân thủ các biển
          báo hiệu đường bộ được đặt trước công trình.
        </Text>
        <Text style={{ ...italic, marginTop: 6, marginBottom: 6 }}>
          When passing the bridges, road tunnels, drivers must comply with road
          warning signs put forward its.
        </Text>
        <Text>
          3. Thực hiện bảo dưỡng, sửa chữa nhằm duy trì tình trạng kỹ thuật của
          xe giữa hai kỳ kiểm định.
        </Text>
        <Text style={{ ...italic, marginTop: 6, marginBottom: 6 }}>
          Perform maintenance and/or repair to the good technical conditions of
          the vehicle between two consecutive inspections.
        </Text>
        <Text>
          4. Khi có thay đổi thông tin hành chính, thông số kỹ thuật thì phải
          đến Đơn vị đăng kiểm để được hước dẫn làm thủ tục ghi nhận thay đổi.
        </Text>
        <Text style={{ ...italic, marginTop: 6, marginBottom: 6 }}>
          When roaming, transfer of vehicle ownership, renovation, modification
          of frame (chassis) or changing of engine No, ... the concerned
          Registration and Inspection Center (Vietnam Registration) should be
          notified for instructions and the required procedures are to be
          followed.
        </Text>
        <Text>
          5. Xe cơ giới bị tai nạn giao thông đến mức không đảm bảo an toàn kỹ
          thuật và bảo vệ môi trường theo quy định phải sửa chữa, khắc phục và
          đến Đơn vị đăng kiểm để kiểm định lại.
        </Text>
        <Text style={{ ...italic, marginTop: 6, marginBottom: 6 }}>
          A motor vehicle which is damaged by accident and the requirements for
          technical safety and environment protection are not assured, is to be
          repaired and brought for re-inspection at an Inspection Center.
        </Text>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={<Inspecion />} fileName="inpection.pdf">
      {({ blob, url, loading, error }) => (
        <Button
          type="primary"
          size="large"
          style={{ marginTop: "2rem" }}
          disabled={loading}
          icon={
            <IoDownloadOutline
              style={{
                fontSize: "20px",
                verticalAlign: "top",
                marginRight: "8px",
              }}
            />
          }
        >
          {loading ? "Đang tải dữ liệu..." : "Tải xuống đăng kiểm"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default InspectionPDF;
