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

const TopCentre = () => {
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
          }/api/v1/inspections/allCentresStatistics/centre?sort=-count&limit=5`,
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
      title: "Tên trung tâm",
      dataIndex: "centre",
      key: "centre",
      align: "center",
    },
    {
      title: "Số lượng xe đã đăng kiểm",
      dataIndex: "count",
      key: "count",
      align: "center",
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
            to={`/centres/${key}`}
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
    };
  });

  return (
    <Table
      title={() => "Những trung tâm đăng kiểm nhiều nhất"}
      bordered
      footer={() => (
        <Link
          to="/centres"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            justifyContent: "center",
          }}
        >
          <span>Xem tất cả trung tâm</span>
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

export default TopCentre;
