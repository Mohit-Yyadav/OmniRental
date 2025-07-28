import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapPin, Home, Heart, Star } from 'lucide-react';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    furnished: '',
    sharing: '',
    minPrice: '',
    maxPrice: ''
  });

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${BACKEND_URI}/api/properties/public`);
      setProperties(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(property => {
    // Search filter
    const matchesSearch = 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = filters.type ? property.type === filters.type : true;
    
    // Furnished filter
    const matchesFurnished = filters.furnished ? property.furnished === filters.furnished : true;
    
    // Sharing filter
    const matchesSharing = filters.sharing ? property.sharing === filters.sharing : true;
    
    // Price filter
    const matchesPrice = 
      (filters.minPrice ? property.rent >= parseInt(filters.minPrice) : true) &&
      (filters.maxPrice ? property.rent <= parseInt(filters.maxPrice) : true);
    
    return matchesSearch && matchesType && matchesFurnished && matchesSharing && matchesPrice;
  });

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 fw-bold mb-3">Find Your Perfect Home</h1>
          <p className="lead text-muted">
            Browse our selection of premium rentals
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-3">
            <div className="row g-3">
              <div className="col-md-4">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search by location or property name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="col-md-2">
                <select 
                  className="form-select"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">All Types</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
              
              <div className="col-md-2">
                <select 
                  className="form-select"
                  value={filters.furnished}
                  onChange={(e) => setFilters({...filters, furnished: e.target.value})}
                >
                  <option value="">Any Furnishing</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi Furnished">Semi Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
              
              <div className="col-md-2">
                <select 
                  className="form-select"
                  value={filters.sharing}
                  onChange={(e) => setFilters({...filters, sharing: e.target.value})}
                >
                  <option value="">Any Sharing</option>
                  <option value="Single">Single</option>
                  <option value="Shared">Shared</option>
                </select>
              </div>
              
              <div className="col-md-2">
                <div className="input-group">
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  />
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-5">
          <h4>No properties found matching your criteria</h4>
          <button 
            className="btn btn-link"
            onClick={() => {
              setSearchTerm('');
              setFilters({
                type: '',
                furnished: '',
                sharing: '',
                minPrice: '',
                maxPrice: ''
              });
            }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProperties.map((property) => (
            <div key={property._id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 border-0 shadow-sm overflow-hidden">
                <div className="position-relative">
                  {property.images && property.images.length > 0 ? (
  <img
    src={`${BACKEND_URI}/uploads/${property.images[0]}`}
    alt={property.name}
    className="img-fluid w-100"
    style={{ height: '200px', objectFit: 'cover' }}
  />
) : (
  <div 
    className="property-image-placeholder bg-light d-flex align-items-center justify-content-center"
    style={{ height: '200px' }}
  >
    <Home size={48} className="text-muted" />
  </div>
)}

                  <div className="position-absolute top-0 end-0 m-2">
                    <button className="btn btn-sm btn-light rounded-circle">
                      <Heart size={16} />
                    </button>
                  </div>
                  {property.status === 'Vacant' && (
                    <div className="position-absolute top-0 start-0 m-2">
                      <span className="badge bg-success">Available</span>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{property.name}</h5>
                    <div className="text-primary fw-bold">
  ₹{(() => {
    const onePersonRent = property.personRents?.find(p => p.persons === 1)?.rent;
    return typeof onePersonRent === 'number' ? onePersonRent.toLocaleString() : 'N/A';
  })()}
  {/* <small className="text-muted"> / person</small> */}
</div>

                  </div>
                  <p className="card-text text-muted d-flex align-items-center gap-1 mb-2">
                    <MapPin size={16} className="text-primary" />
                    <small>{ property.address}</small>
                  </p>
                  <div className="d-flex gap-3 mb-3">
                    <small className="text-muted">
                      {property.type}
                    </small>
                    <small className="text-muted">
                      {property.furnished}
                    </small>
                    <small className="text-muted">
                      {property.sharing}
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    {/* <small className="text-muted">Room No: {property.roomNo}</small> */}
                    <Link
  to={`/property/${property._id}`}
  className="btn btn-sm btn-outline-primary w-100 mt-2"
>
  View Details
</Link>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Property;