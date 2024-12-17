import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Articles from "../pages/Article";

const SearchResults = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Ekstrak parameter pencarian dari URL
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");

    if (query) {
      setSearchTerm(query);
    }
  }, [location.search]);

  return (
    <div>
      {searchTerm && <Articles category={searchTerm} searchTerm={searchTerm} />}
    </div>
  );
};

export default SearchResults;
