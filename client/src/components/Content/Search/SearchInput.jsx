import { AutoComplete, Input } from "antd";
import { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const SearchInput = (props) => {
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const authHeader = useAuthHeader();
  const searchCar = props.search === "car";

  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onSelect = (_, options) => {
    navigate(`/${searchCar ? "cars" : "inspections"}/${options.id}`);
  };

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      await timeout(300);

      if (!isCancelled) {
        if (text.length === 0) {
          setOptions([]);
        } else {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_BASE_URL}/api/v1/${
                searchCar ? "cars" : "inspections"
              }/?fields=${
                searchCar
                  ? "numberPlate,registrationNumber"
                  : "_id,inspectionNumber"
              }&limit=100000&${
                searchCar ? "numberPlate" : "inspectionNumber"
              }[regex]=^${text}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: authHeader(),
                },
              }
            );

            const res = await response.json();

            setOptions(
              res.data.data
                .map((d) => {
                  return {
                    label: searchCar ? d.numberPlate : d.inspectionNumber,
                    value: searchCar ? d.numberPlate : d.inspectionNumber,
                    id: searchCar ? d.id : d._id,
                  };
                })
                .slice(0, 5)
            );
          } catch (err) {
            if (import.meta.env.VITE_ENV === "development") console.error(err);
          }
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [text]);

  return (
    <AutoComplete
      style={{ width: "100%", marginTop: "3rem" }}
      options={options}
      onSelect={onSelect}
      onChange={(value) => setText(value.trim())}
    >
      <Input.Search
        size="large"
        placeholder={`Nhập ${
          props.search === "car" ? "biển số xe" : "số đăng kiểm"
        }`}
        onSearch={async () => {
          props.setSearchText(text);

          if (!text) return;

          try {
            props.setLoading(true);
            const response = await fetch(
              `${import.meta.env.VITE_BASE_URL}/api/v1/${
                searchCar ? "cars" : "inspections"
              }/?fields=${
                searchCar
                  ? "numberPlate,registrationNumber"
                  : "_id,inspectionNumber"
              }&limit=100000&${
                searchCar ? "numberPlate" : "inspectionNumber"
              }[regex]=^${text}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: authHeader(),
                },
              }
            );
            const res = await response.json();
            props.setData(res.data.data);
            props.setLoading(false);
          } catch (err) {
            if (import.meta.env.VITE_ENV === "development") console.error(err);
          }
        }}
        enterButton
        allowClear
        style={{ maxWidth: "100%" }}
      />
    </AutoComplete>
  );
};

export default SearchInput;
