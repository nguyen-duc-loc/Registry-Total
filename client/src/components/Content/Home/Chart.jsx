import { Card } from "antd";
import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { Column } from "@ant-design/plots";

const now = new Date();
const year = now.getFullYear();

const Chart = () => {
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const items = [];

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/inspections/${
            admin ? "allCentresStatistics" : "centreStatistics"
          }/monthYear?sort=-year,-month&limit=12`,
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

        res.data.data.forEach((d) => {
          items.push({
            count: d.count,
            monthYear: `${d.month}/${d.year}`,
          });
        });

        items.reverse();

        setData(items);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Card title="Thống kê" loading={loading}>
      <Column
        data={data}
        xField="monthYear"
        yField="count"
        height={250}
        label={{
          position: "middle",
          style: {
            fill: "#FFFFFF",
            opacity: 0.6,
          },
        }}
        xAxis={{
          label: {
            autoHide: true,
            autoRotate: false,
          },
        }}
        meta={{
          count: {
            alias: "Số lượng",
          },
          month: {
            alias: "Tháng",
          },
        }}
      />
    </Card>
  );
};

export default Chart;
