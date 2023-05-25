import { useState, useEffect } from "react";
import ResultList from "../components/Content/Search/ResultList";
import SearchInput from "../components/Content/Search/SearchInput";
import { useAuthHeader } from "react-auth-kit";
import { Skeleton } from "antd";

const SearchPage = () => {
  const [listData, setListData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([
    { id: "", numberPlate: "", modelCode: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Skeleton
      loading={isLoading}
      style={{ margin: "2rem auto", width: "60%" }}
      active
    >
      <div style={{ textAlign: "center" }}>
        <SearchInput
          setListData={setListData}
          setSearchText={setSearchText}
          data={data}
        />
        <ResultList listData={listData} searchText={searchText} />
      </div>
    </Skeleton>
  );
};

export default SearchPage;
