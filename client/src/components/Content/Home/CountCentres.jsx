import image from "./../../../assets/images/check-3.svg";
import CardStatistics from "../../UI/CardStatistics";

const CountCentres = () => {
  return (
    <CardStatistics
      title="Số lượng trung tâm đăng kiểm"
      url="/api/v1/registrationCentres/numberOfDocuments"
      src={image}
      height={80}
    />
  );
};

export default CountCentres;
