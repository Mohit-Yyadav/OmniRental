import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { House, Search, Users, MessageCircle, User, LogOut, Settings, Bookmark, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
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
        >
          <div
            className="me-2 p-2 rounded-circle bg-gradient text-white d-flex align-items-center justify-content-center shadow-sm"
            style={styles.logoGradient}
          >
            <img
              src="/src/assets/home-regular-24.png"
              alt="logo"
              className="img-fluid"
              style={{ filter: "brightness(0) invert(1)", width: "20px" }}
            />
          </div>
          <div className="d-flex flex-column">
            <span className="fw-bold fs-4" style={styles.logoText}>OmniRental</span>
            <small style={styles.logoSubtext}>Premium Properties</small>
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
          <div className="d-flex align-items-center gap-3">
            {currentUser ? (
              <>
                <button 
                  className="btn btn-link position-relative p-2 text-decoration-none hover-shadow rounded-circle"
                  style={{
                    color: scrolled ? '#1e293b' : 'white',
                    backgroundColor: scrolled ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.1)'
                  }}
                >
                  <Bell size={20} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </button>
                
                <Dropdown show={showDropdown} onToggle={setShowDropdown}>
                  <Dropdown.Toggle
                    variant="transparent"
                    id="dropdown-profile"
                    className="d-flex align-items-center gap-2 rounded-pill p-1 border-0 hover-shadow"
                    style={{ 
                      background: scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                      boxShadow: 'none'
                    }}
                  >
                    <div
                      className="rounded-circle bg-primary d-flex align-items-center justify-content-center overflow-hidden shadow-sm"
                      style={{ 
                        width: "36px", 
                        height: "36px",
                        boxShadow: '0 2px 6px rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      {currentUser.photoURL ? (
                        <img 
                          src={currentUser.photoURL} 
                          alt="Profile" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <User size={18} className="text-white" />
                      )}
                    </div>
                    <span className={`d-none d-lg-inline ${scrolled ? 'text-dark' : 'text-white'}`}>
                      {currentUser.displayName || "My Account"}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu 
                    className="shadow-lg border-0 mt-2" 
                    style={styles.dropdownMenu}
                  >
                    <Dropdown.Header className="text-muted small">
                      {currentUser.email || 'Logged in user'}
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      as={Link}
                      to="/dashboard"
                      className="d-flex align-items-center gap-2 py-2 hover-bg-light"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User size={16} /> Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/profile"
                      className="d-flex align-items-center gap-2 py-2 hover-bg-light"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Settings size={16} /> My Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/bookings"
                      className="d-flex align-items-center gap-2 py-2 hover-bg-light"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Bookmark size={16} /> My Bookings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleLogout}
                      className="d-flex align-items-center gap-2 py-2 text-danger hover-bg-light"
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
                  className={`btn ${scrolled ? 'btn-outline-primary hover-shadow' : 'btn-outline-light hover-shadow-white'} px-3 px-lg-4 rounded-pill`}
                  style={{
                    boxShadow: 'none'
                  }}
                >
                  Sign in
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary px-3 px-lg-4 rounded-pill shadow-sm hover-shadow-lg"
                  style={styles.primaryButton}
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
            {currentUser ? (
              <>
                <li className="nav-item mb-2">
                  <Link
                    to="/dashboard"
                    className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded"
                    style={styles.mobileNavLink(location.pathname === '/dashboard')}
                  >
                    <User size={18} /> Dashboard
                  </Link>
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
                <li className="nav-item mb-2">
                  <Link
                    to="/bookings"
                    className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded"
                    style={styles.mobileNavLink(location.pathname === '/bookings')}
                  >
                    <Bookmark size={18} /> My Bookings
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