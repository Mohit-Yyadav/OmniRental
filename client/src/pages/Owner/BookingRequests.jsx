// client/src/pages/owner/BookingRequests.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token'); // ✅ Correct token access

 

  const fetchRequests = () => {
    axios.get("http://localhost:5000/api/booking-requests/owner", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Use this instead of user.token
      },
    })
    .then(res => setRequests(res.data))
    .catch(err => console.error(err));
  };

  useEffect(() => {
    if (token) fetchRequests(); // ✅ Ensure token exists
  }, []);

  const handleStatusChange = (id, status) => {
    axios
      .put(
        `http://localhost:5000/api/booking-requests/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => fetchRequests())
      .catch((err) => alert('Failed to update status'));
  };

  return (
    <div className="container mt-4">
      <h2>Incoming Booking Requests</h2>
      {requests.length === 0 ? (
        <p>No incoming requests.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} className="card mb-3 p-3">
            <h5>{req.propertyId?.name}</h5>
            <p>Tenant: {req.tenantId?.username}</p>
            <p>Status: <strong>{req.status}</strong></p>
            <div className="d-flex gap-2">
              <button
                onClick={() => handleStatusChange(req._id, 'approved')}
                className="btn btn-success btn-sm"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange(req._id, 'rejected')}
                className="btn btn-danger btn-sm"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingRequests;
