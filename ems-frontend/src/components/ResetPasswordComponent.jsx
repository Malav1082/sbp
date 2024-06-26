import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Alert, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/UserService";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
    password: Yup.string().required("Old password is required"),
    new_password: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
        "Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, one special character, and one number"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleResetPassword = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await postApi("/reset-password", values, "Password reset successfully!", "Oops! Something went wrong.");
      if (response && response.status === 200) {
        setSubmitting(false);
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
          navigate("/login");
        }, 2000);
      } else {
        setErrors({ password: "Old Password is Incorrect" });
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      setErrors({ password: "Error occurred during password reset" });
      setSubmitting(false);
    }
  };

  return (
    <Container style={{ width: '30%', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginTop: '3%' }}>
      <h2 className="mt-4 mb-4" style={{ textAlign: 'center' , color: 'white'}}>Reset Password</h2>
      {successAlert && <Alert color="success">Password reset successfully!</Alert>}
      <Formik
        initialValues={{ name: "", password: "", new_password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
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
              <Label for="password" className="login-register-reset-forgot">Old Password:</Label>
              <div className="password-input-container">
              <Input
                type={showOldPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                invalid={errors.password && touched.password}
                style={{position: 'relative'}}
              />
              <span
                  className="password-toggle"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <ErrorMessage name="password" component="div" className="text-danger" style={{ marginTop: '0.25rem' }} />
              </FormGroup>
              <FormGroup>
              <Label for="new_password" className="login-register-reset-forgot">New Password:</Label>
              <div className="password-input-container">
              <Input
                type={showNewPassword ? "text" : "new_password"}
                id="new_password"
                name="new_password"
                onChange={handleChange}
                value={values.new_password}
                invalid={errors.new_password && touched.new_password}
                style={{ position: 'relative' }}
              />
              <span
                className="password-toggle"
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              </div>
              <ErrorMessage name="new_password" component="div" className="text-danger" style={{ marginTop: '0.25rem' }} />
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
                  {isSubmitting ? "Submitting..." : "Reset Password"}
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
    </Container>
  );
};

export default ResetPassword;
