import React, { useState, useEffect } from "react";
import axios from "axios";

const OwnerProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: ""
  });

  const ownerId = "64c9...."; // replace with actual logged-in owner's ID

  useEffect(() => {
    axios.get(`/api/owners/${ownerId}`).then(res => {
      setFormData(res.data);
    });
  }, [ownerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/owners/${ownerId}`, formData)
      .then(() => alert("Profile updated"))
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div className="container mt-4">
      <h2>Owner Profile</h2>
      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "address", "bio"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button className="btn btn-primary" type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default OwnerProfile;
