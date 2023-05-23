import { useState } from "react";
import ResultList from "../components/Content/Search/ResultList";
import SearchInput from "../components/Content/Search/SearchInput";

const SearchPage = () => {
  const [listData, setListData] = useState([]);
  return (
    <div style={{ textAlign: "center" }}>
      <SearchInput setListData={setListData} />
      <ResultList listData={listData} />
    </div>
  );
};

export default SearchPage;
