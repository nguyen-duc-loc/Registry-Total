import { useState, useEffect } from "react";
import ResultList from "../components/Content/Search/ResultList";
import SearchInput from "../components/Content/Search/SearchInput";

const SearchInspection = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([
    { id: "", numberPlate: "", registrationNumber: "" },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Tra cứu đăng kiểm";
  }, []);

  return (
    <div
      style={{
        maxWidth: "60rem",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <SearchInput
        setData={setData}
        setSearchText={setSearchText}
        setLoading={setLoading}
      />
      <ResultList listData={data} searchText={searchText} loading={loading} />
    </div>
  );
};

export default SearchInspection;
