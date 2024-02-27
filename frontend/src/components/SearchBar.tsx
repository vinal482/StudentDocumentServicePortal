import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { MdSearch } from "react-icons/md";

const SearchBar = () => {
  const [search, setSearch] = React.useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search:", search);
  };

  return (
    <div className="searchBarContainer">
      <form onSubmit={()=>{handleSearchSubmit()}} className="searchInputForm">
        <input
          className="searchInput"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
