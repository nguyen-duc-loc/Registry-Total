import { useState, useEffect } from "react";
import ResultList from "../components/Content/Search/ResultList";
import SearchInput from "../components/Content/Search/SearchInput";
import { useAuthHeader } from "react-auth-kit";
import { Skeleton } from "antd";

const SearchPage = () => {
  const [listData, setListData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([
    { id: "", numberPlate: "", registrationNumber: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const authHeader = useAuthHeader();

  useEffect(() => {
    document.title = "Tra cứu phương tiện";

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/cars/?fields=numberPlate,registrationNumber&limit=100000`,
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
