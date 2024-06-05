import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HeaderComponent.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import icon from "../images/icon.png"

const HeaderComponent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  const handleWelcome = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.userId) {
      navigate(`/welcome/${user.userId}`);
    } else {
      navigate('/login');
    }
  };

  const handleEmployeeData = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.userId) {
      navigate(`/home/${user.userId}`);
    } else {
      navigate('/login');
    }
  };

  const handleEditProfile = () => {
    // Redirect to the edit profile page
    navigate('/edit-profile');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top custom-navbar">
      <div className="container-fluid">
        <button style={{color : 'blue' , backgroundColor: 'white'}}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <h3 className="navbar-title">Employee Management System</h3>
        </div>

        <div className="d-flex align-items-center">
          <button onClick={handleEmployeeData} className="btn btn-light me-3">
            Employee Data
          </button>
          <button onClick={handleWelcome} className="btn btn-light me-3 home-button">
            <i className="fas fa-home"></i>
          </button>
          <div className="dropdown">
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={icon}
                className="rounded-circle"
                height="25"
                alt="User"
                loading="lazy"
              />
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
              {user && (
                <>
                  <li className="dropdown-item">
                    <i className="fas fa-user me-2"></i>
                    {user.name}
                  </li>
                  <li className="dropdown-item">
                    <i className="fas fa-phone me-2"></i>
                    {user.mobileNumber}
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleEditProfile}>
                      <i className="fas fa-user-edit me-2"></i> Edit Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}  

export default HeaderComponent;
