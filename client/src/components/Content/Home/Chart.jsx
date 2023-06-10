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

        const getDataThisYear = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/inspections/${
            admin ? "allCentresStatistics" : "centreStatistics"
          }/month/${year}?sort=month`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        if (!getDataThisYear.ok) {
          throw new Error("Can not get.");
        }

        const dataThisYear = await getDataThisYear.json();
        const length = dataThisYear.results;

        dataThisYear.data.data.forEach((d) => {
          items.push({
            month: d.month,
            year: year,
            count: d.count,
            monthYear: `${d.month}/${year}`,
          });
        });

        if (length < 12) {
          const getDataLastYear = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/inspections/${
              admin ? "allCentresStatistics" : "centreStatistics"
            }/month/${year - 1}?sort=month`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
              },
            }
          );

          if (!getDataLastYear.ok) {
            throw new Error("Can not get.");
          }

          const dataLastYear = await getDataLastYear.json();

          const arr = dataLastYear.data.data;

          for (let i = 0; i < 12 - length; i++) {
            const last = arr.pop();
            items.push({
              month: last.month,
              year: year - 1,
              count: last.count,
              monthYear: `${last.month}/${year - 1}`,
            });
          }
        }

        items.sort((a, b) => {
          if (a.year === b.year) return a.month - b.month;
          return a.year - b.year;
        });

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
