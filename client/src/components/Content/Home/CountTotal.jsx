import { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import image from "./../../../assets/images/grow-1.svg";
import CardStatistics from "../../UI/CardStatistics";

const CountTotal = () => {
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
          }/api/v1/users/registrationCentres/inspections?limit=45000`,
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

        setCount(res.results);
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
      title="Tổng số lượng đăng kiểm"
      loading={loading}
      value={count}
      src={image}
      height={80}
    />
  );
};

export default CountTotal;
