import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import { getAllEmployees } from "../services/api";
import { toast } from "react-toastify";
const Home = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    document.title = "Home";
    getAllEmployees(`/home`);
    setEmployees(JSON.parse(sessionStorage.getItem("emp")));
    const addMessage = sessionStorage.getItem("add");
    if (addMessage != null) {
      toast.success(addMessage);
      sessionStorage.removeItem("add");
    }
  }, []);

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Employee Data</h1>
        <Button
          color="primary"
          onClick={() =>
            (window.location.href = `/home/${
              JSON.parse(sessionStorage.getItem("user")).userid
            }/add`)
          }
          style={{ borderRadius: "50%" }}
        >
          +{" "}
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
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
          </tr>
        </thead>
        <tbody>
          {employees && employees.length > 0 ? (
            employees.map((employee) => (
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={11} className="text-center">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
