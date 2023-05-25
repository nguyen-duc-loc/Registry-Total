import { useState } from "react";
import ResultList from "../components/Content/Search/ResultList";
import SearchInput from "../components/Content/Search/SearchInput";

const SearchPage = () => {
  const [listData, setListData] = useState([]);
  const [searchText, setSearchText] = useState("");

  return (
    <div style={{ textAlign: "center" }}>
      <SearchInput setListData={setListData} setSearchText={setSearchText} />
      <ResultList listData={listData} searchText={searchText} />
    </div>
  );
};

export default SearchPage;
