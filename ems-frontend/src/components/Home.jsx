import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Table } from "reactstrap";
import { getEmployees, deleteEmployee } from "../services/UserService";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home";
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user.userId) {
      navigate(`/home/${user.userId}/add`);
    } else {
      navigate("/login");
    }
  };

  const handleUpdate = (empId) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.userId) {
      navigate(`/home/${user.userId}/update/${empId}`);
    } else {
      navigate("/login");
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      setEmployees(employees.filter((employee) => employee.empId !== employeeId));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button color="danger" onClick={handleLogout}>
          Logout
        </Button>
        <h1 className="text-center" style={{ color: "#007bff", fontSize: "2rem" }}>
          Employee Data
        </h1>
        <Button
          color="success"
          onClick={handleAddEmployee}
          // style={{ borderRadius: "50%", fontSize: "1.5rem" }}
        >
          Add
        </Button>
      </div>
      <Table bordered hover>
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <th>EmpID</th>
            <th>EmpName</th>
            <th>Designation</th>
            <th>Department</th>
            <th>JoinedDate</th>
            <th>Salary</th>
            <th>AddressLine1</th>
            <th>AddressLine2</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.empId} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#fff" }}>
              <td>{employee.empId}</td>
              <td>{employee.empName}</td>
              <td>{employee.designation}</td>
              <td>{employee.department}</td>
              <td>
                {new Date(employee.joinedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </td>
              <td>{employee.salary}</td>
              <td>{employee.addr1}</td>
              <td>{employee.addr2}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.country}</td>
              <td>
                <Button color="info" onClick={() => handleUpdate(employee.empId)}>
                  Update
                </Button>
              </td>
              <td>
                <Button color="danger" onClick={() => handleDelete(employee.empId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
