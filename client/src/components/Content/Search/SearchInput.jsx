import { AutoComplete, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = (props) => {
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const data = props.data;

  const onSelect = (_, options) => {
    navigate(options.id);
  };

  const getPanelValue = (searchText) => {
    if (!searchText) return [];

    return data
      .filter((d) => d.numberPlate.startsWith(searchText.trim()))
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
          props.setSearchText(value);
          if (!value) props.setListData([]);
          else
            props.setListData(
              data
                .filter((d) => d.numberPlate.startsWith(value.trim()))
                .splice(0, 100)
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
