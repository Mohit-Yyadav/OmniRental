import React, { useState } from 'react';
import { FaLock, FaUser, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import rentImage from '../assets/images/rent2.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage({ text: '', type: '' });

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Save token & user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setMessage({ 
      text: "Login successful! Redirecting...", 
      type: "success" 
    });

    // Redirect based on role
    setTimeout(() => {
      if (data.user.role === 'owner') {
        navigate('/owner-dashboard');
      } else {
        navigate('/home');
      }
    }, 1500);

  } catch (error) {
    console.error("Login error:", error);
    setMessage({ 
      text: error.message || "Something went wrong. Please try again.", 
      type: "danger" 
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={7}>
            <div className="card shadow-lg overflow-hidden">
              <Row className="g-0">
                {/* Image Section */}
                <Col md={6} className="d-none d-md-flex">
                  <div 
                    className="h-100 w-100" 
                    style={{
                      backgroundImage: `url(${rentImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      minHeight: '500px'
                    }}
                  />
                </Col>

                {/* Form Section */}
                <Col md={6}>
                  <div className="p-4 p-md-5">
                    <div className="text-center mb-4">
                      <h2 className="fw-bold text-primary">Welcome Back</h2>
                      <p className="text-muted">Sign in to your account</p>
                    </div>

                    {/* Alert Message */}
                    {message.text && (
                      <Alert 
                        variant={message.type} 
                        dismissible
                        onClose={() => setMessage({ text: '', type: '' })}
                        className="mb-4"
                      >
                        {message.text}
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                      {/* Email Field */}
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <MdEmail className="me-2" />
                          Email Address
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <MdEmail />
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>

                      {/* Password Field */}
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaLock className="me-2" />
                          Password
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FaLock />
                          </InputGroup.Text>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <InputGroup.Text 
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>

                      {/* Remember Me & Forgot Password */}
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Form.Check
                          type="checkbox"
                          id="rememberMe"
                          label="Remember me"
                        />
                        <Link to="/forgot-password" className="text-decoration-none">
                          Forgot password?
                        </Link>
                      </div>

                      {/* Submit Button */}
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100 py-2 mb-3"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <FaSpinner className="fa-spin me-2" />
                            Signing In...
                          </>
                        ) : (
                          'Sign In'
                        )}
                      </Button>

                      {/* Social Login Options */}
                      <div className="text-center mb-4">
                        <span className="text-muted">or sign in with</span>
                      </div>
                      <div className="d-flex gap-2 mb-4">
                        <Button variant="outline-primary" className="flex-grow-1">
                          <FaUser className="me-2" />
                          Google
                        </Button>
                        <Button variant="outline-dark" className="flex-grow-1">
                          <FaUser className="me-2" />
                          Facebook
                        </Button>
                      </div>

                      {/* Register Link */}
                      <div className="text-center">
                        <span className="text-muted">Don't have an account? </span>
                        <Link to="/register" className="text-decoration-none fw-bold">
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