import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdEmail } from "react-icons/md";
import './Auth.css';
import rent from '../assets/images/rent.jpg'; // ✅ Your image

const Register = () => {
  const navigate = useNavigate();

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const usernameChange = (e) => setName(e.target.value);
  const emailChange = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changeConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();

    // ✅ Check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      setMessage("All fields are required");
      setMessageType("danger");
      return;
    }

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("danger");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Registration failed");
        setMessageType("danger");
      } else {
        setMessage("Registration Successful!");
        setMessageType("success");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
      setMessageType("danger");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div className="container p-4 rounded shadow-lg bg-white d-flex flex-md-row flex-column" style={{ maxWidth: '900px' }}>
        
        {/* ✅ Left side with image */}
        <div className="bg-primary text-white p-5 rounded-start w-100 w-md-50 text-center">
          <img src={rent} alt="Rent" className="img-fluid rounded shadow" />
        </div>

        {/* ✅ Right side - Registration Form */}
        <div className="p-5 w-100 w-md-50">
          <h3 className="mb-4 fw-bold">Register Now</h3>

          {/* ✅ Alert message box */}
          {message && (
            <div className={`alert alert-${messageType} alert-dismissible fade show`} role="alert">
              {message}
              <button
                type="button"
                className="btn-close"
                onClick={() => setMessage('')}
                aria-label="Close"
              ></button>
            </div>
          )}

          <form onSubmit={submitHandler}>
            {/* Username Field */}
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label">
                <FaUser className="me-2" /> User Name
              </label>
              <input
                onChange={usernameChange}
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                <MdEmail  className="me-2" /> Email
              </label>
              <input
                onChange={emailChange}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                <FaLock className="me-2" /> Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={changePassword}
                  placeholder="Enter password"
                  required
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                <FaLock className="me-2" /> Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={changeConfirmPassword}
                  placeholder="Confirm password"
                  required
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">Register</button>

            {/* Login Link */}
            <div className="text-center mt-3">
              <small>
                Already have an account?{" "}
                <a href="/login" className="text-primary">Login</a>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
