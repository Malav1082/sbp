import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { getEmployees, deleteEmployee } from "../services/UserService";
import "../styles/background.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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

  const handleUpdate = (employee) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.userId) {
      navigate(`/home/${user.userId}/update/${employee.empId}`, { state: employee });
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
    <div className="home-container mt-5 d-flex flex-column align-items-center" style={{ marginBottom: "100px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ width: "100%" }}>
        <h1 className="text-center" style={{ marginTop: '20px', color: "#ffc107", fontSize: "2rem", marginLeft: '550px' }}>
          Employee Data
        </h1>
        <Button
          color="success"
          onClick={handleAddEmployee}
          style={{ marginLeft: 'auto', marginTop: '20px', marginRight: '110px' }}
        >
          <i className="fas fa-plus"></i>
        </Button>
      </div>
      <div className="table-container" style={{ boxShadow: "0 10px 8px rgba(0, 149, 255, 0.1)", borderRadius: "10px", overflow: "hidden", width: "100%", maxWidth: "1200px" }}>
        <Table bordered hover style={{ borderCollapse: "separate" }}>
          <thead>
            <tr style={{ textAlign: 'center' }}>
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
              <th>Actions</th>
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
                  <div className="d-flex justify-content-around">
                    <Button color="info" onClick={() => handleUpdate(employee)} style={{ marginRight: "5px" }}>
                      <i className="fas fa-pencil-alt"></i>
                    </Button>
                    <Button color="danger" onClick={() => handleDelete(employee.empId)}>
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
