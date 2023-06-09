import { Line } from "@ant-design/plots";
import { Card } from "antd";
import { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";

const LineChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/inspections/centreStatistics/monthYear?sort=year,month`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Can not get.");
        }

        const res = await response.json();

        const dataItems = res.data.data.map((d) => {
          return {
            count: d.count,
            monthYear: `${d.month}/${d.year}`,
          };
        });

        setData(dataItems);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Can not get.");
      }
    };

    fetchData();
  }, []);

  return (
    <Card title="Biểu đồ đăng kiểm" loading={loading}>
      <Line
        data={data}
        xField="monthYear"
        yField="count"
        height={300}
        xAxis={{
          tickCount: 5,
        }}
        slider={{
          start: 0.5,
          end: 1,
        }}
        meta={{
          count: {
            alias: "Số lượng",
          },
        }}
        smooth={true}
      />
    </Card>
  );
};

export default LineChart;
