import { useState, useEffect } from "react";
import ResultList from "../components/Content/Search/ResultList";
import SearchInput from "../components/Content/Search/SearchInput";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([
    { id: "", numberPlate: "", registrationNumber: "" },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Tra cứu phương tiện";
  }, []);

  return (
    <div
      style={{
        width: "50rem",
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

export default SearchPage;
