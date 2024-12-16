import React from "react";
import { Menu, Input } from "antd";
import { Link } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Menu mode="horizontal" style={{ lineHeight: "64px" }}>
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="programming">
        <Link to="/programming">Programming</Link>
      </Menu.Item>
      <Menu.Item key="indonesia">
        <Link to="/indonesia">Indonesia</Link>
      </Menu.Item>
      <Menu.Item key="save">
        <Link to="/save">Saved</Link>
      </Menu.Item>
      <Menu.Item key="search" style={{ float: "right" }}>
        <Input
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200, borderRadius: "4px" }}
        />
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
