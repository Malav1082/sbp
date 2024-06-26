import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Alert, Row, Col } from "reactstrap";
import { postApi } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const [loginSuccess, setLoginSuccess] = useState(false); // State for login success message
  const [loggingIn, setLoggingIn] = useState(false); // State for displaying "Logging in..." message
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("User Name is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      setLoggingIn(true); // Display "Logging in..." message
      const response = await postApi("/login", values, "Login Successful!", "Invalid Credentials");
      console.log(response)
      if (response && response.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(response.data[1]));
        localStorage.setItem("token", response.data[2]);
        console.log('Token stored:', localStorage.getItem('token'));

        setSubmitting(false);
        console.log(response.data)
        console.log(response.data[1].userId);
        setLoginSuccess(true); // Set login success state to true
        setTimeout(() => {
          setLoginSuccess(false); // Reset login success state after 2 seconds
          navigate(`/welcome/${response.data[1].userId}`);
        }, 2000);
      } else {
        setErrors({ password: "Invalid User Name or Password" });
        setSubmitting(false);
        setLoggingIn(false); // Hide "Logging in..." message
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrors({ password: "Error occurred during login" });
      setSubmitting(false);
      setLoggingIn(false); // Hide "Logging in..." message
    }
  };

  return (
    <Container style={{ width: '30%', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginTop: '7%' }}>
      <h2 className="mt-4 mb-4" style={{ textAlign: 'center', color: 'white'}}>Login</h2>
      {loginSuccess && (
        <Alert color="success">
          Login Successful!
        </Alert>
      )}
      <Formik
        initialValues={{ name: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
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
            <Row className="mt-3">
              <Col md={6}>
                <Button type="submit" color="primary" className="w-100 mb-2" style={{ fontSize: '0.9rem' }} disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Col>
              <Col md={6}>
                <Button color="secondary" outline className="w-100" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      <Row className="mt-3">
        <Col md={6}>
          <Button color="info" outline className="w-100" onClick={() => navigate("/reset-password")}>
            Reset Password
          </Button>
        </Col>
        <Col md={6} className="text-center">
          <Button color="warning" outline className="w-100" onClick={() => navigate("/forgot-password")}>
            Forgot Password
          </Button>
        </Col>
      </Row>
      {loggingIn && (
        <div className="text-center mt-3">
          <span className="text-muted">Logging in...</span>
        </div>
      )}
    </Container>
  );
};

export default Login;
