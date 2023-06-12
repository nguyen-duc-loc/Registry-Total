import { Card, Statistic, Image } from "antd";
import CountUp from "react-countup";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useState, useEffect } from "react";

const formatter = (value) => <CountUp end={value} separator="," />;

const CardStatistics = (props) => {
  const authHeader = useAuthHeader();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}${props.url}`,
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

    const timer = setTimeout(() => {
      fetchData();
    }, props.timeout ?? 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Card loading={loading}>
      <Statistic title={props.title} value={count} formatter={formatter} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.6rem",
        }}
      >
        <Image
          src={props.src}
          height={props.height}
          preview={false}
          style={{ paddingTop: "1.6rem" }}
        />
      </div>
    </Card>
  );
};

export default CardStatistics;
