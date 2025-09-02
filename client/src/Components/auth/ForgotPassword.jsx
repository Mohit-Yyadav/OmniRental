import React, { useState, useEffect, useRef } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, InputGroup } from "react-bootstrap";
import bgImage from "../../assets/images/bg.jpg";
import LogoM from '../../assets/images/OmniRental4.png';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

const ForgetPassword = () => {
  const navigate = useNavigate();

  // form / flow state
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // loading & UI
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const otpInputRef = useRef(null);
  const timerRef = useRef(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // start countdown when otpTimer > 0
  useEffect(() => {
    if (otpTimer <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // ensure only one interval runs
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [otpTimer]);

  // Utility: display backend-friendly error
  const readError = async (res) => {
    try {
      const data = await res.json();
      return data.message || JSON.stringify(data);
    } catch {
      return res.statusText || "Something went wrong";
    }
  };

  // 1) Send OTP
  const sendOtp = async () => {
    setMessage({ text: "", type: "" });

    if (!email.trim()) {
      setMessage({ text: "Please enter your email", type: "danger" });
      return;
    }

    setIsSendingOtp(true);
    try {
      const res = await fetch(`${BACKEND_URI}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // sending purpose helps backend distinguish flows (optional)
        body: JSON.stringify({ email: email.trim(), purpose: "forgot" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setIsOTPSent(true);
      setOtpTimer(60); // 60s cooldown for resend
      setMessage({ text: "OTP sent to your email. Check your inbox.", type: "success" });

      // autofocus otp input (slight delay for render)
      setTimeout(() => otpInputRef.current?.focus(), 150);
    } catch (err) {
      console.error("sendOtp error:", err);
      setMessage({ text: err.message || "Failed to send OTP", type: "danger" });
    } finally {
      setIsSendingOtp(false);
    }
  };

  // 2) Verify OTP
  const verifyOtp = async () => {
    setMessage({ text: "", type: "" });

    if (!otp.trim()) {
      setMessage({ text: "Please enter the OTP you received", type: "danger" });
      return;
    }

    setIsVerifying(true);
    try {
      const res = await fetch(`${BACKEND_URI}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setIsOTPVerified(true);
      setIsOTPSent(false);
      setOtp(""); // clear otp input
      setMessage({ text: "OTP verified. You can now reset your password.", type: "success" });
    } catch (err) {
      console.error("verifyOtp error:", err);
      setMessage({ text: err.message || "OTP verification failed", type: "danger" });
    } finally {
      setIsVerifying(false);
    }
  };

  // 3) Reset password
  const resetPassword = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    // basic checks
    if (!isOTPVerified) {
      setMessage({ text: "Please verify OTP before resetting password", type: "danger" });
      return;
    }
    if (!password || !confirmPassword) {
      setMessage({ text: "Please fill both password fields", type: "danger" });
      return;
    }
    if (password.length < 6) {
      setMessage({ text: "Password must be at least 6 characters", type: "danger" });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "danger" });
      return;
    }

    setIsResetting(true);
    try {
      const res = await fetch(`${BACKEND_URI}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim() || null, // some backends expect token from verify step; sending otp again is OK if backend expects it
          password: password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Password reset failed");

      setMessage({ text: "Password reset successful. Redirecting to login...", type: "success" });
      // small delay so user sees message
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      console.error("resetPassword error:", err);
      setMessage({ text: err.message || "Password reset failed", type: "danger" });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center bg-light"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="card shadow-lg overflow-hidden">
              <div className="p-4">
                <div className="text-center mb-3">
                  <Link to="/">
                    <img src={LogoM} alt="logo" style={{ width: 160 }} />
                  </Link>
                  <h4 className="mt-3">Forgot Password</h4>
                  <p className="text-muted">Enter your email to receive an OTP and reset password.</p>
                </div>

                {message.text && (
                  <Alert variant={message.type} onClose={() => setMessage({ text: "", type: "" })} dismissible>
                    {message.text}
                  </Alert>
                )}

                {/* Step 1: Email & Send OTP */}
                <Form onSubmit={(e) => e.preventDefault()}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <MdEmail className="me-2" />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        // Reset OTP flow if email changes
                        setIsOTPSent(false);
                        setIsOTPVerified(false);
                        setOtp("");
                        setPassword("");
                        setConfirmPassword("");
                      }}
                      disabled={isOTPVerified} // once verified, lock email
                      required
                      autoComplete="email"
                    />
                  </Form.Group>

                  {!isOTPSent && !isOTPVerified && (
                    <div className="d-grid gap-2 mb-3">
                      <Button variant="primary" onClick={sendOtp} disabled={isSendingOtp}>
                        {isSendingOtp ? <><FaSpinner className="fa-spin me-2" />Sending OTP...</> : "Send OTP"}
                      </Button>
                    </div>
                  )}

                  {/* Step 2: OTP input & verify + resend */}
                  {isOTPSent && !isOTPVerified && (
                    <>
                      <Form.Group className="mb-2">
                        <Form.Label>Enter OTP</Form.Label>
                        <InputGroup>
                          <Form.Control
                            ref={otpInputRef}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="One-time code"
                            aria-label="OTP"
                          />
                          <Button variant="outline-secondary" onClick={verifyOtp} disabled={isVerifying}>
                            {isVerifying ? <><FaSpinner className="fa-spin me-1"/>Verify</> : "Verify"}
                          </Button>
                        </InputGroup>
                        <div className="d-flex justify-content-between mt-2">
                          <small className="text-muted">
                            {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Didn't receive OTP?"}
                          </small>
                          <Button variant="link" onClick={sendOtp} disabled={otpTimer > 0 || isSendingOtp}>
                            {otpTimer > 0 ? "Wait" : "Resend OTP"}
                          </Button>
                        </div>
                      </Form.Group>
                    </>
                  )}

                  {/* Step 3: Reset password - only after OTP verified */}
{isOTPVerified && (
  <>
    <Form.Group className="mb-3">
      <Form.Label>
        <FaLock className="me-2" />
        New Password
      </Form.Label>
      <InputGroup>
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <InputGroup.Text
          style={{ cursor: "pointer" }}
          onClick={() => setShowPassword((s) => !s)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>
        <FaLock className="me-2" />
        Confirm New Password
      </Form.Label>
      <InputGroup>
        <Form.Control
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <InputGroup.Text
          style={{ cursor: "pointer" }}
          onClick={() => setShowConfirmPassword((s) => !s)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>

    <div className="d-grid gap-2 mb-2">
      <Button
        variant="primary"
        type="submit"
        onClick={resetPassword}
        disabled={isResetting}
      >
        {isResetting ? (
          <>
            <FaSpinner className="fa-spin me-2" />
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>
    </div>
  </>
)}


                  <div className="text-center mt-3">
                    <small>
                      Remembered your password? <Link to="/login">Sign in</Link>
                    </small>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgetPassword;