import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Alert, Row, Col } from "reactstrap";
import { postApi } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
  }, []);

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("User Name is required"),
    mobileNumber: Yup.string()
      .required("Mobile number is required")
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
        "Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, one special character, and one number"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      setRegistering(true);
      const response = await postApi("/register", values, "Registration Successful!", "Registration Failed");
      if (response && response.status === 200) {
        setSubmitting(false);
        setRegisterSuccess(true);
        setTimeout(() => {
          setRegisterSuccess(false);
          navigate("/login");
        }, 2000);
      } else {
        setErrors({ password: "Registration Failed" });
        setSubmitting(false);
        setRegistering(false);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setErrors({ password: "Error occurred during registration" });
      setSubmitting(false);
      setRegistering(false);
    }
  };

  return (
    <Container style={{ width: '30%', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginTop: '3%' }}>
      <h2 className="mt-4 mb-4" style={{ textAlign: 'center', color: '#ffd400' }}>Register</h2>
      {registerSuccess && (
        <Alert color="success">
          Registration Successful!
        </Alert>
      )}
      <Formik
        initialValues={{ name: "", email: "", mobileNumber: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name" className="login-register-reset-forgot">User Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={values.name}
                invalid={errors.name && touched.name}
              />
              <ErrorMessage name="name" component="div" className="text-danger" style={{ marginTop: '0.25rem' }} />
            </FormGroup>
            <FormGroup>
              <Label for="mobileNumber" className="login-register-reset-forgot">Mobile Number:</Label>
              <Input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                onChange={handleChange}
                value={values.mobileNumber}
                invalid={errors.mobileNumber && touched.mobileNumber}
              />
              <ErrorMessage name="mobileNumber" component="div" className="text-danger" style={{ marginTop: '0.25rem' }} />
            </FormGroup>
            <FormGroup>
              <Label for="password" className="login-register-reset-forgot">Password:</Label>
              <div className="password-input-container">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  invalid={errors.password && touched.password}
                  style={{ position: 'relative' }}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <ErrorMessage name="password" component="div" className="text-danger" style={{ marginTop: '0.25rem' }} />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword" className="login-register-reset-forgot">Confirm Password:</Label>
              <div className="password-input-container">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  invalid={errors.confirmPassword && touched.confirmPassword}
                  style={{ position: 'relative' }}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" style={{ marginTop: '0.25rem' }} />
            </FormGroup>
            <Row className="mt-3">
              <Col md={6}>
                <Button type="submit" color="primary" className="w-100 mb-2" style={{ fontSize: '0.9rem' }} disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </Col>
              <Col md={6}>
                <Button color="secondary" outline className="w-100" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      {registering && (
        <div className="text-center mt-3">
          <span className="text-muted">Registering...</span>
        </div>
      )}
    </Container>
  );
};

export default Register;
