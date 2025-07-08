import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Replace with actual fetch API call
    fetch(`/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data))
      .catch((err) => console.error('Failed to fetch property', err));
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> ₹{property.price}</p>
      {/* Add more property details and images here */}
    </div>
  );
};

export default PropertyDetail;
