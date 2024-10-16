import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EmployeeList from "./components/table";
import AddEditEmployee from "./components/form";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
      department: "Engineering",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      dob: "1990-01-10",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Product Manager",
      department: "Product",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      dob: "1985-05-15",
    },
    {
      id: 3,
      name: "Sarah Connor",
      position: "HR Manager",
      department: "Human Resources",
      email: "sarah.connor@example.com",
      phone: "555-123-4567",
      dob: "1992-12-01",
    },
    {
      id: 4,
      name: "Michael Jordan",
      position: "Sales Executive",
      department: "Sales",
      email: "michael.jordan@example.com",
      phone: "555-987-6543",
      dob: "1988-09-22",
    },
  ]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList employees={employees} setEmployees={setEmployees} />} />
        <Route path="/add-employee" element={<AddEditEmployee employees={employees} setEmployees={setEmployees} />} />
        <Route path="/edit-employee/:id" element={<AddEditEmployee employees={employees} setEmployees={setEmployees} />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
