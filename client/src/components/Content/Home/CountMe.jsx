import image from "./../../../assets/images/check-2.svg";
import CardStatistics from "../../UI/CardStatistics";

const CountMe = () => {
  return (
    <CardStatistics
      title="Số lượng đăng kiểm của tôi"
      url="/api/v1/users/inspections/numberOfDocuments"
      src={image}
      height={80}
    />
  );
};

export default CountMe;
