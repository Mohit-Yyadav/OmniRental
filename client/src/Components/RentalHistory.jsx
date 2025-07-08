import React, { useState, useEffect } from 'react';
import { Table, Badge, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaCalendarAlt } from 'react-icons/fa';

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRentalHistory = async () => {
      try {
        const res = await axios.get('/api/tenants/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setRentals(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch rental history');
      } finally {
        setLoading(false);
      }
    };

    fetchRentalHistory();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      case 'completed':
        return <Badge bg="info">Completed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h5 className="mb-4">My Rental History</h5>
      
      {rentals.length === 0 ? (
        <Alert variant="info">You haven't rented any properties yet</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Property</th>
              <th>Dates</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental._id}>
                <td>
                  <strong>{rental.tender.title}</strong>
                  <div className="text-muted small">
                    {rental.tender.location.formattedAddress}
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <FaCalendarAlt className="me-2" />
                    {new Date(rental.startDate).toLocaleDateString()} - {' '}
                    {new Date(rental.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  ${rental.tender.pricePerDay}/day
                </td>
                <td>
                  {getStatusBadge(rental.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RentalHistory;