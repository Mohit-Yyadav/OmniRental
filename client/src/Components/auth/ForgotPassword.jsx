import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import logo from '../../assets/images/OmniRental4.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";

// ✅ Agar background image aapke assets me hai, to aise import karein
import bgImage from '../../assets/images/bg.jpg'; // <-- change to your image file

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Email is required');
      setMessageType('danger');
      return;
    }

    try {
      // await axios.post('/api/forgot-password', { email });

      setMessage('Reset link sent to your email!');
      setMessageType('success');

      setTimeout(() => {
        navigate('/enter-otp', { state: { email } });
      }, 1000);
    } catch (error) {
      setMessage(error.message || 'Something went wrong');
      setMessageType('danger');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center px-3"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white shadow p-4 p-md-5 rounded" style={{ width: '100%', maxWidth: '440px' }}>
        
        {/* Logo */}
        <div className="text-center mb-4">
          <Link to="/">
            <img
              src={logo}
              alt="OmniRental Logo"
              className="img-fluid"
              style={{ maxWidth: '130px', height: 'auto', cursor: 'pointer' }}
            />
          </Link>
        </div>

        {/* Heading */}
        <h4 className="text-center fw-bold mb-2">Forgot your password</h4>
        <p className="text-center text-muted mb-4" style={{ fontSize: '0.95rem' }}>
          Please enter the email address you'd like your password reset information sent to
        </p>

        {/* Alert */}
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 fw-semibold">
            Request reset link
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-4">
          <Link to="/login" className="text-decoration-none text-primary fw-medium">
            Back To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
