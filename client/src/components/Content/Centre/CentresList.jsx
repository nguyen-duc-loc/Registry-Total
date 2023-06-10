import { Avatar, Input, List, Row, Col, Select } from "antd";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Link } from "react-router-dom";
import image from "./../../../assets/images/centre.png";

const area1 = ["Đông Bắc Bộ", "Tây Bắc Bộ", "Đồng bằng Sông Hồng"];
const area2 = ["Bắc Trung Bộ", "Duyên hải Nam Trung Bộ", "Tây Nguyên"];
const area3 = ["Đông Nam Bộ", "Đồng bằng Sông Cửu Long"];
const map = new Map();
map.set("all", [...area1, ...area2, ...area3]);
map.set("Miền Bắc", area1);
map.set("Miền Trung", area2);
map.set("Miền Nam", area3);

const CentresList = () => {
  const [loading, setLoading] = useState(false);
  const authHeader = useAuthHeader();
  const [centres, setCentres] = useState([]);
  const [side, setSide] = useState("all");
  const [area, setArea] = useState("all");
  const [province, setProvince] = useState("all");
  const [areaOptions, setAreaOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    document.title = "Tất cả trung tâm";

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/registrationCentres?fields=id,name, ,address,area,side&limit=200`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Can not fetch.");
        }

        const res = await response.json();

        setCentres(res.data.data);
        setDataSource(res.data.data);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setAreaOptions(map.get(side));

    let url = `/api/v1/utils/provinces?side=${side}`;

    if (area != "all") {
      url += `&area=${area}`;
    }

    if (province !== "all") {
      url += `&side=${side}`;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`);

        if (!response.ok) {
          throw new Error("Can not fetch.");
        }

        const res = await response.json();

        setProvinceOptions(res.data.data.map((d) => d.province));

        let list = centres;

        console.log(list);

        if (side !== "all") list = list.filter((item) => item.side === side);

        console.log(list);

        if (area !== "all") list = list.filter((item) => item.area === area);

        console.log(list);

        if (province !== "all")
          list = list.filter((item) => item.address === province);

        console.log(list);

        setDataSource(list);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [side, area, province]);

  return (
    <div
      style={{
        maxWidth: "65rem",
        margin: "6.4rem auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row gutter={[20, 20]} style={{ marginBottom: "2.4rem" }}>
        <Col>
          <Select
            value={side}
            disabled={loading}
            onChange={(value) => {
              setSide(value);
              setArea("all");
              setProvince("all");
            }}
            style={{
              width: 120,
            }}
            listHeight={200}
            options={[
              {
                value: "all",
                label: "Miền",
              },
              {
                value: "Miền Bắc",
                label: "Miền Bắc",
              },
              {
                value: "Miền Trung",
                label: "Miền Trung",
              },
              {
                value: "Miền Nam",
                label: "Miền Nam",
              },
            ]}
          />
        </Col>
        <Col>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            value={area}
            disabled={side === "all"}
            onChange={(value) => {
              setArea(value);
              setProvince("all");
            }}
            style={{
              width: 200,
            }}
            listHeight={200}
            options={[
              {
                value: "all",
                label: "Khu vực",
              },
              ...areaOptions.map((area) => {
                return { value: area, label: area };
              }),
            ]}
          />
        </Col>
        <Col>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            value={province}
            disabled={side === "all"}
            onChange={(value) => {
              setProvince(value);
            }}
            style={{
              width: 200,
            }}
            listHeight={200}
            options={[
              {
                value: "all",
                label: "Tỉnh/Thành phố",
              },
              ...provinceOptions.map((province) => {
                return { value: province, label: province };
              }),
            ]}
          />
        </Col>
      </Row>
      <List
        pagination={{ align: "center" }}
        loading={loading}
        dataSource={dataSource}
        style={{
          backgroundColor: "var(--color-white)",
          borderRadius: "6px",
          padding: "1.2rem 2rem",
        }}
        renderItem={(item) => (
          <List.Item
            actions={[<Link to={`/centres/${item.id}`}>Xem chi tiết</Link>]}
          >
            <List.Item.Meta
              avatar={<Avatar src={image} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={`#${item.address}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
export default CentresList;
