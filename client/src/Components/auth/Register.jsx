import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Col, Container, Alert, InputGroup } from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaBuilding, FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../../assets/css/Auth.css";
import OmniRental from "../../assets/images/OmniRentalwhitetext.png";
import rentImage from "../../assets/images/bghome.jpg";
import bgImage from "../../assets/images/bg.jpg";
import LogoM from "../../assets/images/OmniRental4.png";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const navigate = useNavigate();
  const allowedRoles = ["tenant", "owner"];

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "email") {
      setIsOTPSent(false);
      setIsOTPVerified(false);
      setOtp("");
    }
  };

  const sendOtp = async () => {
    if (!formData.email) {
      setMessage("Enter email first");
      setMessageType("danger");
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URI}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, purpose: "register" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("OTP sent to your email");
      setMessageType("success");
      setIsOTPSent(true);
      setOtpTimer(60);

      const timerInterval = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setMessage(err.message);
      setMessageType("danger");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage("All fields are required");
      setMessageType("danger");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("danger");
      return;
    }
    if (!isOTPVerified) {
      setMessage("Please verify your email first");
      setMessageType("danger");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URI}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setMessage("Registration Successful! Redirecting to login...");
      setMessageType("success");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
      setMessageType("danger");
    }
  };

  return (
    <div
      className="register-page min-vh-100"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "block",
      }}
    >
    

      <Container className="d-flex justify-content-center align-items-center vh-100">


        
        <div className="register-card d-flex flex-column flex-md-row shadow-lg rounded overflow-hidden w-100" style={{ maxWidth: "900px" }}>
          
          {/* Left Image */}
          <Col md={6} className="left-image d-none d-md-flex position-relative">
            <div className="overlay"></div>
            <div className="left-logo">
              <Link to="/" className="logo-link">
                <img src={OmniRental} alt="Logo" className="left-logo-img" />
              </Link>
            </div>
            <div className="left-text text-center">
              <h1 className="fw-bold">Register Now</h1>
              <p>Find your dream apartment, tools, or vehicle – all in one place!</p>
            </div>
          </Col>
    

  {/* Mobile Logo */}
      <div className="d-md-none text-center pt-3"
      style={{
      
        position: "relative"
      }}>
        <Link to="/">
          <img src={LogoM} alt="Logo" className="mobile-logo" />
        </Link>
      </div>


          {/* Right Form */}
          <Col md={6} xs={12} className="p-4 form-container">
            <h4 className="text-center text-md-start fw-bold mb-4  ">Sign up</h4>

            {message && (
              <Alert variant={messageType} onClose={() => setMessage("")} dismissible>
                {message}
              </Alert>
            )}

            <Form onSubmit={submitHandler} className="register-form">
              {/* Role */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Select Role:</Form.Label>
                <div className="d-flex gap-3">
                  {allowedRoles.map(role => (
                    <Form.Check
                      inline
                      key={role}
                      label={role.charAt(0).toUpperCase() + role.slice(1)}
                      name="role"
                      type="radio"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </Form.Group>

              {/* Username */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold"><FaUser className="me-2" />User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold"><MdEmail className="me-2" />Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  disabled={isOTPVerified}
                />
              </Form.Group>

              {/* Send OTP */}
              {!isOTPSent && !isOTPVerified && (
                <Button variant="secondary" className="mb-3" onClick={sendOtp}>Send OTP</Button>
              )}

              {/* OTP Input */}
              {isOTPSent && !isOTPVerified && (
                <Form.Group className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
                  <div className="d-flex gap-2 mt-2">
                    <Button variant="primary" onClick={async () => {
                      try {
                        const res = await fetch(`${BACKEND_URI}/api/auth/verify-otp`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email: formData.email, otp, purpose: "register" }),
                        });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.message);
                        setMessage("OTP Verified! You can now complete registration.");
                        setMessageType("success");
                        setIsOTPVerified(true);
                        setIsOTPSent(false);
                      } catch (err) {
                        setMessage(err.message);
                        setMessageType("danger");
                      }
                    }}>Verify OTP</Button>
                    <Button variant="secondary" disabled={otpTimer > 0} onClick={sendOtp}>
                      {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
                    </Button>
                  </div>
                </Form.Group>
              )}

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold"><FaLock className="me-2" />Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={!isOTPVerified}
                  />
                  <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold"><FaLock className="me-2" />Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={!isOTPVerified}
                  />
                  <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: "pointer" }}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-2">Register</Button>

              <div className="text-center mt-3">
                <span className="text-muted">
                  Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
                </span>
              </div>
            </Form>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default Register;
