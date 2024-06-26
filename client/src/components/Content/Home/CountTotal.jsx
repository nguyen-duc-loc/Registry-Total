import { useAuthUser } from "react-auth-kit";
import image from "./../../../assets/images/grow-1.svg";
import CardStatistics from "../../UI/CardStatistics";

const CountTotal = (props) => {
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  return (
    <CardStatistics
      title="Tổng số lượng đăng kiểm"
      url={`/api/v1/${
        admin ? "" : "users/registrationCentres/"
      }inspections/numberOfDocuments`}
      src={image}
      height={props.height ?? 80}
    />
  );
};

export default CountTotal;
