import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
       const res = await axios.get('http://localhost:5000/api/booking-requests/tenant', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


        setRequests(res.data);
      } catch (error) {
        console.error('❌ Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Booking Requests</h2>
      {requests.length === 0 ? (
        <p>No requests made yet.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req._id} className="p-4 border rounded shadow">
              <p><strong>Property:</strong> {req.propertyId?.title || 'N/A'}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Move-In:</strong> {new Date(req.moveInDate).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> {req.duration} months</p>
              <p><strong>Status:</strong> {req.status} </p>
              <p><strong>Occupation:</strong> {req.occupation}</p>
              <p><strong>Additional Info:</strong> {req.additionalInfo || '—'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRequests;
