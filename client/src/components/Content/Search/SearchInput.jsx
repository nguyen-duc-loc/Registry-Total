import { AutoComplete, Input } from "antd";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const SearchInput = (props) => {
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([
    { id: "", numberPlate: "", modelCode: "" },
  ]);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sleepy-coast-93816.herokuapp.com/api/v1/cars/?limit=10000&fields=numberPlate, modelCode`,
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
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const onSelect = (_, options) => {
    navigate(options.id);
  };

  const getPanelValue = (searchText) => {
    if (!searchText) return [];

    return data
      .filter((d) => d.numberPlate.startsWith(searchText))
      .map((d) => {
        return { label: d.numberPlate, value: d.numberPlate, id: d.id };
      })
      .slice(0, 5);
  };

  return (
    <AutoComplete
      style={{ width: "50rem", marginTop: "3rem" }}
      options={options}
      onSelect={onSelect}
      onChange={(text) => setOptions(getPanelValue(text))}
    >
      <Input.Search
        size="large"
        placeholder="Nhập biển số xe"
        onSearch={(value) => {
          if (!value) props.setListData([]);
          else
            props.setListData(
              data.filter((d) => d.numberPlate.startsWith(value)).splice(0, 100)
            );
        }}
        enterButton
        allowClear
        style={{ maxWidth: "100%" }}
      />
    </AutoComplete>
  );
};

export default SearchInput;
