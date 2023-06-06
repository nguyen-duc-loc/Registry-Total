import { Pie } from "@ant-design/plots";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";

const Predict = (props) => {
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(false);
  const [expire, setExpire] = useState(0);
  const [newIns, setNewIns] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const getNumberOfExpire = await fetch(
          `https://sleepy-coast-93816.herokuapp.com/api/v1/cars/centreStatistics/expirationPredictions`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        const getNumberOfNew = await fetch(
          `https://sleepy-coast-93816.herokuapp.com/api/v1/cars/centreStatistics/newInspectionPredictions`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        if (!getNumberOfExpire.ok || !getNumberOfNew.ok) {
          throw new Error("Can not get.");
        }

        const numberOfExpire = await getNumberOfExpire.json();
        const numberOfNew = await getNumberOfNew.json();

        setExpire(numberOfExpire.reInspections[1].count);
        setNewIns(Math.ceil(numberOfNew.data.data));

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const data = [
    {
      type: "Sắp hết hạn",
      value: expire,
    },
    {
      type: "Đăng kiểm mới",
      value: newIns,
    },
  ];

  return (
    <Card title="Dự báo đăng kiểm" loading={loading}>
      <Pie
        appendPadding={10}
        data={data}
        angleField="value"
        colorField="type"
        radius={0.75}
        legend={{
          position: "bottom",
        }}
        label={{
          type: "inner",
          content: "{value}",
        }}
        interactions={[
          {
            type: "element-selected",
          },
          {
            type: "element-active",
          },
        ]}
        height={props.height}
      />
    </Card>
  );
};

export default Predict;
