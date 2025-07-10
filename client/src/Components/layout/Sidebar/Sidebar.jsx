import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icon imports
import { HiOutlineHome } from "react-icons/hi";
import { IoMdPerson, IoMdCall } from "react-icons/io";
import { IoGift, IoLocationSharp } from "react-icons/io5";
import { RiBillLine, RiSecurePaymentFill } from "react-icons/ri";
import { MdOutlineEditNote, MdApartment } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoMdArrowDropright } from "react-icons/io";

import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button (visible on mobile) */}
      <div className="navbar  mobile-navbar bg-light d-flex justify-content-between align-items-center px-3 py-2 d-md-none d-lg-node ">
        <h3 className="m-0 logo">OmniRental</h3>
        <button className="btn d-md-none" onClick={() => setIsOpen(!isOpen)} >
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar  col-lg-3 d-flex flex-column ${isOpen ? "open" : ""}`}>
        {/* Dashboard */}
        <div className="d-flex mb-2">
          <div className="menu-item">
            <span className="menu-icon"><HiOutlineHome /></span>
            <span className="menu-text ">Dashboard</span>
          </div>
        </div>

        {/* Tenants Management Section */}
        <div className="sidebar-section">
          <div className="active section-title"><IoMdArrowDropright />Tenants Management</div>

          <div className='Menu-item'>
            <IoMdPerson className="Menu-icon" />
            <Link to="/add-tenant" className="sidebar-menu-text" fs-sm-8>Add Tenants</Link>
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
          <div className="active section-title"><IoMdArrowDropright />Payment & Receipts</div>

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
            <IoGift className="Menu-icon" />
            <a href="#">Gateway Payments</a>
          </div>
        </div>

        {/* Apartment Management Section */}
        <div className="sidebar-section">
          <div className="active section-title"><IoMdArrowDropright />Apartment Management</div>

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
    </>
  );
};

export default Sidebar;
