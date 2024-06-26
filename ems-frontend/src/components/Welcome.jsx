import React, { useState, useEffect } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import "../styles/Welcome.css";
import "../styles/background.css";
import emp from "../images/emp.jpg";
import emp1 from "../images/emp1.jpg";

const WelcomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    // const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <div>
      <HeaderComponent />
      <div className="image-container">
        <img src={emp} className="custom-img" alt="Employee" height="400px" width="400px" />
        <div className="welcome-text">
          <div style={{color: 'blue'}}>
          Hello, 
          </div>
          {user && <h1>{user.name}</h1>}
          <div style={{color: 'blue'}}>
            Welcome to Employee Management System
          </div>
        </div>
        <img src={emp1} className="custom-img" alt="Employee" height="400px" width="400px" />
      </div>
      <FooterComponent />
    </div>
  );
};

export default WelcomePage;
