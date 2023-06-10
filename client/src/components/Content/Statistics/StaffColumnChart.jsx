import { Column } from "@ant-design/plots";
import { Card, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";

const now = new Date();

const ColumnChart = () => {
  const authHeader = useAuthHeader();
  const [items, setItems] = useState([]);
  const [year, setYear] = useState(now.getFullYear());
  const [loading, setLoading] = useState(false);
  const [yearOptions, setYearOptions] = useState([]);
  const [filterByOption, setFilterByOption] = useState("month");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const dataItems = [];
        const opts = [];

        const getAllYearsData = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/inspections/centreStatistics/year/?sort=year`,
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
          opts.push(d.year);
          if (year === "all") {
            dataItems.push({ count: d.count, year: d.year.toString() });
          }
        });

        setItems(dataItems);
        setYearOptions(opts.sort((a, b) => b - a));

        if (year !== "all") {
          const getYearData = await fetch(
            `${
              import.meta.env.VITE_BASE_URL
            }/api/v1/inspections/centreStatistics/${filterByOption}/${year}/?sort=${filterByOption}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
              },
            }
          );

          if (!getYearData.ok) {
            throw new Error("Can not get.");
          }

          const yearData = await getYearData.json();

          yearData.data.data.forEach((d) => {
            dataItems.push({
              count: d.count,
              option: d[`${filterByOption}`].toString(),
            });
          });

          setItems(dataItems);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [year, filterByOption]);

  return (
    <Card
      title="Số liệu thống kê"
      loading={loading}
      style={{ height: "100%" }}
      extra={
        <Space size="middle">
          <Select
            defaultValue={year}
            onChange={(value) => {
              setYear(value);
            }}
            style={{
              width: 100,
            }}
            listHeight={200}
            options={[
              {
                value: "all",
                label: "Tất cả",
              },
              ...yearOptions.map((year) => {
                return { value: year, label: year };
              }),
            ]}
          />
          <Select
            defaultValue={filterByOption}
            onChange={(value) => {
              setFilterByOption(value);
            }}
            style={{
              width: 120,
            }}
            disabled={year === "all"}
            listHeight={200}
            options={[
              {
                value: "month",
                label: "Theo tháng",
              },
              {
                value: "season",
                label: "Theo quý",
              },
            ]}
          />
        </Space>
      }
    >
      <Column
        data={items}
        xField={year === "all" ? "year" : "option"}
        yField="count"
        height={350}
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

export default ColumnChart;
