import React, {useState, useEffect} from 'react'
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import "../styles/Welcome.css";
import "../styles/background.css"

const WelcomePage = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      if (userData) {
        setUser(userData);
      }
    }, []);

    // if (!user) {
    //   return <div>Loading...</div>;
    // }
  return (
    <div>
      <HeaderComponent />
      <div className="image-container">
        {/* <img src="emp.jpg" className="custom-img" alt="Employee" /> */}
        <div className="welcome-text">
          Welcome to Employee Records Management System, 
          {/* {user.userName}. */}
        </div>
        {/* <img src="emp1.jpg" className="custom-img" alt="Employee" /> */}
      </div>
      <FooterComponent />
    </div>
  );
};

export default WelcomePage;
