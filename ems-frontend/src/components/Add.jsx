import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import { addEmployee } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [employee, setEmployee] = useState({
    empId: "",
    empName: "",
    designation: "",
    department: "",
    joinedDate: "",
    salary: "",
    addr1: "",
    addr2: "",
    city: "",
    state: "",
    country: ""
  });

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const data = {
        employee: employee,
        user: JSON.parse(sessionStorage.getItem("user"))
      }
      console.log("Submitting employee data:", data); // Log the employee data
      await addEmployee(data);
      // const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && user.userid) {
        navigate(`/home/${user.userid}`);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Add Employee</h1>
      <Form method="post" onSubmit={handleAdd}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="empId">EmpID</Label>
              <Input
                type="text"
                name="empId"
                id="empId"
                placeholder="Enter EmpID"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="empName">EmpName</Label>
              <Input
                type="text"
                name="empName"
                id="empName"
                placeholder="Enter EmpName"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="designation">Designation</Label>
              <Input
                type="text"
                name="designation"
                id="designation"
                placeholder="Enter Designation"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="department">Department</Label>
              <Input
                type="text"
                name="department"
                id="department"
                placeholder="Enter Department"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="joinedDate">Joined Date</Label>
              <Input
                type="date"
                name="joinedDate"
                id="joinedDate"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="salary">Salary</Label>
              <Input
                type="text"
                name="salary"
                id="salary"
                placeholder="Enter Salary"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="addr1">AddressLine1</Label>
          <Input
            type="text"
            name="addr1"
            id="addr1"
            placeholder="Enter AddressLine1"
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="addr2">AddressLine2</Label>
          <Input
            type="text"
            name="addr2"
            id="addr2"
            placeholder="Enter AddressLine2"
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Enter City"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="state">State</Label>
              <Input
                type="text"
                name="state"
                id="state"
                placeholder="Enter State"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="country">Country</Label>
              <Input
                type="text"
                name="country"
                id="country"
                placeholder="Enter Country"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">
          Add
        </Button>
        <Button
          color="danger"
          onClick={() => {
            const user = JSON.parse(sessionStorage.getItem("user"));
            if (user && user.userid) {
              navigate(`/home/${user.userid}`);
            } else {
              navigate("/login");
            }
          }}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default Add;
