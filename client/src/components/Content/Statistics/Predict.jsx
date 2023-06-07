import { Pie } from "@ant-design/plots";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useMediaQuery } from "react-responsive";

const Predict = (props) => {
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(0);
  const [aboutToExpire, setAboutToExpire] = useState(0);
  const [newIns, setNewIns] = useState(0);
  const breakPoint = useMediaQuery({ query: "(min-width: 576px)" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const getExpireData = await fetch(
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

        if (!getExpireData.ok || !getNumberOfNew.ok) {
          throw new Error("Can not get.");
        }

        const expireData = await getExpireData.json();
        const numberOfNew = await getNumberOfNew.json();

        setExpired(expireData.reInspections[0].count);
        setAboutToExpire(expireData.reInspections[1].count);
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
      type: "Đã hết hạn",
      value: expired,
    },
    {
      type: "Sắp hết hạn",
      value: aboutToExpire,
    },
    {
      type: "Mới (dự đoán)",
      value: newIns,
    },
  ];

  return (
    <Card title="Trong tháng này" loading={loading}>
      <Pie
        appendPadding={10}
        data={data}
        angleField="value"
        colorField="type"
        radius={0.75}
        legend={{
          position: breakPoint ? "right" : "bottom",
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
