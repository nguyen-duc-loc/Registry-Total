import { ConfigProvider, Table, Input, Space, Button } from "antd";
import classes from "./../../../styles/Content/Inspection/InspectionsTable.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuthHeader } from "react-auth-kit";
import { DoubleRightOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const processDate = (date) => {
  const [month, day, year] = new Date(date).toLocaleDateString().split("/");
  return [day, month, year].join("/");
};

const InspectionsTable = (props) => {
  const authHeader = useAuthHeader();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space size="middle">
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="middle"
            style={{
              width: 90,
            }}
          >
            Đặt lại
          </Button>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="middle"
          >
            Tìm kiếm
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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
      ...getColumnSearchProps("inspectionNumber"),
    },
    {
      title: "Biển số xe",
      dataIndex: "numberPlate",
      key: "numberPlate",
      align: "center",
      ...getColumnSearchProps("numberPlate"),
    },
    {
      title: "Ngày đăng kiểm",
      dataIndex: "inspectionDate",
      key: "inspectionDate",
      align: "center",
      render: (text) => processDate(text),
      sorter: (a, b) => new Date(a.expiredDate) - new Date(b.expiredDate),
      sortDirections: ["descend", "ascend"],
      showSorterTooltip: false,
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiredDate",
      key: "expiredDate",
      align: "center",
      render: (text) => processDate(text),
      sorter: (a, b) => new Date(a.expiredDate) - new Date(b.expiredDate),
      sortDirections: ["descend", "ascend"],
      showSorterTooltip: false,
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
        title={() => `Tổng số xe đã đăng kiểm: ${data.length}`}
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