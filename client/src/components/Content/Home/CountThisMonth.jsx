import { useAuthUser } from "react-auth-kit";
import image from "./../../../assets/images/check-1.svg";
import CardStatistics from "../../UI/CardStatistics";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;

const CountThisMonth = () => {
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  return (
    <CardStatistics
      title="Đăng kiểm trong tháng này"
      url={`/api/v1/inspections/${
        admin ? "allCentresStatistics" : "centreStatistics"
      }/month/${year}?month=${month}`}
      src={image}
      height={80}
    />
  );
};

export default CountThisMonth;
