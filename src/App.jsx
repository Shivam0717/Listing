import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrudDataTable from "./Pages/Table";
import Navbar from "./Components/Navbar";
import CrudDataTabletwo from "./Pages/Tabletwo";
import Tabletwo from "./Pages/Tabletwo";
import Tablethree from "./Pages/Tablethree";
import Tablefour from "./Pages/Tablefour";
import { useEffect } from "react";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CrudDataTable />} />
        <Route path="/two" element={<Tabletwo />} />
        <Route path="/three" element={<Tablethree />} />
        <Route path="/four" element={<Tablefour />} />




    
      </Routes>
    </Router>
  );
}

export default App;
