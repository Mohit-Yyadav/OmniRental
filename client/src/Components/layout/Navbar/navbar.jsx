// src/components/layout/Navbar/navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import useAuth from '../../../context/useAuth';
import './navbar.css';

const Navbar = ({ onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ Get user from context

  const handleProfileClick = () => {
    navigate(`/${user?.role}/profile`);
    setShowDropdown(false);
  };

  const handleEditProfileClick = () => {
    navigate(`/${user?.role}/edit-profile`);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatar = user?.profilePic || 'https://via.placeholder.com/40';
  const username = user?.fullname || user?.name || 'User';


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

            <div
              className="d-flex align-items-center btn btn-outline-light ms-2 px-2 py-1 rounded"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={avatar}
                alt="avatar"
                className="rounded-circle me-2"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              />
              <span className="text-white fw-semibold d-none d-md-inline">{user.username}</span>
            </div>

            {showDropdown && (
              <div className="dropdown-menu dropdown-menu-end show mt-2">
                <button className="dropdown-item" onClick={handleProfileClick}>
                  My Profile
                </button>
                <button className="dropdown-item" onClick={handleEditProfileClick}>
                  Edit Profile
                </button>
                <button className="dropdown-item text-danger d-flex align-items-center" onClick={handleLogout}>
                  Logout <MdArrowForward className="ms-1" />
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
