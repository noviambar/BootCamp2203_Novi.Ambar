import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Employee from "./components/Employee";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Employee" element={<Employee />} />
        <Route exact path="/Detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
