// // src/components/Navbar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './navbar.css';
// import { FaUserCircle, FaBars } from 'react-icons/fa';
// import  { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// const Navbar = ({ onToggleSidebar }) => {
//    const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const handleProfileClick = () => {
//     navigate("/my-profile");
//     setShowDropdown(false); // Close dropdown
//   };

//   const handleLogout = () => {
//     // Perform your logout logic here (e.g. clear token, redirect)
//     localStorage.clear();
//     navigate("/login");
//   };

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       {/* ✅ Mobile Top Bar (xs/sm only) */}
      
//       <div className="navbar bg-light d-flex justify-content-between align-items-center px-3 py-2 d-block d-md-none">
//         <h3 className="m-0">OmniRental</h3>
//         <button className="btn" onClick={onToggleSidebar}>
//           <FaBars size={24}   onClick={() => setShowDropdown(!showDropdown)}/>
//         </button>
//       </div>

//       {/* ✅ Main Navbar (md/lg only) */}
//       <nav className="navbar navbar-expand-lg navbar-dark  d-none d-md-flex px-4">
//         <div className="container-fluid">
//           <Link className="navbar-brand logo" to="/">OmniRental</Link>

//           <div className="ms-auto d-flex align-items-center ">
//             <input
//               className="form-control me-2 searchbar"
//               type="search"
//               placeholder="Search"
//               aria-label="Search"
//             />
//             <Link to="/profile" className="btn btn-outline-light profile-icon ms-2">
//               <FaUserCircle size={30} />
//             </Link>
            
//           </div>

//         </div>
         
//       </nav>
//     </>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { MdArrowForward } from "react-icons/md";
const Navbar = ({ onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/my-profile");
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ✅ Mobile Navbar */}
      <div className="navbar bg-light d-flex justify-content-between align-items-center px-3 py-2 d-block d-md-none">
        <h3 className="m-0">OmniRental</h3>
        <button className="btn" onClick={onToggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      {/* ✅ Desktop Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark d-none d-md-flex px-4">
        <div className="container-fluid">
          <Link className="navbar-brand logo" to="/">OmniRental</Link>

          <div className="ms-auto d-flex align-items-center position-relative" ref={dropdownRef}>
            <input
              className="form-control me-2 searchbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <FaUserCircle
              size={60}
              className="btn btn-outline-light profile-icon ms-2"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: 'pointer' }}
            />

            {showDropdown && (
              <div className="dropdown-menu show">
                <button className="dropdown-item" onClick={handleProfileClick}>
                  My Profile
                </button>
                <button className="dropdown-item" onClick={handleLogout} style={{color:'red'}}>
                  Logout<MdArrowForward />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
