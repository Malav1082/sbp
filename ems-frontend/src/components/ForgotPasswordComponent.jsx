import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Alert, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/UserService";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
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

  const handleForgotPassword = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await postApi("/forgot-password", values, "Password reset successfully!", "Oops! Something went wrong.");
      if (response && response.status === 200) {
        setSubmitting(false);
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
          navigate("/login");
        }, 2000);
      } else {
        setErrors({ new_password: "Password reset failed" });
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      setErrors({ new_password: "Error occurred during password reset" });
      setSubmitting(false);
    }
  };

  return (
    <Container style={{ width: '30%', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginTop: '7%' }}>
      <h2 className="mt-4 mb-4" style={{ textAlign: 'center' }}>Forgot Password</h2>
      {successAlert && <Alert color="success">Password reset successfully!</Alert>}
      <Formik
        initialValues={{ name: "", new_password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleForgotPassword}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">UserName:</Label>
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
              <Label for="new_password">New Password:</Label>
              <Input
                type="password"
                id="new_password"
                name="new_password"
                onChange={handleChange}
                value={values.new_password}
                invalid={errors.new_password && touched.new_password}
              />
              <ErrorMessage name="new_password" component="div" className="text-danger" style={{ marginTop: '0.25rem' }} />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm New Password:</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                value={values.confirmPassword}
                invalid={errors.confirmPassword && touched.confirmPassword}
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" style={{ marginTop: '0.25rem' }} />
            </FormGroup>
            <Row className="mt-3">
              <Col md={6}>
                <Button type="submit" color="primary" className="w-100 mb-2" style={{ fontSize: '0.9rem' }} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Forgot Password"}
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

export default ForgotPassword;
