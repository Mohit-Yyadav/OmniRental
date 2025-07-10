import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OwnerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    profileImage: null,
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/owner/${userId}`);
        if (res.data) {
          setFormData({
            name: res.data.name || '',
            email: res.data.email || '',
            phone: res.data.phone || '',
            address: res.data.address || '',
            bio: res.data.bio || '',
            profileImage: null, // File preview not supported
          });
        }
      } catch (err) {
        console.log('No existing profile',err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('userId', userId);
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('bio', formData.bio);
      if (formData.profileImage) data.append('profileImage', formData.profileImage);

      await axios.post("http://localhost:5000/api/owner", data);
      alert('Profile saved successfully');
    } catch (err) {
      console.error(err);
      alert('Error saving profile');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Owner Profile</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {['name', 'email', 'phone', 'address', 'bio'].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {field === 'bio' ? (
              <textarea
                className="form-control"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                className="form-control"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Profile Image</label>
          <input type="file" name="profileImage" className="form-control" onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default OwnerForm;
