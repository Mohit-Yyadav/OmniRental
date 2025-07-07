import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTenant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rentAmount: '',
    address: '',
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTenant = async () => {
      const res = await axios.get(`http://localhost:5000/api/tenants`);
      const tenant = res.data.find(t => t._id === id);
      if (tenant) setFormData(tenant);
    };
    fetchTenant();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/tenants/${id}`, formData);
    setSuccessMessage("✅ Tenant updated successfully!"); // ✅ Message set
    setTimeout(() => {
      navigate("/tenants");
    }, 1500); // 1.5 sec ke baad redirect
  };

  return (
    <div className="container mt-4">
      <h3>Edit Tenant</h3>
        {/* ✅ Success Message */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <input type="number" name="rentAmount" className="form-control" value={formData.rentAmount} onChange={handleChange} />
        </div>
        <div className="col-12">
          <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditTenant;
