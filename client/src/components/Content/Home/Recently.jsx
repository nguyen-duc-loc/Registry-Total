import { Table } from "antd";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Link } from "react-router-dom";
import { DoubleRightOutlined } from "@ant-design/icons";
import { IoPlayForwardOutline } from "react-icons/io5";

const processDate = (date) => {
  if (!date) return;
  const [month, day, year] = new Date(date).toLocaleDateString().split("/");
  return [day.padStart(2, "0"), month.padStart(2, "0"), year].join("/");
};

const Recently = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/users/registrationCentres/inspections?limit=5&sort=-inspectionDate`,
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

        setData(res.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

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
      render: (text) => processDate(text),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiredDate",
      key: "expiredDate",
      align: "center",
      render: (text) => processDate(text),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, { key }) => {
        return (
          <Link
            style={{ color: "var(--color-black)", fontSize: "1.2rem" }}
            to={`/inspections/${key}`}
          >
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
      numberPlate: d.car.numberPlate,
    };
  });

  return (
    <Table
      title={() => "Đăng kiểm gần đây"}
      footer={() => (
        <Link
          to="/inspections/all"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            justifyContent: "center",
          }}
        >
          <span>Xem thêm</span>
          <IoPlayForwardOutline />
        </Link>
      )}
      loading={loading}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      scroll={{ x: 550 }}
    />
  );
};

export default Recently;
