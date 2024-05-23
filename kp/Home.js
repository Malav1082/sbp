import React, { useEffect, useState } from "react";
import { Button, CloseButton, Container, Table } from "reactstrap";
import { deleteEmployee, getAllEmployees } from "../api/api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";
const Home = () => {
  const [employees, setEmployees] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    document.title = "Home";
    getAllEmployees(`/home`, setEmployees);
    setEmployees(JSON.parse(sessionStorage.getItem("emp")));
    const addMessage = sessionStorage.getItem("add");
    if (addMessage != null) {
      toast.success(addMessage);
      sessionStorage.removeItem("add");
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    const response = await deleteEmployee(`/home/${user.userid}/delete/${id}`);
    if (response.status === 200) {
      sessionStorage.setItem("add", response.data);
      navigate(`/home/${user.userid}`, { state: { refresh: true } });
    } else {
      toast.error(response.response);
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Employee Data</h1>
        <Button
          color="primary"
          onClick={() => {
            navigate(
              `/home/${JSON.parse(sessionStorage.getItem("user")).userid}/add`
            );
          }}
          // style={{ borderRadius: "50%" }}
          className="op-btn"
          id="add-btn"
        >
          <img src="/images/plus.svg" alt="" />
        </Button>
      </div>
      <div className="table-responsive">
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
              <th></th>
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
                  <td>
                    {new Date(employee.joinedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td>{employee.salary}</td>
                  <td>{employee.addr1}</td>
                  <td>{employee.addr2}</td>
                  <td>{employee.city}</td>
                  <td>{employee.state}</td>
                  <td>{employee.country}</td>
                  <td className="d-flex justify-content-center align-items-center">
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => {
                        navigate(
                          `/home/${user.userid}/update/${employee.empId}`,
                          {
                            state: {
                              employee,
                              user,
                            },
                          }
                        );
                      }}
                      className="me-2 op-btn ud-btn"
                      style={{ width: "40px", height: "30px" }}
                    >
                      <img src="/images/pencil.svg" alt="" />
                    </Button>
                    <Button
                      onClick={(e) => handleDelete(employee.empId)}
                      className="op-btn ud-btn"
                      id="del-btn"
                    >
                      <img src="/images/x.svg" alt="" />
                    </Button>
                  </td>
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
      </div>
    </Container>
  );
};

export default Home;
