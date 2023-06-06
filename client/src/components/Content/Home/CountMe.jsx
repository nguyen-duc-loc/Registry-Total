import { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import image from "./../../../assets/images/check-2.svg";
import CardStatistics from "../../UI/CardStatistics";

const CountMe = () => {
  const authHeader = useAuthHeader();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://sleepy-coast-93816.herokuapp.com/api/v1/users/inspections?limit=5000&sort=inspectionNumber`,
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
      title="Số lượng đăng kiểm của tôi"
      loading={loading}
      value={count}
      src={image}
      height={80}
    />
  );
};

export default CountMe;
