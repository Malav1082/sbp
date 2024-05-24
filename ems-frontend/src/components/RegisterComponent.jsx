import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import { postApi } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("UserName is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one digit and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await postApi("/register", values, "Registered Successfully!", "Oops! Something went wrong.");
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (response.status === 409) {
        setErrors({ confirmPassword: "User Already Exists!" });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setErrors({ confirmPassword: "Oops! Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Register</h2>
      <Formik
        initialValues={{ name: "", mobileNumber: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">UserName</Label>
              <Input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                invalid={touched.name && errors.name}
              />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </FormGroup>
            <FormGroup>
              <Label for="mobileNumber">Mobile Number</Label>
              <Input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobileNumber}
                invalid={touched.mobileNumber && errors.mobileNumber}
              />
              <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                invalid={touched.password && errors.password}
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                invalid={touched.confirmPassword && errors.confirmPassword}
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </FormGroup>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
            <Button
              type="button"
              color="secondary"
              className="ml-2"
              onClick={() => navigate("/login")}
            >
              Back
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
