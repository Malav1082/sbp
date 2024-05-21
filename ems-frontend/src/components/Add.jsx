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
import { addEmployee } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Add = () => {
  const [employee, setEmployee] = useState();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Employee";
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleGoBack = () => {
    window.history.back();
    navigate(`/home/${user.userid}`);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = {
      user: user,
      employee: employee,
    };
    console.log("e", employee);
    const response = await addEmployee(`/home/${user.userid}/add`, data);
    if (response.status === 201) {
      sessionStorage.setItem("add", response.data);
      navigate(`/home/${user.userid}`);
    } else {
      toast.error(response.response.data);
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
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">
          Add
        </Button>
        <Button color="danger" onClick={handleGoBack}>
          Home
        </Button>
      </Form>
    </Container>
  );
};

export default Add;
