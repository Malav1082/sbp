import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HeaderComponent.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Ensure Font Awesome is imported

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

  const handleHome = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.userId) {
      navigate(`/home/${user.userId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top custom-navbar">
      <div className="container-fluid">
        <button
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
          <button onClick={handleHome} className="btn btn-light me-3 home-button">
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
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="25"
                alt="User Avatar"
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
