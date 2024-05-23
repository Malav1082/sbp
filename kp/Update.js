import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Row,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateEmployee } from "../api/api";

const Update = () => {
  const location = useLocation();
  const user = location.state.user;

  // const [employee, setEmployee] = useState(location.state);
  const [employee, setEmployee] = useState(
    location.state.employee || {
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
      country: "",
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Update Employee";
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleGoBack = () => {
    navigate(`/home/${user.userid}`);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      user: user,
      employee: employee,
    };
    console.log("e", employee);
    const response = await updateEmployee(`/home/${user.userid}/update`, data);
    if (response.status === 200) {
      sessionStorage.setItem("update", response.data);
      navigate(`/home/${user.userid}`, { state: { refresh: true } });
    } else {
      toast.error(response.response.data);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Update Employee</h1>
      <Form method="post" onSubmit={handleUpdate}>
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
                value={employee.empId}
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
                value={employee.empName}
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
                value={employee.designation}
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
                value={employee.department}
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
                value={formatDate(employee.joinedDate)}
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
                value={employee.salary}
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
            value={employee.addr1}
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
            value={employee.addr2}
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
                value={employee.city}
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
                value={employee.state}
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
                value={employee.country}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">
          Update
        </Button>
        <Button color="danger" onClick={handleGoBack}>
          Home
        </Button>
      </Form>
    </Container>
  );
};

export default Update;
