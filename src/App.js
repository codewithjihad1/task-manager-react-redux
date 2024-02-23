import "./assets/styles/main.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import Edit from "./pages/Edit";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}
