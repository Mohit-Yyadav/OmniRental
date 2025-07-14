import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { House, Search, Users, MessageCircle, User, LogOut, Settings, Bookmark, Bell } from "lucide-react";
import useAuth from '../../context/useAuth';

import { Dropdown } from "react-bootstrap";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => document.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <House size={18} />,
      tooltip: "Welcome home",
    },
    {
      name: "Properties",
      path: "/properties",
      icon: <Search size={18} />,
      tooltip: "Find your dream property",
    },
    {
      name: "About Us",
      path: "/about",
      icon: <Users size={18} />,
      tooltip: "Our story",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <MessageCircle size={18} />,
      tooltip: "Get in touch",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowDropdown(false);
  };
  const handleDashboardRedirect = () => {
  if (user?.role === 'tenant') {
    navigate('/tenant/dashboard');
  } else if (user?.role === 'owner') {
    navigate('/owner/dashboard');
  } else {
    navigate('/'); // fallback
  }
  setShowDropdown(false);
};


  // Internal CSS styles
  const styles = {
    navbar: {
      zIndex: 999, 
      transition: 'all 0.3s ease-in-out',
      boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
      backgroundColor: scrolled ? '#ffffff' : 'transparent',
    },
    logoGradient: {
      background: "linear-gradient(135deg, #3b82f6, #6366f1)",
      width: "40px",
      height: "40px",
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
    },
    logoText: {
      textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.3)',
      color: scrolled ? '#3b82f6' : 'white'
    },
    logoSubtext: {
      textShadow: scrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.2)',
      color: scrolled ? '#6b7280' : 'rgba(255,255,255,0.7)'
    },
    navLink: (isActive) => ({
      transition: 'all 0.2s ease',
      boxShadow: isActive && scrolled ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
      color: isActive 
        ? (scrolled ? '#3b82f6' : 'white') 
        : (scrolled ? '#1e293b' : 'white'),
      backgroundColor: isActive 
        ? (scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.2)') 
        : 'transparent',
      fontWeight: isActive ? '600' : '400'
    }),
    dropdownMenu: {
      minWidth: '220px',
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #3b82f6, #6366f1)', 
      border: 'none',
      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)'
    },
    mobileMenu: {
      maxHeight: mobileMenuOpen ? '500px' : '0',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease-in-out',
      backgroundColor: scrolled ? '#ffffff' : 'rgba(255,255,255,0.95)',
      boxShadow: mobileMenuOpen ? '0 10px 15px -3px rgba(0,0,0,0.1)' : 'none'
    },
    mobileNavLink: (isActive) => ({
      color: isActive ? '#3b82f6' : (scrolled ? '#1e293b' : '#1e293b'),
      fontWeight: isActive ? '600' : '400',
      backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
    })
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light position-fixed top-0 start-0 w-100 py-2 px-3 px-lg-4`}
      style={styles.navbar}
    >
      <div className="container-fluid">
        {/* Logo */}
       <Link
  to="/"
  className="navbar-brand d-flex align-items-center text-decoration-none"
  aria-label="OmniRental Home"
>
  {/* Logo Container */}
  <div
    className="me-2 p-2 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
    style={{
      background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
      width: "42px",
      height: "42px",
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      willChange: 'transform',
      ':hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
      }
    }}
  >
    {/* Dynamic logo handling - falls back to SVG if image not found */}
    <img
      src={user?.photoURL || '/src/assets/logo.svg'}  // Use your actual logo path
      alt="OmniRental Logo"
      className="img-fluid"
      style={{ 
        width: "24px",
        height: "24px",
        filter: "brightness(0) invert(1)",
        objectFit: "contain"
      }}
      onError={(e) => {
        // Fallback to house icon if logo fails to load
        e.target.onerror = null;
        e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ob3VzZSI+PHBhdGggZD0iTTE5IDIxVjEwYTIgMiAwIDAgMC0yLTJIN2EyIDIgMCAwIDAtMiAydjExIi8+PHBhdGggZD0iTTMgMjFsMTktMTgiLz48cGF0aCBkPSJNOSAyMXYtOGEyIDIgMCAwIDEgMi0yaDJhMiAyIDAgMCAxIDIgMnY4Ii8+PC9zdmc+"
      }}
    />
  </div>

  {/* Brand Text */}
  <div className="d-flex flex-column">
    <span 
      className="fw-bold fs-4" 
      style={{
        color: scrolled ? '#3b82f6' : 'white',
        transition: 'color 0.3s ease, text-shadow 0.3s ease',
        textShadow: scrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.1)',
        letterSpacing: '-0.5px',
        lineHeight: '1.1'
      }}
    >
      OmniRental
    </span>
    <small 
      style={{
        color: scrolled ? '#6b7280' : 'rgba(255,255,255,0.85)',
        fontSize: '0.7rem',
        fontWeight: '500',
        transition: 'color 0.3s ease',
        letterSpacing: '0.5px'
      }}
    >
      Premium Properties
    </small>
  </div>
</Link>

        {/* Toggler for mobile */}
        <button
          className={`navbar-toggler ${scrolled ? '' : 'navbar-toggler-white'}`}
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            boxShadow: 'none',
            borderColor: scrolled ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.5)'
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop Nav Links */}
        <div className="collapse navbar-collapse d-lg-flex" id="mainNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item mx-1 mx-lg-2 position-relative" key={link.name}>
                <Link
                  to={link.path}
                  className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-pill`}
                  title={link.tooltip}
                  style={styles.navLink(location.pathname === link.path)}
                >
                  {link.icon} 
                  <span className="d-none d-lg-inline">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side buttons */}
<div className="d-flex align-items-center gap-2">
  {user ? (
    <>
      {/* Notifications Button */}
      <button 
        className="btn btn-link position-relative p-2 text-decoration-none rounded-circle"
        style={{
          color: scrolled ? '#1e293b' : 'white',
          backgroundColor: scrolled ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.1)',
          transition: 'all 0.2s ease',
          border: 'none',
          outline: 'none'
        }}
        aria-label="Notifications"
        onClick={() => navigate('/notifications')}
      >
        <Bell size={20} />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          99+
          <span className="visually-hidden">unread notifications</span>
        </span>
      </button>
      
      {/* User Profile Dropdown */}
      <Dropdown show={showDropdown} onToggle={setShowDropdown}>
        <Dropdown.Toggle
          variant="transparent"
          id="dropdown-profile"
          className="d-flex align-items-center gap-2 rounded-pill p-1 border-0"
          style={{ 
            background: scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
            boxShadow: 'none',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          aria-expanded={showDropdown}
          aria-label="User profile menu"
        >
          <div
            className="rounded-circle bg-primary d-flex align-items-center justify-content-center overflow-hidden shadow-sm"
            style={{ 
              width: "36px", 
              height: "36px",
              boxShadow: '0 2px 6px rgba(59, 130, 246, 0.3)',
              transition: 'transform 0.2s ease'
            }}
          >
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xOSAyMXYtMmE0IDQgMCAwIDAtNC00SDlhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+'
                }}
              />
            ) : (
              <User size={18} className="text-white" />
            )}
          </div>
          <span className={`d-none d-lg-inline ${scrolled ? 'text-dark' : 'text-white'}`}>
  Hello, {user?.username || "User"}
</span>

        </Dropdown.Toggle>

        <Dropdown.Menu 
          className="shadow-lg border-0 mt-2" 
          style={{
             zIndex: 1060,
            minWidth: '220px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}
          align="end"
        >
          {/* <Dropdown.Header className="text-muted small d-flex flex-column">
            <span className="fw-bold">{user.username || 'User'}</span>
            <small>{user.email || ''}</small>
          </Dropdown.Header> */}
          
          <Dropdown.Item
  onClick={handleDashboardRedirect}
  className="d-flex align-items-center gap-2 py-2"
>
  <User size={16} /> Dashboard
</Dropdown.Item>

          <Dropdown.Item
            as={Link}
            to="/profile"
            className="d-flex align-items-center gap-2 py-2"
            style={{ transition: 'all 0.2s ease' }}
            onClick={() => setShowDropdown(false)}
          >
            <Settings size={16} /> My Profile
          </Dropdown.Item>
          
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={handleLogout}
            className="d-flex align-items-center gap-2 py-2 text-danger"
            style={{ transition: 'all 0.2s ease' }}
          >
            <LogOut size={16} /> Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  ) : (
    <>
      <Link 
        to="/login" 
        className={`btn ${scrolled ? 'btn-outline-primary' : 'btn-outline-light'} px-3 px-lg-4 rounded-pill`}
        style={{
          transition: 'all 0.2s ease',
          borderWidth: '2px',
          fontWeight: '500'
        }}
      >
        Sign in
      </Link>
      <Link 
        to="/signup" 
        className="btn btn-primary px-3 px-lg-4 rounded-pill"
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
          border: 'none',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
          ':hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
          }
        }}
      >
        Get Started
      </Link>
    </>
  )}
</div>
        </div>

        {/* Mobile Menu */}
        <div className="d-lg-none w-100" style={styles.mobileMenu}>
          <ul className="navbar-nav px-3 py-3">
            {navLinks.map((link) => (
              <li className="nav-item mb-2" key={`mobile-${link.name}`}>
                <Link
                  to={link.path}
                  className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded`}
                  style={styles.mobileNavLink(location.pathname === link.path)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
            {user ? (
              <>
                <li className="nav-item mb-2">
  <button
    onClick={handleDashboardRedirect}
    className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded w-100 text-start"
  >
    <User size={18} /> Dashboard
  </button>
</li>

                <li className="nav-item mb-2">
                  <Link
                    to="/profile"
                    className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded"
                    style={styles.mobileNavLink(location.pathname === '/profile')}
                  >
                    <Settings size={18} /> My Profile
                  </Link>
                </li>
                
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded w-100 text-start text-danger"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </>
            ) : (
              <div className="d-flex gap-2 mt-3 px-2">
                <Link 
                  to="/login" 
                  className={`btn ${scrolled ? 'btn-outline-primary' : 'btn-outline-primary'} flex-grow-1`}
                >
                  Sign in
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary flex-grow-1"
                  style={styles.primaryButton}
                >
                  Sign up
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;