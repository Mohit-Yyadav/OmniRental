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

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light position-fixed top-0 start-0 w-100 py-2 px-3 px-lg-4 transition-all ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}
      style={{ zIndex: 999, transition: 'all 0.3s ease-in-out' }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center text-decoration-none"
        >
          <div
            className="me-2 p-2 rounded-circle bg-gradient text-white d-flex align-items-center justify-content-center shadow-sm"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              width: "40px",
              height: "40px",
            }}
          >
            <img
              src="/src/assets/home-regular-24.png"
              alt="logo"
              className="img-fluid"
              style={{ filter: "brightness(0) invert(1)", width: "20px" }}
            />
          </div>
          <div className="d-flex flex-column">
            <span className={`fw-bold fs-4 ${scrolled ? 'text-primary' : 'text-white'}`}>OmniRental</span>
            <small className={scrolled ? "text-muted" : "text-white-50"}>Premium Properties</small>
          </div>
        </Link>

        {/* Toggler for mobile */}
        <button
          className={`navbar-toggler ${scrolled ? '' : 'navbar-toggler-white'}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item mx-1 mx-lg-2 position-relative" key={link.name}>
                <Link
                  to={link.path}
                  className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-pill ${
                    location.pathname === link.path
                      ? `active ${scrolled ? 'text-primary fw-semibold' : 'text-white fw-semibold'}`
                      : scrolled ? 'text-dark' : 'text-white'
                  }`}
                  title={link.tooltip}
                  style={{ transition: 'all 0.2s ease' }}
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
                <button className="btn btn-link position-relative p-2 text-decoration-none">
                  <Bell size={20} className={scrolled ? 'text-dark' : 'text-white'} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </button>
                
                <Dropdown show={showDropdown} onToggle={setShowDropdown}>
                  <Dropdown.Toggle
                    variant="transparent"
                    id="dropdown-profile"
                    className="d-flex align-items-center gap-2 rounded-pill p-1 border-0"
                    style={{ background: scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)' }}
                  >
                    <div
                      className="rounded-circle bg-primary d-flex align-items-center justify-content-center overflow-hidden shadow-sm"
                      style={{ width: "36px", height: "36px" }}
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

                  <Dropdown.Menu className="shadow-sm border-0 mt-2" style={{ minWidth: '220px' }}>
                    <Dropdown.Header className="text-muted small">
                      {currentUser.email || 'Logged in user'}
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      as={Link}
                      to="/dashboard"
                      className="d-flex align-items-center gap-2 py-2"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User size={16} /> Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/profile"
                      className="d-flex align-items-center gap-2 py-2"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Settings size={16} /> My Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/bookings"
                      className="d-flex align-items-center gap-2 py-2"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Bookmark size={16} /> My Bookings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleLogout}
                      className="d-flex align-items-center gap-2 py-2 text-danger"
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
                >
                  Sign in
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary px-3 px-lg-4 rounded-pill shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none' }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;