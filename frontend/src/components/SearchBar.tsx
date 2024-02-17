import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { MdSearch } from "react-icons/md";

const SearchBar = () => {
  return (
    <div className="searchBarContainer">
        <input className="searchInput" type="text" placeholder="Search"/>
    </div>
  );
};

export default SearchBar;
