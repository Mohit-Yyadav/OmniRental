import React from "react";
import { Card, Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";  // 👈 added
import bgImage from '../../assets/images/bg.jpg'; 

const EnterOtp = () => {
  const navigate = useNavigate(); // 👈 initialize

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 Yahan aap OTP validation ka logic lagayengi
    // Abhi ke liye direct redirect
    navigate('/profile'); // 👈 redirect to profile
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
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={6} lg={4}>
            <Card className="shadow p-4 border-0 rounded-4 bg-white bg-opacity-75">
              <h3 className="text-center mb-3 fw-bold">Enter OTP</h3>
              <p className="text-center text-muted mb-4">
                We've sent a 6-digit OTP to your registered email/mobile.
              </p>

              <Form onSubmit={handleSubmit}>  {/* 👈 Added submit handler */}
                <Form.Group className="mb-3" controlId="otp">
                  <Form.Label>OTP Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter 6-digit OTP" maxLength={6} />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Verify OTP
                  </Button>
                </div>
              </Form>

              <div className="mt-4 text-center">
                <small>
                  Didn't get the code?{" "}
                  <Button variant="link" size="sm" className="p-0">
                    Resend OTP
                  </Button>
                </small>
              </div>

              <div className="mt-3 text-center">
                <Link to="/login" className="text-decoration-none">
                  Back to Login
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EnterOtp;
