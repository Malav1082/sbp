import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Table } from "reactstrap";
// import { getEmployees } from "../services/UserService";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home";

    // const fetchEmployees = async () => {
    //   try {
    //     const data = await getEmployees();
    //     setEmployees(data);
    //   } catch (error) {
    //     console.error("Error fetching employees:", error);
    //   }
    // };

    // fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      navigate(`/home/${user}/add`);
    } else {
      navigate("/login");
    }
  };

  const handleUpdate = (employeeId) => {
    console.log("Update employee with ID:", employeeId);
  };

  const handleDelete = (employeeId) => {
    console.log("Delete employee with ID:", employeeId);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button color="danger" onClick={handleLogout}>Logout</Button>
        <h1 className="text-center" style={{ color: "#007bff", fontSize: "2rem" }}>Employee Data</h1>
        <Button
          color="success"
          onClick={handleAddEmployee}
          style={{ borderRadius: "50%", fontSize: "1.5rem" }}
        >
          Add
        </Button>
      </div>
      <Table borderless hover>
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <th>EmpID</th>
            <th>EmpName</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Joined Date</th>
            <th>Salary</th>
            <th>AddressLine1</th>
            <th>AddressLine2</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.empId}>
              <td>{employee.empId}</td>
              <td>{employee.empName}</td>
              <td>{employee.designation}</td>
              <td>{employee.department}</td>
              <td>{employee.joinedDate}</td>
              <td>{employee.salary}</td>
              <td>{employee.addr1}</td>
              <td>{employee.addr2}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.country}</td>
              <td>
                <Button color="info" onClick={() => handleUpdate(employee.empId)}>Update</Button>{' '}
                <Button color="danger" onClick={() => handleDelete(employee.empId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
