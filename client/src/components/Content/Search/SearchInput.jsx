import { AutoComplete, Input } from "antd";
import { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const SearchInput = (props) => {
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const authHeader = useAuthHeader();

  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onSelect = (_, options) => {
    navigate(options.id);
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
              `${
                import.meta.env.VITE_BASE_URL
              }/api/v1/cars/?fields=numberPlate,registrationNumber&limit=100000&numberPlate[regex]=^${text}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: authHeader(),
                },
              }
            );
            const res = await response.json();
            console.log(res.data.data);
            setOptions(
              res.data.data
                .map((d) => {
                  return {
                    label: d.numberPlate,
                    value: d.numberPlate,
                    id: d.id,
                  };
                })
                .slice(0, 5)
            );
          } catch (err) {
            console.error(err);
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
      style={{ width: "50rem", marginTop: "3rem" }}
      options={options}
      onSelect={onSelect}
      onChange={(value) => setText(value.trim())}
    >
      <Input.Search
        size="large"
        placeholder="Nhập biển số xe"
        onSearch={async () => {
          props.setSearchText(text);
          try {
            props.setLoading(true);
            const response = await fetch(
              `${
                import.meta.env.VITE_BASE_URL
              }/api/v1/cars/?fields=numberPlate,registrationNumber&limit=100000&numberPlate[regex]=^${text}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: authHeader(),
                },
              }
            );
            const res = await response.json();
            console.log(res.data.data);
            props.setData(res.data.data);
            props.setLoading(false);
          } catch (err) {
            console.error(err);
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
