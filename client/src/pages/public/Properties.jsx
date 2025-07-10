import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Home, Building, Star, Filter, Heart } from 'lucide-react';

const Properties = () => {
  // Sample property data
  const properties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "New York, NY",
      price: "$2,500/month",
      beds: 2,
      baths: 1,
      sqft: 950,
      type: "Apartment",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Luxury Villa with Pool",
      location: "Miami, FL",
      price: "$4,200/month",
      beds: 4,
      baths: 3,
      sqft: 2200,
      type: "Villa",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Cozy Suburban House",
      location: "Austin, TX",
      price: "$1,800/month",
      beds: 3,
      baths: 2,
      sqft: 1500,
      type: "House",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      title: "Studio in Arts District",
      location: "Los Angeles, CA",
      price: "$1,650/month",
      beds: 1,
      baths: 1,
      sqft: 650,
      type: "Studio",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 fw-bold mb-3">Find Your Perfect Property</h1>
          <p className="lead text-muted">
            Browse our curated selection of premium rentals across the country
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-3">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <Search size={18} />
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-start-0" 
                    placeholder="Search by location or property name"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select className="form-select">
                  <option>Property Type</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villa</option>
                  <option>Condo</option>
                </select>
              </div>
              <div className="col-md-3">
                <select className="form-select">
                  <option>Price Range</option>
                  <option>$0 - $1,000</option>
                  <option>$1,000 - $2,000</option>
                  <option>$2,000 - $3,000</option>
                  <option>$3,000+</option>
                </select>
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                  <Filter size={18} /> Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="row g-4">
        {properties.map((property) => (
          <div key={property.id} className="col-md-6 col-lg-4 col-xl-3">
            <div className="card h-100 border-0 shadow-sm overflow-hidden">
              <div className="position-relative">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="card-img-top property-image"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="position-absolute top-0 end-0 m-2">
                  <button className="btn btn-sm btn-light rounded-circle">
                    <Heart size={16} />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{property.title}</h5>
                  <div className="d-flex align-items-center gap-1">
                    <Star size={16} className="text-warning" fill="currentColor" />
                    <span>{property.rating}</span>
                  </div>
                </div>
                <p className="card-text text-muted d-flex align-items-center gap-1 mb-2">
                  <MapPin size={16} className="text-primary" />
                  <small>{property.location}</small>
                </p>
                <div className="d-flex gap-3 mb-3">
                  <small className="text-muted d-flex align-items-center gap-1">
                    <Home size={16} />
                    {property.type}
                  </small>
                  <small className="text-muted d-flex align-items-center gap-1">
                    <Building size={16} />
                    {property.beds} beds, {property.baths} baths
                  </small>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 text-primary">{property.price}</h5>
                  <Link to={`/property/${property.id}`} className="btn btn-sm btn-outline-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="row mt-4">
        <div className="col-12">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <span className="page-link">Previous</span>
              </li>
              <li className="page-item active"><span className="page-link">1</span></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Properties;