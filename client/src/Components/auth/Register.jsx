import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Col,
  Container,
  Alert,
  InputGroup,
  Row,
} from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import OmniRental from "../../assets/images/OmniRentalwhitetext.png";
import bgImage from "../../assets/images/bghome.jpg";
import bg from '../../assets/images/bg.jpg';
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
    setFormData((prev) => ({ ...prev, [name]: value }));

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
        setOtpTimer((prev) => {
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
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
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
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="d-flex flex-column flex-md-row shadow-lg rounded overflow-hidden bg-white">
              {/* Left Image Panel (Desktop only) */}
    <Col
  md={6}
  className="d-none d-md-flex flex-column justify-content-center position-relative text-white p-4"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div
    className="position-absolute top-0 start-0 w-100 h-100"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
  ></div>

  {/* Logo top-left */}
  <div
    className="position-absolute top-0 start-0 p-3"
    style={{ zIndex: 3 }}
  >
    <Link to="/">
      <img
        src={OmniRental}
        alt="Logo"
        style={{
          width: "120px",
        }}
      />
    </Link>
  </div>

  {/* Content */}
  <div
    className="position-relative"
    style={{
      zIndex: 2,
      padding: "20px",
      color: "#f1f1f1",
      fontSize: "1.1rem",
      textAlign: "left",
      width: "100%",
    }}
  >
    <h2
      className="fw-bold mt-4"
      style={{
        marginBottom: "10px",
        fontSize: "1.8rem",
        color: "rgb(14, 40, 124)", // ✅ custom color for "Register Now"
      }}
    >
      Register Now
    </h2>

    <p
      className="text-light"
      style={{
        margin: 0,
        lineHeight: "1.5",
      }}
    >
      Find your dream apartment, tools, or vehicle – all in one place!
    </p>
  </div>
</Col>



              {/* Right Form */}
              <Col md={6} xs={12} className="p-4">
                {/* Mobile Logo */}
                <div className="d-md-none text-center mb-3">
                  <Link to="/">
                    <img
                      src={LogoM}
                      alt="Logo"
                      style={{ width: "200px", height: "auto" }}
                    />
                  </Link>
                </div>

                <h4 className="fw-bold mb-4 text-center text-md-start">
                  Sign Up
                </h4>

                {message && (
                  <Alert
                    variant={messageType}
                    onClose={() => setMessage("")}
                    dismissible
                  >
                    {message}
                  </Alert>
                )}

                <Form onSubmit={submitHandler}>
                  {/* Role */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Select Role</Form.Label>
                    <div className="d-flex gap-3">
                      {allowedRoles.map((role) => (
                        <Form.Check
                          inline
                          key={role}
                          label={
                            role.charAt(0).toUpperCase() + role.slice(1)
                          }
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
                    <Form.Label className="fw-semibold">
                      <FaUser className="me-2" />
                      Username
                    </Form.Label>
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
                    <Form.Label className="fw-semibold">
                      <MdEmail className="me-2" />
                      Email
                    </Form.Label>
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
                    <Button
                      variant="secondary"
                      className="mb-3"
                      onClick={sendOtp}
                    >
                      Send OTP
                    </Button>
                  )}

                  {/* OTP */}
                  {isOTPSent && !isOTPVerified && (
                    <Form.Group className="mb-3">
                      <Form.Label>Enter OTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <div className="d-flex gap-2 mt-2">
                        <Button
                          variant="primary"
                          onClick={async () => {
                            try {
                              const res = await fetch(
                                `${BACKEND_URI}/api/auth/verify-otp`,
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    email: formData.email,
                                    otp,
                                    purpose: "register",
                                  }),
                                }
                              );
                              const data = await res.json();
                              if (!res.ok) throw new Error(data.message);
                              setMessage(
                                "OTP Verified! You can now complete registration."
                              );
                              setMessageType("success");
                              setIsOTPVerified(true);
                              setIsOTPSent(false);
                            } catch (err) {
                              setMessage(err.message);
                              setMessageType("danger");
                            }
                          }}
                        >
                          Verify OTP
                        </Button>
                        <Button
                          variant="secondary"
                          disabled={otpTimer > 0}
                          onClick={sendOtp}
                        >
                          {otpTimer > 0
                            ? `Resend OTP in ${otpTimer}s`
                            : "Resend OTP"}
                        </Button>
                      </div>
                    </Form.Group>
                  )}

                  {/* Password */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FaLock className="me-2" />
                      Password
                    </Form.Label>
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
                      <InputGroup.Text
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FaLock className="me-2" />
                      Confirm Password
                    </Form.Label>
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
                      <InputGroup.Text
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 mb-2">
                    Register
                  </Button>

                  <div className="text-center mt-3">
                    <span className="text-muted">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary">
                        Sign in
                      </Link>
                    </span>
                  </div>
                </Form>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
