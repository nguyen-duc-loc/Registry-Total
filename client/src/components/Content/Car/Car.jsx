import { Descriptions } from "antd";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const { Item } = Descriptions;

const processDate = (date) => {
  if (!date) return;
  const newDate = new Date(date);
  const [month, day, year] = newDate.toLocaleDateString().split("/");
  return [day.padStart(2, "0"), month.padStart(2, "0"), year].join("/");
};

const Car = (props) => {
  const car = props.car;

  return (
    <Descriptions
      column={{
        sm: 2,
        xs: 1,
      }}
      style={{ padding: "1.2rem" }}
    >
      <Item label="Biển đăng kí">
        {props.showLink ? (
          <Link to={`/cars/search/${props.carId}`} style={{ color: "currentcolor" }}>
            {car.numberPlate}
          </Link>
        ) : (
          car.numberPlate
        )}
      </Item>
      <Item label="Số đăng kí">{car.registrationNumber}</Item>
      <Item label="Ngày đăng kí">{processDate(car.registrationDate)}</Item>
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
          <IoClose style={{ color: "#ED2B2A" }} />
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
  );
};

export default Car;
