import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Spinner, Alert } from 'react-bootstrap';
import { Clock, Home, Calendar, DollarSign } from 'lucide-react';
import axios from 'axios';

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - replace with actual API call
  const mockRentals = [
    {
      id: 1,
      propertyName: "Beachfront Villa, Goa",
      duration: 6,
      startDate: "2023-01-15",
      endDate: "2023-07-15",
      amount: 45000,
      status: "completed"
    },
    {
      id: 2,
      propertyName: "City Apartment, Mumbai",
      duration: 12,
      startDate: "2022-06-01",
      endDate: "2023-06-01",
      amount: 35000,
      status: "completed"
    },
    {
      id: 3,
      propertyName: "Mountain Cottage, Shimla",
      duration: 3,
      startDate: "2023-11-01",
      endDate: "2024-02-01",
      amount: 28000,
      status: "active"
    }
  ];

  useEffect(() => {
    const fetchRentalHistory = async () => {
      try {
        // Replace with actual API call
        // const response = await axios.get('/api/rentals/history', {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        // setRentals(response.data);
        
        // Using mock data for now
        setRentals(mockRentals);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load rental history');
      } finally {
        setLoading(false);
      }
    };

    fetchRentalHistory();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    );
  }

  if (!rentals || rentals.length === 0) {
    return (
      <Card className="mt-4">
        <Card.Body className="text-center py-5">
          <Clock size={48} className="mb-3 text-muted" />
          <h5>No rental history found</h5>
          <p className="text-muted">You haven't rented any properties yet.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <Card.Header className="d-flex align-items-center">
        <Clock className="me-2" /> Rental History
      </Card.Header>
      <Card.Body>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Property</th>
              <th>Duration</th>
              <th>Dates</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <Home size={18} className="me-2 text-muted" />
                    {rental.propertyName}
                  </div>
                </td>
                <td>{rental.duration} months</td>
                <td>
                  <div className="d-flex align-items-center">
                    <Calendar size={18} className="me-2 text-muted" />
                    {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <DollarSign size={18} className="me-2 text-muted" />
                    ₹{rental.amount.toLocaleString()}
                  </div>
                </td>
                <td>
                  <Badge bg={rental.status === 'completed' ? 'success' : 'warning'}>
                    {rental.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default RentalHistory;