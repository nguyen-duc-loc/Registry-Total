import { ConfigProvider, Table } from "antd";
import classes from "./../../../styles/Content/Inspection/InspectionsTable.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { DoubleRightOutlined } from "@ant-design/icons";

const processDate = (date) => {
  const [month, day, year] = new Date(date).toLocaleDateString().split("/");
  return [day, month, year].join("/");
};

const InspectionsTable = (props) => {
  const authHeader = useAuthHeader();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let url = "https://sleepy-coast-93816.herokuapp.com/api/v1/users/";

    if (props.mode === "all") url += "registrationCentres/";

    url += "inspections?limit=5000&sort=inspectionNumber";

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader(),
          },
        });

        if (!response.ok) {
          throw new Error("Can not fetch");
        }

        const res = await response.json();
        setData(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [props.mode]);

  const columns = [
    {
      title: "Số đăng kiểm",
      dataIndex: "inspectionNumber",
      key: "inspectionNumber",
      align: "center",
    },
    {
      title: "Biển số xe",
      dataIndex: "numberPlate",
      key: "numberPlate",
      align: "center",
    },
    {
      title: "Ngày đăng kiểm",
      dataIndex: "inspectionDate",
      key: "inspectionDate",
      align: "center",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiredDate",
      key: "expiredDate",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, { key }) => {
        return (
          <Link className={classes.more} to={`/inspections/${key}`}>
            <DoubleRightOutlined />
          </Link>
        );
      },
    },
  ];

  const tableData = data.map((d) => {
    return {
      key: d.id,
      ...d,
      inspectionDate: processDate(d.inspectionDate),
      expiredDate: processDate(d.expiredDate),
      numberPlate: d.car.numberPlate,
    };
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          fontWeightStrong: 500,
          colorFillAlter: "f5f5f5",
        },
      }}
    >
      <Table
        // bordered
        loading={loading}
        columns={columns}
        className={classes.table}
        dataSource={tableData}
        pagination={{
          position: ["bottomCenter"],
        }}
        scroll={{ x: 720 }}
      />
    </ConfigProvider>
  );
};

export default InspectionsTable;
