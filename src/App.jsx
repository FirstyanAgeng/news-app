import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articles from "./pages/Article";
import Save from "./components/Save";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Routes>
        <Route
          path="/programming"
          element={<Articles category="programming" searchTerm={searchTerm} />}
        />
        <Route
          path="/indonesia"
          element={<Articles category="indonesia" searchTerm={searchTerm} />}
        />
        <Route path="/save" exact element={<Save />} />
        <Route
          path="/"
          exact
          element={<Articles category="mostPopular" searchTerm={searchTerm} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
