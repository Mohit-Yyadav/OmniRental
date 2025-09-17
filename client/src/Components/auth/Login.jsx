import React, { useState, useEffect } from "react";
import {
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaGoogle,
  FaFacebookF,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import rentImage from "../../assets/images/bghome.jpg";
import useAuth from "../../context/useAuth"; // Adjust the import path as necessa
import OmniRental from "../../assets/images/OmniRentalwhitetext.png";
import bgImage from "../../assets/images/bg.jpg";
import LogoM from "../../assets/images/OmniRental4.png";
import "../../assets/css/Auth.css";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

// import { left } from "@popperjs/core";
const Login = () => {
  const navigate = useNavigate();
const { login, googleLogin, isAuthenticated, user } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect if already authenticated
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath =
        user.role === "tenant" ? "/tenant/dashboard" : "/dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const user = await login(formData.email, formData.password); // ✅ Now user is returned

      const redirectPath =
        user.role === "tenant" ? "/tenant/dashboard" : "/owner/dashboard";

      setMessage({
        text: "Login successful! Redirecting...",
        type: "success",
      });

      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 1000);
    } catch (error) {
      setMessage({
        text: error.message || "Invalid credentials. Please try again.",
        type: "danger",
      });
      setFormData((prev) => ({ ...prev, password: "" }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center bg-light  "
      style={{
        backgroundImage: `url(${bgImage})`, // import bgImage from assets
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Container className="my-5  ">
        <Row className="justify-content-center ">
          <Col md={10} lg={8} xl={7}>
            <div className="card shadow-lg shadow-sm overflow-hidden  ">
              <Row className="g-0">
                {/* Image Section */}
                <Col md={6} className=" left-col d-none d-md-flex shadow">
                  <div
                    className="h-100 w-100 d-flex  align-items-center justify-content-center text-white"
                    style={{
                      backgroundImage: `url(${rentImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                      zIndex: 3,
                    }}
                  >
                    {/* Overlay */}
                    <div
                      style={{
                        backgroundColor: "rgba(79, 78, 78, 0.5)",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "100%",
                        zIndex: 1,
                      }}
                    ></div>

                    {/* Logo (fixed top-left) */}
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        zIndex: 2,
                      }}
                    >
                      <Link to="/" className="Logo">
                        <img
                          src={OmniRental}
                          alt="Logo"
                          style={{ width: "100px", cursor: "pointer" }}
                        />
                      </Link>
                    </div>

                    {/* Center Content (now includes Welcome + paragraph) */}
                    <div
                      style={{
                        position: "absolute",
                        top: "100px",
                        zIndex: 2,
                        padding: "20px",

                        color: "#f1f1f1",
                        fontSize: "1.1rem",
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      <h1
                        className="fw-bold fs-2"
                        style={{
                          margin: 0,
                          marginLeft: "30px",
                          color: "#0e287cff",
                        }} // ✅ Add marginLeft here
                      >
                        Welcome Back!
                      </h1>
                      <p
                        style={{
                          margin: 0,
                          marginLeft: "30px",
                          color: "#e0e0e0",
                          marginTop: "10px",
                        }} // ✅ Same here
                      >
                        Find your dream apartment, tools, or vehicle – all in
                        one place!
                      </p>
                    </div>
                  </div>
                </Col>

                {/* Form Section */}
                <Col md={6} xs={12} className="right-col">
                  <div className="p-4 p-md-5">
                    <div className=" mb-4">
                      <div className="  d-md-none text-center mb-0 mt-2 mt-md-3 h-5">
                        <Link to="/">
                          <img
                            src={LogoM}
                            alt="Logo"
                            style={{
                              width: "200px",
                              height: "auto",
                              cursor: "pointer",
                              textAlign: "center",
                            }}
                          />
                        </Link>
                      </div>
                      <p className="text-primary d-md-none  fs-1 fw-bold mt-3 text-center">
                        Welcome Back
                      </p>
                      <p className="text-muted mt-0 fs-4 fw-bold text-dark">
                        Sign in
                      </p>
                    </div>

                    {message.text && (
                      <Alert
                        variant={message.type}
                        dismissible
                        onClose={() => setMessage({ text: "", type: "" })}
                        className="mb-4"
                      >
                        {message.text}
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit} noValidate>
                      {/* Email Field */}
                      <Form.Group className="mb-3 fs-6 inputbox">
                        <Form.Label>
                          <MdEmail className="me-2 " />
                          Email Address
                        </Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text className="d-none d-md-block">
                            <MdEmail />
                          </InputGroup.Text>
                          <Form.Control
                            className="rounded-md-0 "
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!validationErrors.email}
                            required
                            autoComplete="username"
                          />
                          <Form.Control.Feedback type="invalid">
                            {validationErrors.email}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      {/* Password Field */}
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaLock className="me-2 fs-6" />
                          Password
                        </Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text className="d-none d-md-block">
                            <FaLock />
                          </InputGroup.Text>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!validationErrors.password}
                            required
                            autoComplete="current-password"
                          />
                          <InputGroup.Text
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword(!showPassword)}
                            className="bg-white"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </InputGroup.Text>
                          <Form.Control.Feedback type="invalid">
                            {validationErrors.password}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      {/* Remember Me & Forgot Password */}
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Form.Check
                          type="checkbox"
                          id="rememberMe"
                          label="Remember me"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <Link
                          to="/forgot-password"
                          className="text-decoration-none text-primary"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      {/* Submit Button */}
                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 py-2 mb-3 fw-bold fs-6"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <FaSpinner className="fa-spin me-2" />
                            Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>

                      {/* Divider */}
                      <div className="position-relative my-4">
                        <div className="border-bottom"></div>
                        <div className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted">
                          or
                        </div>
                      </div>

                      {/* Social Login Options */}
                      <div className="d-flex gap-2 mb-4">
<GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const tokenId = credentialResponse.credential;

      const userData = await googleLogin(tokenId);

      const redirectPath =
        userData.role === "tenant"
          ? "/tenant/dashboard"
          : "/owner/dashboard";

      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Google login failed. Please try again.",
        type: "danger",
      });
    }
  }}
  onError={() => {
    setMessage({
      text: "Google login was unsuccessful.",
      type: "danger",
    });
  }}
  useOneTap
/>



                        {/* <Button
                          variant="outline-dark"
                          className="flex-grow-1"
                          disabled
                        >
                          <FaFacebookF  className="me-2" />
                          
                        </Button> */}
                      </div>

                      {/* Register Link */}
                      <div className="text-center">
                        <span className="text-muted">
                          Don't have an account?{" "}
                        </span>
                        <Link
                          to="/signup"
                          className="text-decoration-none fw-bold text-primary"
                        >
                          Sign up
                        </Link>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;