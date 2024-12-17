import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articles from "./pages/Article";
import Save from "./components/Save";
import SearchResults from "./components/SearchResult";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/programming"
          element={<Articles category="programming" />}
        />
        <Route path="/indonesia" element={<Articles category="indonesia" />} />
        <Route path="/save" exact element={<Save />} />
        <Route path="/" exact element={<Articles category="mostPopular" />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
};

export default App;
