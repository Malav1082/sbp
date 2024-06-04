import React, { useState, useEffect } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Col, Row, Alert } from "reactstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateEmployee } from "../services/UserService";
import { toast } from "react-toastify";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/background.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const Update = () => {
  const { userId, empId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const employee = location.state;

  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState({});
  const [employeeData, setEmployeeData] = useState({
    ...employee,
    joinedDate: formatDate(employee.joinedDate),
  });

  useEffect(() => {
    document.title = "Update Employee";

    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      toast.error("User not found in session storage");
      navigate("/login");
    }
  }, [navigate]);

  const handleUpdate = async (values, { setSubmitting }) => {
    const data = {
      employee: values,
      user: JSON.parse(sessionStorage.getItem("user")),
    };
    try {
      const response = await updateEmployee(empId, data);
      if (response && response.status === 200) {
        sessionStorage.setItem("update", JSON.stringify(response.data));
        setSuccessMessage("Employee updated successfully!");
        setTimeout(() => navigate(`/home/${user.userId}`, { state: { refresh: true } }), 2000);
      } else {
        toast.error(response?.data || "Unknown error");
      }
    } catch (error) {
      toast.error("Error updating employee!");
      console.error("Update error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const validationSchema = Yup.object().shape({
    empId: Yup.string().required("EmpID is required"),
    empName: Yup.string()
      .required("EmpName is required")
      .matches(/^[A-Za-z\s]+$/, "EmpName can only contain letters and spaces"),
    designation: Yup.string()
      .required("Designation is required")
      .matches(
        /^[A-Za-z\s]+$/,
        "Designation can only contain letters and spaces"
      ),
    department: Yup.string()
      .required("Department is required")
      .matches(
        /^[A-Za-z\s]+$/,
        "Department can only contain letters and spaces"
      ),
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
      .matches(/^[A-Za-z\s]+$/, "Country can only contain letters and spaces"),
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
      <h1 className="text-center mb-4 add-update">Update Employee</h1>
      {successMessage && <Alert color="success">{successMessage}</Alert>}
      <Formik
        initialValues={employeeData}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
      >
        {({
          isSubmitting,
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="empId" className="add-update">
                    EmpID
                  </Label>
                  <Input
                    type="text"
                    name="empId"
                    id="empId"
                    placeholder="Enter EmpID"
                    onChange={handleChange}
                    value={values.empId}
                    disabled // Prevent editing of empId
                    className={getInputClass(touched.empId, errors.empId)}
                  />
                  <ErrorMessage
                    name="empId"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="empName" className="add-update">
                    EmpName
                  </Label>
                  <Input
                    type="text"
                    name="empName"
                    id="empName"
                    placeholder="Enter EmpName"
                    onChange={handleChange}
                    value={values.empName}
                    className={getInputClass(touched.empName, errors.empName)}
                  />
                  <ErrorMessage
                    name="empName"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="designation" className="add-update">
                    Designation
                  </Label>
                  <Input
                    type="text"
                    name="designation"
                    id="designation"
                    placeholder="Enter Designation"
                    onChange={handleChange}
                    value={values.designation}
                    className={getInputClass(
                      touched.designation,
                      errors.designation
                    )}
                  />
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="department" className="add-update">
                    Department
                  </Label>
                  <Input
                    type="text"
                    name="department"
                    id="department"
                    placeholder="Enter Department"
                    onChange={handleChange}
                    value={values.department}
                    className={getInputClass(
                      touched.department,
                      errors.department
                    )}
                  />
                  <ErrorMessage
                    name="department"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="joinedDate" className="add-update">
                    Joined Date
                  </Label>
                  <Input
                    type="date"
                    name="joinedDate"
                    id="joinedDate"
                    onChange={handleChange}
                    value={values.joinedDate}
                    className={getInputClass(
                      touched.joinedDate,
                      errors.joinedDate
                    )}
                  />
                  <ErrorMessage
                    name="joinedDate"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="salary" className="add-update">
                    Salary
                  </Label>
                  <Input
                    type="number"
                    name="salary"
                    id="salary"
                    placeholder="Enter Salary"
                    onChange={handleChange}
                    value={values.salary}
                    className={getInputClass(touched.salary, errors.salary)}
                  />
                  <ErrorMessage
                    name="salary"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="addr1" className="add-update">AddressLine1</Label>
                  <Input
                    type="text"
                    name="addr1"
                    id="addr1"
                    placeholder="Enter AddressLine1"
                    onChange={handleChange}
                    value={values.addr1}
                    className={getInputClass(touched.addr1, errors.addr1)}
                  />
                  <ErrorMessage name="addr1" component="div" className="text-danger" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="addr2" className="add-update">AddressLine2</Label>
                  <Input
                    type="text"
                    name="addr2"
                    id="addr2"
                    placeholder="Enter AddressLine2"
                    onChange={handleChange}
                    value={values.addr2}
                    className={getInputClass(touched.addr2, errors.addr2)}
                  />
                  <ErrorMessage name="addr2" component="div" className="text-danger" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="city" className="add-update">
                    City
                  </Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter City"
                    onChange={handleChange}
                    value={values.city}
                    className={getInputClass(touched.city, errors.city)}
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="state" className="add-update">
                    State
                  </Label>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Enter State"
                    onChange={handleChange}
                    value={values.state}
                    className={getInputClass(touched.state, errors.state)}
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="country" className="add-update">
                    Country
                  </Label>
                  <Input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Enter Country"
                    onChange={handleChange}
                    value={values.country}
                    className={getInputClass(touched.country, errors.country)}
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit" disabled={isSubmitting} style={{ marginBottom: '60px' }}>
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
            <Button
              color="danger"
              onClick={handleGoBack}
              style={{ marginBottom: "60px", marginLeft: "10px" }}
            >
              Back
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Update;
