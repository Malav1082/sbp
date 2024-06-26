// App.jsx
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
import Update from "./components/Update";
import WelcomePage from "./components/Welcome";
import EditProfile from "./components/EditProfile";
import AuthGuard from "./AuthGuard";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const location = useLocation();
  const showHeaderAndFooter = location.pathname.startsWith("/home");

  return (
    <>
      {showHeaderAndFooter && <HeaderComponent />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/welcome/:id" element={
          <AuthGuard>
            <WelcomePage />
          </AuthGuard>
        }/>
        <Route path="/home/:id" element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }/>
        <Route path="/home/:id/add" element={
          <AuthGuard>
            <Add />
          </AuthGuard>
        }/>
        <Route path="/home/:id/update" element={
          <AuthGuard>
            <Update />
          </AuthGuard>
        }/>
        <Route path="/home/:id/update/:empId" element={
          <AuthGuard>
            <Update />
          </AuthGuard>
        }/>
        <Route path="/edit-profile" element={
          <AuthGuard>
            <EditProfile />
          </AuthGuard>
        }/>
        <Route path="/" element={<AuthGuard><Login /></AuthGuard>} />
      </Routes>
      {showHeaderAndFooter && <FooterComponent />}
    </>
  );
};

export default App;
// // App.jsx

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Login from "./components/LoginComponent";
// import Register from "./components/RegisterComponent";
// import ForgotPassword from "./components/ForgotPasswordComponent";
// import ResetPassword from "./components/ResetPasswordComponent";
// import Home from "./components/Home";
// import FooterComponent from './components/FooterComponent';
// import HeaderComponent from './components/HeaderComponent';
// import Add from "./components/Add";
// import Update from "./components/Update";
// import WelcomePage from "./components/Welcome";
// import EditProfile from "./components/EditProfile";
// // import AuthGuard from "./AuthGuard";

// function App() {
//   return (
//     <Router>
//       <MainContent />
//     </Router>
//   );
// }

// const MainContent = () => {
//   const location = useLocation();
//   const showHeaderAndFooter = location.pathname.startsWith("/home");

//   return (
//     <>
//       {showHeaderAndFooter && <HeaderComponent />}
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/welcome/:id" element={<WelcomePage />}/>
//         <Route path="/home/:id" element={<Home />}/>
//         <Route path="/home/:id/add" element={<Add />}/>
//         <Route path="/home/:id/update" element={<Update />}/>
//         <Route path="/home/:id/update/:empId" element={<Update />}/>
//         <Route path="/edit-profile" element={<EditProfile />}/>
//         <Route path="/" element={<Login />} />
//       </Routes>
//       {showHeaderAndFooter && <FooterComponent />}
//     </>
//   );
// };

// export default App;
