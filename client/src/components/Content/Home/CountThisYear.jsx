import { useAuthUser } from "react-auth-kit";
import image from "./../../../assets/images/grow-2.svg";
import CardStatistics from "../../UI/CardStatistics";

const now = new Date();
const year = now.getFullYear();

const CountThisYear = (props) => {
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  return (
    <CardStatistics
      title="Đăng kiểm trong năm nay"
      url={`/api/v1/${
        admin ? "" : "users/registrationCentres/"
      }inspections/numberOfDocuments?inspectionDate[gte]=${year}-01-01&inspectionDate[lte]=${year}-12-31`}
      src={image}
      height={props.height ?? 80}
    />
  );
};

export default CountThisYear;
