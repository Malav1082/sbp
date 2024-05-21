import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/LoginComponent";
import Register from "./components/RegisterComponent";
import ForgotPassword from "./components/ForgotPasswordComponent";
import ResetPassword from "./components/ResetPasswordComponent";
import Home from "./components/Home";
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import Add from "./components/Add";

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();

  const showHeaderAndFooter = location.pathname === "/home";

  return (
    <>
      {showHeaderAndFooter && <HeaderComponent />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home/:id" element={<Home />}/>
          <Route path="/home/:id/add" element={<Add />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
      {showHeaderAndFooter && <FooterComponent />}
    </>
  );
};

export default App;



