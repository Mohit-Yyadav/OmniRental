import React from 'react';
import './Dashboard.css';
import { Link } from "react-router-dom";

import { HiOutlineHome } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";
import { IoMdCall } from "react-icons/io";
import { MdOutlineEditNote } from "react-icons/md";
import { IoGiftSharp } from "react-icons/io5";
import { MdApartment } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiSecurePaymentFill } from "react-icons/ri";

const Sidemenu = () => {
  return (
    <div>
      {/* ========== Navbar (Fixed at Top) ========== */}
      <nav className="navbar navbar-custom d-flex align-items-center justify-content-between fixed-top">
        {/* Left: Logo */}
        <div className="d-flex align-items-center navbar-logo">
          {/* <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Logo" /> */}
          <span className="fs-5 fw-semibold text-secondary">Omni Rental</span>
        </div>

        {/* Center: Search Bar */}
        <div className="position-relative search-bar mx-auto">
          <span className="search-icon">🔍</span>
          <input type="text" className="form-control ps-5" placeholder="Search..." />
        </div>

        {/* Right: Icons */}
        <div className="d-flex align-items-center">
          <div className="theme-btn nav-icon">🌞</div>
          <div className="nav-icon">🔔</div>
          <div className="nav-icon">🔳</div>
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="avatar" />
        </div>
      </nav>

      {/* ========== Sidebar (Starts Below Navbar) ========== */}
      <div className="sidebar d-flex flex-column mt-navbar">
        
        {/* Dashboard */}
        <div className="d-flex align-items-center justify-content-center mb-2">
          <div className="menu-item">
            <span className="menu-icon"><HiOutlineHome /></span>
            <span className="menu-text">Dashboard</span>
          </div>
        </div>

        {/* Tenants Management Section */}
        <div className="sidebar-section">
          <h4 className="active section-title">Tenants Management</h4>

          <div className='Menu-item'>
            <IoMdPerson className="Menu-icon" />
            <Link to="/add-tenant" className="sidebar-menu-text">Add Tenants</Link>
          </div>

          <div className='Menu-item'>
            <IoMdPerson className="Menu-icon" />
            <Link to="/tenants" className="sidebar-menu-text">Tenants</Link>
          </div>

          <div className="Menu-item">
            <RiBillLine className="Menu-icon" />
            <a href="#" className="sidebar-menu-text">Invoices</a>
          </div>
        </div>

        {/* Payment & Receipts Section */}
        <div className="sidebar-section">
          <div className="active section-title">Payment & Receipts</div>

          <div className='Menu-item'>
            <RiSecurePaymentFill className="Menu-icon" />
            <a href="#">Rent Payments</a>
          </div>

          <div className='Menu-item'>
            <IoMdCall className="Menu-icon" />
            <a href="#">Payment Modes</a>
          </div>

          <div className='Menu-item'>
            <MdOutlineEditNote className="Menu-icon" />
            <a href="#">Payment Receipts</a>
          </div>

          <div className='Menu-item'>
            <IoGiftSharp className="Menu-icon" />
            <a href="#">Gateway Payments</a>
          </div>
        </div>

        {/* Apartment Management Section */}
        <div className="sidebar-section">
          <div className="active section-title">Apartment Management</div>

          <div className='Menu-item'>
            <MdApartment className="Menu-icon" />
            <a href="#">Apartments</a>
          </div>

          <div className='Menu-item'>
            <FaLightbulb className="Menu-icon" />
            <a href="#">House Units</a>
          </div>

          <div className='Menu-item'>
            <IoLocationSharp className="Menu-icon" />
            <a href="#">Locations</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidemenu;
