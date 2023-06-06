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

        let dataItems = [];
        const allYears = [];

        const getAllYearsData = await fetch(
          `https://sleepy-coast-93816.herokuapp.com/api/v1/inspections/centreStatistics/year/?sort=year&fields=year`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        if (!getAllYearsData.ok) {
          throw new Error("Can not get.");
        }

        const allYearsData = await getAllYearsData.json();

        allYearsData.data.data.forEach((d) => {
          allYears.push(d.year);
        });

        // Promise.all(
        //   allYears.map((year) => {
        //     fetch(
        //       `https://sleepy-coast-93816.herokuapp.com/api/v1/inspections/centreStatistics/month/${year}?sort=month`,
        //       {
        //         headers: {
        //           "Content-Type": "application/json",
        //           Authorization: authHeader(),
        //         },
        //       }
        //     )
        //       .then((response) => response.json())
        //       .then((res) => {
        //         const data = res.data.data;
        //         dataItems = dataItems.concat(
        //           data.map((d) => {
        //             return {
        //               month: d.month,
        //               count: d.count,
        //               year: `${year}`,
        //               monthYear: `${d.month}/${year}`,
        //             };
        //           })
        //         );
        //         // console.log(dataItems);
        //       })
        //       .catch((err) => console.error(err));
        //   })
        // );

        // console.log(dataItems);

        dataItems.sort((a, b) => {
          if (a.year === b.year) return a.month - b.month;
          return a.year - b.year;
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
        xField="yearMonth"
        yField="count"
        height={250}
        xAxis={{
          tickCount: 5,
        }}
        slider={{
          start: 0,
          end: 1,
        }}
      />
    </Card>
  );
};

export default LineChart;
