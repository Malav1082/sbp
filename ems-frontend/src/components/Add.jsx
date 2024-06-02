import React from "react";
import { Button, Container, Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import { addEmployee } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/background.css";

const Add = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const data = {
        employee: values,
        user: JSON.parse(sessionStorage.getItem("user"))
      };
      console.log("Submitting employee data:", data);
      await addEmployee(data);
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && user.userId) {
        navigate(`/home/${user.userId}`);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      if (error.response && error.response.data) {
        setErrors({ empId: error.response.data });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const validationSchema = Yup.object().shape({
    empId: Yup.string().required("EmpID is required"),
    empName: Yup.string()
      .required("EmpName is required")
      .matches(/^[A-Za-z\s]+$/, "EmpName can only contain letters and spaces"),
    designation: Yup.string()
      .required("Designation is required")
      .matches(/^[A-Za-z\s]+$/, "Designation can only contain letters and spaces"),
    department: Yup.string()
      .required("Department is required")
      .matches(/^[A-Za-z\s]+$/, "Department can only contain letters and spaces"),
    joinedDate: Yup.date().required("Joined Date is required"),
    salary: Yup.number()
      .typeError("Salary must be a number")
      .required("Salary is required"),
    addr1: Yup.string().required("AddressLine1 is required"),
    addr2: Yup.string().required("AddressLine2 is required"),
    city: Yup.string()
      .required("City is required")
      .matches(/^[A-Za-z\s]+$/, "City can only contain letters and spaces"),
    state: Yup.string()
      .required("State is required")
      .matches(/^[A-Za-z\s]+$/, "State can only contain letters and spaces"),
    country: Yup.string()
      .required("Country is required")
      .matches(/^[A-Za-z\s]+$/, "Country can only contain letters and spaces")
  });

  const getInputClass = (touched, error) => {
    if (touched && !error) {
      return "is-valid";
    } else if (touched && error) {
      return "is-invalid";
    }
    return "";
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 add-update">Add Employee</h1>
      <Formik
        initialValues={{
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
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit, handleChange, values, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="empId" className="add-update">EmpID</Label>
                  <Input
                    type="text"
                    name="empId"
                    id="empId"
                    placeholder="Enter EmpID"
                    value={values.empId}
                    onChange={handleChange}
                    className={`add-update-input ${getInputClass(touched.empId, errors.empId)}`}
                  />
                  <ErrorMessage name="empId" component="div" className="text-danger" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="empName" className='add-update'>EmpName</Label>
                  <Input
                    type="text"
                    name="empName"
                    id="empName"
                    placeholder="Enter EmpName"
                    value={values.empName}
                    onChange={handleChange}
                    className={`add-update-input ${getInputClass(touched.empName, errors.empName)}`}
                  />
                  <ErrorMessage name="empName" component="div" className="text-danger" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="designation" className='add-update'>Designation</Label>
                  <Input
                    type="text"
                    name="designation"
                    id="designation"
                    placeholder="Enter Designation"
                    value={values.designation}
                    onChange={handleChange}
                    className={`add-update-input ${getInputClass(touched.designation, errors.designation)}`}
                  />
                  <ErrorMessage name="designation" component="div" className="text-danger" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="department" className='add-update'>Department</Label>
                  <Input
                    type="text"
                    name="department"
                    id="department"
                    placeholder="Enter Department"
                    value={values.department}
                    onChange={handleChange}
                    className={`add-update-input ${getInputClass(touched.department, errors.department)}`}
                  />
                  <ErrorMessage name="department" component="div" className="text-danger" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="joinedDate" className='add-update'>Joined Date</Label>
                  <Input
                    type="date"
                    name="joinedDate"
                    id="joinedDate"
                    value={values.joinedDate}
                    onChange={handleChange}
                    onFocus={(e) => { e.target.blur(); }} // Blur the field immediately when focused
                    max={currentDate} // Set the maximum allowed date to the current date
                    className={`add-update-input ${getInputClass(touched.joinedDate, errors.joinedDate)}`}
                  />
                  <ErrorMessage name="joinedDate" component="div" className="text-danger" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="salary" className='add-update'>Salary</Label>
                  <Input
                    type="number"
                    name="salary"
                    id="salary"
                    placeholder="Enter Salary"
                    value={values.salary}
                    onChange={handleChange}
                    className={`add-update-input ${getInputClass(touched.salary, errors.salary)}`}
                  />
                  <ErrorMessage name="salary" component="div" className="text-danger" />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="addr1" className='add-update'>AddressLine1</Label>
              <Input
                type="text"
                name="addr1"
                id="addr1"
                placeholder="Enter AddressLine1"
                value={values.addr1}
                onChange={handleChange}
                className={`add-update-input ${getInputClass(touched.addr1, errors.addr1)}`}
              />
              <ErrorMessage name="addr1" component="div" className="text-danger" />
            </FormGroup>
            <FormGroup>
              <Label for="addr2" className='add-update'>AddressLine2</Label>
              <Input
                type="text"
                name="addr2"
                id="addr2"
                placeholder="Enter AddressLine2"
                value={values.addr2}
                onChange={handleChange}
                className={`add-update-input ${getInputClass(touched.addr2, errors.addr2)}`}
              />
              <ErrorMessage name="addr2" component="div" className="text-danger" />
            </FormGroup>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="city" className='add-update'>City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter City"
                    value={values.city}
                    onChange={handleChange}
                    className={`add-update-input ${getInputClass(touched.city, errors.city)}`}
                  />
                  <ErrorMessage name="city" component="div" className="text-danger" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="state" className='add-update'>State</Label>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Enter State"
                    value={values.state}
                    onChange={handleChange}
                    className={`add-update-input ${getInputClass(touched.state, errors.state)}`}
                  />
                  <ErrorMessage name="state" component="div" className="text-danger" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="country" className='add-update'>Country</Label>
                  <Input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Enter Country"
                    value={values.country}
                    onChange={handleChange}
                    className={`add-update-input ${getInputClass(touched.country, errors.country)}`}
                  />
                  <ErrorMessage name="country" component="div" className="text-danger" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="submit" color="primary" disabled={isSubmitting} style={{ marginBottom: '60px' }}>
                  Add
                </Button>
                <Button color="danger" onClick={handleGoBack} style={{ marginBottom: '60px', marginLeft: '10px' }}>
                  Back
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Add;
