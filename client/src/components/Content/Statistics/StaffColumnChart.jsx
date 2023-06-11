import { Column } from "@ant-design/plots";
import { Card, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";

const now = new Date();

const yearOptions = [];

for (let i = now.getFullYear(); i >= 2014; i--) {
  yearOptions.push(i);
}

const StaffColumnChart = (props) => {
  const authHeader = useAuthHeader();
  const [items, setItems] = useState([]);
  const [year, setYear] = useState(now.getFullYear());
  const [loading, setLoading] = useState(false);
  const [filterByOption, setFilterByOption] = useState("month");
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const dataItems = [];

        const url =
          year === "all"
            ? `/api/v1/${
                admin ? `registrationCentres/${props.centreId}/` : ""
              }inspections/centreStatistics/year?sort=year`
            : `/api/v1/${
                admin ? `registrationCentres/${props.centreId}/` : ""
              }inspections/centreStatistics/${filterByOption}/${year}/?sort=${filterByOption}`;

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader(),
          },
        });

        if (!response.ok) {
          throw new Error("Can not get.");
        }

        const res = await response.json();

        res.data.data.forEach((d) => {
          if (year === "all") {
            dataItems.push({
              count: d.count,
              year: d.year.toString(),
            });
          } else {
            dataItems.push({
              count: d.count,
              option: d[`${filterByOption}`].toString(),
            });
          }
        });

        setItems(dataItems);

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
            disabled={loading}
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
            disabled={year === "all" || loading}
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

export default StaffColumnChart;
