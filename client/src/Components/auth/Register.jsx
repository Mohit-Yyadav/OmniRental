// import React, { useState } from 'react';
// import { FaUser, FaLock, FaEye, FaEyeSlash, FaBuilding, FaHome } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { MdEmail } from "react-icons/md";
// import '../../assets/css/Auth.css';
// import rent from '../../assets/images/bghome.jpg';

// const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

// const Register = () => {
//   const navigate = useNavigate();
//   const allowedRoles = ['tenant', 'owner'];

//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: '' // default to tenant
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

// // In your Register component's submitHandler
// const submitHandler = async (e) => {
//   e.preventDefault();

//   // Validation
//   if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
//     setMessage("All fields are required");
//     setMessageType("danger");
//     return;
//   }

//   if (formData.password !== formData.confirmPassword) {
//     setMessage("Passwords do not match");
//     setMessageType("danger");
//     return;
//   }

//   try {
//     const res = await fetch(`${BACKEND_URI}/api/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: formData.username, // Changed from username to name to match backend
//         email: formData.email,
//         password: formData.password,
//         role: formData.role
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Registration failed");
//     }

//     setMessage("Registration Successful! Redirecting to login...");
//     setMessageType("success");

//     // Automatically log in after registration if desired
//     setTimeout(() => navigate("/login"), 1000);
//   } catch (error) {
//     console.error("Registration error:", error);
//     setMessage(error.message || "Something went wrong. Please try again.");
//     setMessageType("danger");
//   }
// };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
//       <div className="container p-4 rounded shadow-lg bg-white d-flex flex-md-row flex-column" style={{ maxWidth: '900px' }}>
//         {/* Left side with image */}
//         <div className=" text-white p-5 rounded-start w-100 w-md-50 text-center">
//           <img src={rent} alt="Rent" className="img-fluid " />
//         </div>

//         {/* Right side - Registration Form */}
//         <div className="p-5 w-100 w-md-50">
//           <h3 className="mb-4 fw-bold">Register Now</h3>

//           {message && (
//             <div className={`alert alert-${messageType} alert-dismissible fade show`} role="alert">
//               {message}
//               <button
//                 type="button"
//                 className="btn-close"
//                 onClick={() => setMessage('')}
//                 aria-label="Close"
//               ></button>
//             </div>
//           )}

//           <form onSubmit={submitHandler}>
//             {/* Role Selection */}
//             {/* <div className="mb-3">
//               <label className="form-label">Register as:</label>
//               <div className="d-flex gap-3">
//                 <div className="form-check flex-grow-1">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="role"
//                     id="tenant"
//                     value="tenant"
//                     checked={formData.role === 'tenant'}
//                     onChange={handleChange}
//                   />
//                   <label className="form-check-label d-flex align-items-center" htmlFor="tenant">
//                     <FaHome className="me-2" /> Tenant
//                   </label>
//                 </div>
//                 <div className="form-check flex-grow-1">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="role"
//                     id="owner"
//                     value="owner"
//                     checked={formData.role === 'owner'}
//                     onChange={handleChange}
//                   />
//                   <label className="form-check-label d-flex align-items-center" htmlFor="owner">
//                     <FaBuilding className="me-2" /> Property Owner
//                   </label>
//                 </div>
//               </div>
//             </div> */}
//             <div className="mb-3">
//   <label className="form-label">Select Role:</label>
//   <div className="d-flex gap-3">
//     {allowedRoles.map((role) => (
//       <label key={role} className="form-check-label d-flex align-items-center">
//         <input
//           className="form-check-input me-2"
//           type="radio"
//           name="role"
//           value={role}
//           checked={formData.role === role}
//           onChange={handleChange}
//         />
//         {role.charAt(0).toUpperCase() + role.slice(1)}
//       </label>
//     ))}
//   </div>
// </div>

//             {/* Username Field */}
//             <div className="form-group mb-3">
//               <label htmlFor="username" className="form-label">
//                 <FaUser className="me-2" /> User Name
//               </label>
//               <input
//                 name="username"
//                 onChange={handleChange}
//                 type="text"
//                 className="form-control"
//                 id="username"
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>

//             {/* Email Field */}
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">
//                 <MdEmail className="me-2" /> Email
//               </label>
//               <input
//                 name="email"
//                 onChange={handleChange}
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             {/* Password Field */}
//             <div className="form-group mb-3">
//               <label htmlFor="password" className="form-label">
//                 <FaLock className="me-2" /> Password
//               </label>
//               <div className="input-group">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   className="form-control"
//                   id="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   required
//                 />
//                 <span
//                   className="input-group-text"
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div className="form-group mb-3">
//               <label htmlFor="confirmPassword" className="form-label">
//                 <FaLock className="me-2" /> Confirm Password
//               </label>
//               <div className="input-group">
//                 <input
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   className="form-control"
//                   id="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm password"
//                   required
//                 />
//                 <span
//                   className="input-group-text"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-100">Register</button>

//             <div className="text-center mt-3">
//               <small>
//                 Already have an account?{" "}
//                 <a href="/login" className="text-primary">Login</a>
//               </small>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Alert,
  InputGroup,
} from "react-bootstrap";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBuilding,
  FaHome,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Auth.css";
import OmniRental from "../../assets/images/OmniRentalwhitetext.png";
import rentImage from "../../assets/images/bghome.jpg";
import bgImage from "../../assets/images/bg.jpg";
import LogoM from "../../assets/images/OmniRental4.png";
// import rent from '../../assets/images/bghome.jpg';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const navigate = useNavigate();
  const allowedRoles = ["tenant", "owner"];

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // default to tenant
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // OTP related states
  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  // Add at top
  const [otpTimer, setOtpTimer] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      // reset OTP flow if email changes
      setIsOTPSent(false);
      setIsOTPVerified(false);
      setOtp("");
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
      setOtpTimer(60); // Start 60s countdown

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

  return (
    <div
      className="min-vh-100 bg-light"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {/* ✅ Mobile Top Logo */}
      <div className="d-md-none text-center pt-3">
        <Link to="/">
          <img
            src={LogoM}
            alt="Logo"
            style={{
              width: "200px",
              height: "auto",
              cursor: "pointer",
            }}
          />
        </Link>
      </div>

      <Container className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
        <div
          className="container w-100 rounded shadow-lg bg-white d-flex flex-md-row flex-column card shadow-sm overflow-hidden "
          style={{ maxWidth: "900px" }}
        >
          {/* Left image side (Desktop only) */}
          <Col md={6} className="left-col d-none d-md-flex shadow">
            <div
              className="h-100 w-100 d-flex align-items-center justify-content-center text-white"
              style={{
                backgroundImage: `url(${rentImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                zIndex: 3,
                paddingRight: 0,
                paddingLeft: 0,
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

              {/* Logo top-left */}
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

              {/* Center text */}
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
                  }}
                >
                  Register Now
                </h1>
                <p
                  style={{
                    margin: 0,
                    marginLeft: "30px",
                    color: "#e0e0e0",
                    marginTop: "10px",
                  }}
                >
                  Find your dream apartment, tools, or vehicle – all in one
                  place!
                </p>
              </div>
            </div>
          </Col>

          {/* Right Form Side */}
          <Col
            md={6}
            xs={12}
            className="p-lg-4 p-sm-0 d-flex flex-column justify-content-center formdivmobil  "
          >
            <h4 className="mb-4 p-2 mt-3 fw-bold text-center text-md-start">
              Sign up
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

            <Form onSubmit={submitHandler} className="p-2">
              {/* Role Selection */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Select Role:</Form.Label>
                <div className="d-flex gap-3">
                  {allowedRoles.map((role) => (
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
                <Form.Label className="fw-semibold">
                  <FaUser className="me-2" />
                  User Name
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
                  disabled={isOTPVerified} // disable after OTP verified
                />
              </Form.Group>

              {/* Send OTP Button */}
              {!isOTPSent && !isOTPVerified && (
                <Button
                  variant="secondary"
                  className="mb-3"
                  onClick={sendOtp} // <-- Use the new function
                >
                  Send OTP
                </Button>
              )}

              {/* OTP Input & Verify Button */}
              {isOTPSent && !isOTPVerified && (
                <Form.Group className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <div className="d-flex align-items-center gap-2 mt-2">
                    {/* Verify OTP Button */}
                    <Button
                      variant="primary"
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            `${BACKEND_URI}/api/auth/verify-otp`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                email: formData.email,
                                otp,
                                purpose: "register", // ✅ add this
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
                          setIsOTPSent(false); // hide OTP input
                        } catch (err) {
                          setMessage(err.message);
                          setMessageType("danger");
                        }
                      }}
                    >
                      Verify OTP
                    </Button>

                    {/* Resend OTP Button */}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>

              <div className="text-center mt-3 p-3">
                <span className="text-muted">
                  Already have an account?{" "}
                  <a href="/login" className="text-primary">
                    Login
                  </a>
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