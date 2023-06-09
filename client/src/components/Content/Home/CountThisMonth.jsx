import { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import image from "./../../../assets/images/check-1.svg";
import CardStatistics from "../../UI/CardStatistics";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;

const CountThisMonth = () => {
  const authHeader = useAuthHeader();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/inspections/centreStatistics/month/${year}?sort=month`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Can not get");
        }

        const res = await response.json();

        setCount(res.data.data.filter((d) => d.month === month)[0]?.count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <CardStatistics
      title="Đăng kiểm trong tháng này"
      loading={loading}
      value={count}
      src={image}
      height={80}
    />
  );
};

export default CountThisMonth;
