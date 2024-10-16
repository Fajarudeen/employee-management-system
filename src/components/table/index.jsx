import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../css/table.css";

const EmployeeList = ({ employees, setEmployees }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
    toast.success("Employee deleted successfully");
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredEmployees = employees.filter((emp) =>{
    const searchValue = searchText.toLowerCase();
    return (
      emp.name.toLowerCase().includes(searchValue) ||
      emp.email.toLowerCase().includes(searchValue) ||
      emp.department.toLowerCase().includes(searchValue)
    );
  }
  );

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Position", selector: (row) => row.position, sortable: true },
    { name: "Department", selector: (row) => row.department, sortable: true },
    { name: "DOB", selector: (row) => row.dob },
    { name: "Email", selector: (row) => row.email },
    { name: "Phone", selector: (row) => row.phone },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link
            to={`/edit-employee/${row.id}`}
            className="btn btn-sm btn-primary"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Employee List</h2>
        <div>
          <input
            type="text"
            placeholder="Search by name"
            className="form-control"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/add-employee")}
          >
            Add Employee
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredEmployees}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        className="data-table"
      />
    </div>
  );
};

export default EmployeeList;
