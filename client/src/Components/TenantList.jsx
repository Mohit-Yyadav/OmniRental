import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tenants');
      setTenants(res.data);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  const deleteTenant = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tenants/${id}`);
      fetchTenants();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="container my-4 p-4 bg-white rounded shadow">
      <h3 className="mb-4 text-center text-primary">Tenants List</h3>

      {tenants.length === 0 ? (
        <p className="text-muted text-center">No tenants found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Address</th>
                <th>Sell</th>
                <th>Rent</th>
                <th>Parking</th>
                <th>Furnished</th>
                <th>Offer</th>
                <th>Beds</th>
                <th>Baths</th>
                <th>Price (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t._id} className="text-center">
                  <td>
                    {t.imageUrls && t.imageUrls.length > 0 ? (
                      <img
                        src={`http://localhost:5000${t.imageUrls[0]}`}
                        alt="Tenant"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                        }}
                      />
                    ) : (
                      <span className="text-muted">No image</span>
                    )}
                  </td>
                  <td>{t.name}</td>
                  <td>{t.description}</td>
                  <td>{t.address}</td>
                  <td>{t.sell ? '✅' : '❌'}</td>
                  <td>{t.rent ? '✅' : '❌'}</td>
                  <td>{t.parking ? '✅' : '❌'}</td>
                  <td>{t.furnished ? '✅' : '❌'}</td>
                  <td>{t.offer ? '✅' : '❌'}</td>
                  <td>{t.beds}</td>
                  <td>{t.baths}</td>
                  <td>₹{t.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => deleteTenant(t._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => navigate(`/edit-tenant/${t._id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TenantList;
