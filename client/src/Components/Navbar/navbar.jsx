// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { FaUserCircle, FaBars } from 'react-icons/fa';


const Navbar = ({ onToggleSidebar }) => {
  return (
    <>
      {/* ✅ Mobile Top Bar (xs/sm only) */}
      
      <div className="navbar bg-light d-flex justify-content-between align-items-center px-3 py-2 d-block d-md-none">
        <h3 className="m-0">OmniRental</h3>
        <button className="btn" onClick={onToggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      {/* ✅ Main Navbar (md/lg only) */}
      <nav className="navbar navbar-expand-lg navbar-dark  d-none d-md-flex px-4">
        <div className="container-fluid">
          <Link className="navbar-brand logo" to="/">OmniRental</Link>

          <div className="ms-auto d-flex align-items-center ">
            <input
              className="form-control me-2 searchbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Link to="/profile" className="btn btn-outline-light profile-icon ms-2">
              <FaUserCircle size={30} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
