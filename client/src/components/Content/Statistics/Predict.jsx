import { Pie } from "@ant-design/plots";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useMediaQuery } from "react-responsive";

const Predict = (props) => {
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(0);
  const [aboutToExpire, setAboutToExpire] = useState(0);
  const [newIns, setNewIns] = useState(0);
  const breakPoint = useMediaQuery({ query: "(min-width: 576px)" });
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [getExpireData, getNumberOfNew] = await Promise.all([
          fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/${
              props.centreId ? `registrationCentres/${props.centreId}/` : ""
            }cars/${
              admin && props.adminStat
                ? "allCentresStatistics"
                : "centreStatistics"
            }/expirationPredictions`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
              },
            }
          ),
          fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/${
              props.centreId ? `registrationCentres/${props.centreId}/` : ""
            }cars/${
              admin && props.adminStat
                ? "allCentresStatistics"
                : "centreStatistics"
            }/newInspectionPredictions`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
              },
            }
          ),
        ]);

        if (!getExpireData.ok || !getNumberOfNew.ok) {
          throw new Error("Can not get.");
        }

        const [expireData, numberOfNew] = await Promise.all([
          getExpireData.json(),
          getNumberOfNew.json(),
        ]);

        setExpired(
          expireData.reInspections.filter((d) => d.status === "expired").pop()
            ?.count ?? 0
        );

        setAboutToExpire(
          expireData.reInspections
            .filter((d) => d.status === "about-to-expire")
            .pop()?.count ?? 0
        );

        setNewIns(
          Math.ceil(
            admin && props.adminStat
              ? numberOfNew.results
              : numberOfNew.data.data
          )
        );

        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (import.meta.env.VITE_ENV === "development") console.error(err);
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
