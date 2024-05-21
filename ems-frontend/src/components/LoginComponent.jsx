import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Alert, Row, Col } from "reactstrap";
import { postApi } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const [user, setUser] = useState({});
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await postApi("/login", user, "Login Successful!", "Invalid Credentials");
      if (response && response.status === 200) {
        console.log(response)
        sessionStorage.setItem("user", JSON.stringify(response.data))
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
          navigate("/home");
        }, 2000);
      } else {
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false), 3000);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 3000);
    }
  };

  return (
    <Container style={{ width: '30%', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginTop: '7%' }}>
      <h2 className="mt-4 mb-4" style={{textAlign: 'center'}}>Login</h2>
      {successAlert && <Alert color="success">Login Successful!</Alert>}
      {errorAlert && <Alert color="danger">Invalid User Name or Password</Alert>}
      <Form onSubmit={handleLogin}>
        <Row>
          <Col md={9} style={{width:'100%'}}>
            <FormGroup style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Label for="name">User Name:</Label>
              <Input type="text" id="name" name="name" onChange={handleInputChange} placeholder="Enter Your Name" style={{width:'75%'}}/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={9} style={{width:'100%'}}>
            <FormGroup style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Label for="password" style={{textWrap:'nowrap'}}>Password:</Label>
              <Input type="password" id="password" name="password" onChange={handleInputChange} placeholder="Enter Your Password" style={{width:'75%'}}/>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Button type="submit" color="primary" outline className="w-100">
              Login
            </Button>
          </Col>
          <Col md={6}>
            <Button color="secondary" outline className="w-100" onClick={() => navigate("/register")}>
              Register
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Button color="warning" outline className="w-100" onClick={() => navigate("/forgot-password")}>
              Forgot Password
            </Button>
          </Col>
          <Col md={6}>
            <Button color="info" outline className="w-100" onClick={() => navigate("/reset-password")}>
              Reset Password
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
