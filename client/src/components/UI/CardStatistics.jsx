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
    const fetchData = async () => {
      try {
        setLoading(true);

        setTimeout(3000);

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

        setCount(res.data.data[0].count ?? res.results);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
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
