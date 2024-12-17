import React, { useState } from "react";
import { Menu, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Navigate to search results page with search term
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Menu
      mode="horizontal"
      style={{ lineHeight: "64px", display: "flex", alignItems: "center" }}
    >
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="programming">
        <Link to="/programming">Programming</Link>
      </Menu.Item>
      <Menu.Item key="indonesia">
        <Link to="/indonesia">Indonesia</Link>
      </Menu.Item>
      <Menu.Item key="mostPopular">
        <Link to="/mostPopular">Most Popular</Link>
      </Menu.Item>
      <Menu.Item key="save">
        <Link to="/save">Saved</Link>
      </Menu.Item>
      <Menu.Item
        key="search"
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            width: 200,
            marginRight: 10,
          }}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
