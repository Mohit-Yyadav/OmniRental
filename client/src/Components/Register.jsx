// import React, { useState } from 'react';
// import { FaUser, FaLock, FaEye, FaEyeSlash, FaBuilding, FaHome } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { MdEmail } from "react-icons/md";
// import './Auth.css';
// import rent from '../assets/images/rent.jpg';

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'tenant' // default to tenant
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

//  const submitHandler = async (e) => {
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
//     const res = await fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role // Ensure role is included
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Registration failed");
//     }

//     setMessage("Registration Successful!");
//     setMessageType("success");
    
//     // Log the full response for debugging
//     console.log("Registration response:", data);
    
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
//         <div className="bg-primary text-white p-5 rounded-start w-100 w-md-50 text-center">
//           <img src={rent} alt="Rent" className="img-fluid rounded shadow" />
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
//             <div className="mb-3">
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
//             </div>

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


import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaBuilding, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdEmail } from "react-icons/md";
import './Auth.css';
import rent from '../assets/images/rent.jpg';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tenant' // default to tenant
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
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

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Registration Successful! Redirecting to login...");
      setMessageType("success");
      
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error("Registration error:", error);
      setMessage(error.message || "Something went wrong. Please try again.");
      setMessageType("danger");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div className="container p-4 rounded shadow-lg bg-white d-flex flex-md-row flex-column" style={{ maxWidth: '900px' }}>
        {/* Left side with image */}
        <div className="bg-primary text-white p-5 rounded-start w-100 w-md-50 text-center">
          <img src={rent} alt="Rent" className="img-fluid rounded shadow" />
        </div>

        {/* Right side - Registration Form */}
        <div className="p-5 w-100 w-md-50">
          <h3 className="mb-4 fw-bold">Register Now</h3>

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
            {/* Role Selection */}
            <div className="mb-3">
              <label className="form-label">Register as:</label>
              <div className="d-flex gap-3">
                <div className="form-check flex-grow-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="tenant"
                    value="tenant"
                    checked={formData.role === 'tenant'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label d-flex align-items-center" htmlFor="tenant">
                    <FaHome className="me-2" /> Tenant
                  </label>
                </div>
                <div className="form-check flex-grow-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="landlord"
                    value="landlord"
                    checked={formData.role === 'landlord'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label d-flex align-items-center" htmlFor="landlord">
                    <FaBuilding className="me-2" /> Landlord
                  </label>
                </div>
              </div>
            </div>

            {/* Username Field */}
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label">
                <FaUser className="me-2" /> User Name
              </label>
              <input
                name="username"
                onChange={handleChange}
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
                <MdEmail className="me-2" /> Email
              </label>
              <input
                name="email"
                onChange={handleChange}
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
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
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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

            <button type="submit" className="btn btn-primary w-100">Register</button>

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