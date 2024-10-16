import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/form.css";
import { toast } from "react-toastify";

const positions = ['Software Engineer', 'Product Manager', 'HR Manager', 'Sales Executive'];
const departments = ['Engineering', 'Product', 'Human Resources', 'Sales'];

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  dob: z.string(),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  phone: z.string(),
});

const InputField = ({ label, id, type, register, error }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className={`form-control ${error ? "is-invalid" : ""}`}
      {...register(id)}
    />
    {error && <div className="invalid-feedback">{error.message}</div>}
  </div>
);

const SelectField = ({ label, id, options, register, error }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <select id={id} className={`form-select ${error ? "is-invalid" : ""}`} {...register(id)}>
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
    {error && <div className="invalid-feedback">{error.message}</div>}
  </div>
);

const EmployeeForm = ({ onSubmit, register, errors, reset }) => (
  <form onSubmit={onSubmit}>
    <InputField label="Name" id="name" type="text" register={register} error={errors.name} />
    <SelectField label="Position" id="position" options={positions} register={register} error={errors.position} />
    <SelectField label="Department" id="department" options={departments} register={register} error={errors.department} />
    <InputField label="Date of Birth" id="dob" type="date" register={register} error={errors.dob} />
    <InputField label="Email" id="email" type="email" register={register} error={errors.email} />
    <InputField label="Phone Number" id="phone" type="text" register={register} error={errors.phone} />

    <div className="d-flex justify-content-between">
      <button type="submit" className="btn btn-primary">Submit</button>
      <button type="button" className="btn btn-secondary" onClick={reset}>Reset</button>
    </div>
  </form>
);

const AddEditEmployee = ({ employees, setEmployees }) => {
  const { id } = useParams();
  const employeeToEdit = employees.find((emp) => emp.id === parseInt(id));
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: employeeToEdit?.name || "",
      position: employeeToEdit?.position || "",
      department: employeeToEdit?.department || "",
      dob: employeeToEdit?.dob || "",
      email: employeeToEdit?.email || "",
      phone: employeeToEdit?.phone || "",
    },
  });

  const onSubmit = (data) => {
    if (employeeToEdit) {
      setEmployees((prev) => prev.map((emp) => (emp.id === employeeToEdit.id ? { ...emp, ...data } : emp)));
      toast.success("Employee updated successfully");
      
    } else {
      const newEmployee = { id: Date.now(), ...data };
      setEmployees((prev) => [...prev, newEmployee]);
      toast.success("Employee added successfully");
    }

    reset();
    navigate('/');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Add Employee</h3>
        <EmployeeForm onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} reset={reset} />
      </div>
    </div>
  );
};

export default AddEditEmployee;
