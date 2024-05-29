import React, { useEffect, useState } from "react";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "./services/UserService";

const EmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortField, setSortField] = useState("empName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, [page, size, sortField, sortDirection, search]);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees(page, size, sortField, sortDirection, search);
      setEmployees(data.content);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <div>
      {/* Your component JSX goes here */}
    </div>
  );
};

export default EmployeeComponent;
