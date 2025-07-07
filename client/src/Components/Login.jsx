import React, { useState } from 'react';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import rent2 from '../assets/images/rent2.jpg';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const changeEmail = (event) => setEmail(event.target.value);
  const changePassword = (event) => setPassword(event.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        setMessageType("success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage(data.message || "Login failed");
        setMessageType("danger");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again.");
      setMessageType("danger");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div className="container p-4 rounded shadow-lg bg-white d-flex flex-md-row flex-column" style={{ maxWidth: '900px' }}>
        
        {/* ✅ Left side image */}
        <div className="bg-primary text-white p-5 rounded-start w-100 w-md-50 text-center">
          <img src={rent2} alt="Rent" className="img-fluid rounded shadow" />
        </div>

        {/* ✅ Right side login form */}
        <div className="p-5 w-100 w-md-50">
          <h3 className="mb-4 fw-bold">Login</h3>

          {/* ✅ Alert message */}
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
            {/* Email Field */}
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                <MdEmail className="me-2" /> Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="form-control"
                value={email}
                onChange={changeEmail}
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
                  id="password"
                  placeholder="Enter your password"
                  className="form-control"
                  value={password}
                  onChange={changePassword}
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

            {/* Remember Me & Forgot */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label htmlFor="remember" className="form-check-label">Remember me</label>
              </div>
              <a href="/forgotpassword" className="text-decoration-none">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" to="/dashboard">Login</button>

            {/* Register Link */}
            <div className="text-center mt-3">
              <a href="/register" className="text-decoration-none">Register a new account!</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
