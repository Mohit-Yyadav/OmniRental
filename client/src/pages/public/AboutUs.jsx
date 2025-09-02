import React from 'react';
import { Users, Home, Award, Shield, Heart } from 'lucide-react';


const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Real estate expert with 15+ years experience in property management",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Operations",
      bio: "Specializes in customer experience and service excellence",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "David Rodriguez",
      role: "Property Specialist",
      bio: "Local market expert with deep knowledge of premium properties",
      image: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      id: 4,
      name: "Emily Wilson",
      role: "Customer Relations",
      bio: "Dedicated to ensuring every client finds their perfect home",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Properties Listed" },
    { value: "95%", label: "Customer Satisfaction" },
    { value: "50+", label: "Cities Covered" },
    { value: "15", label: "Years Experience" }
  ];

  return (
 <>
     
     <div className="container py-5">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold mb-3 mt-4">Our Story</h1>
          <p className=" text-muted mb-4">
            OmniRental was founded in 2025 with a simple mission: to make finding premium rental properties effortless and enjoyable.
          </p>
          <div className="d-flex gap-3">
            <button className="btn btn-primary px-4">Our Services</button>
            <button className="btn btn-outline-secondary px-4">Contact Us</button>
          </div>
        </div>
        <div className="col-lg-6 mt-4 mt-lg-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
            alt="Luxury property" 
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="row mb-5 py-4 bg-light rounded-3">
        {stats.map((stat, index) => (
          <div key={index} className="col-6 col-md-3 text-center py-3">
            <h2 className="fw-bold text-primary">{stat.value}</h2>
            <p className="mb-0 text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Our Mission</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 h-100 bg-transparent">
                <div className="card-body text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                    <Home size={24} className="text-primary" />
                  </div>
                  <h5 className="card-title">Find Your Home</h5>
                  <p className="card-text text-muted">
                    We help you discover properties that match your lifestyle and budget
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 h-100 bg-transparent">
                <div className="card-body text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                    <Shield size={24} className="text-primary" />
                  </div>
                  <h5 className="card-title">Trusted Service</h5>
                  <p className="card-text text-muted">
                    Verified listings and transparent processes you can rely on
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 h-100 bg-transparent">
                <div className="card-body text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                    <Award size={24} className="text-primary" />
                  </div>
                  <h5 className="card-title">Premium Quality</h5>
                  <p className="card-text text-muted">
                    Only the finest properties that meet our exacting standards
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 h-100 bg-transparent">
                <div className="card-body text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                    <Heart size={24} className="text-primary" />
                  </div>
                  <h5 className="card-title">Customer Care</h5>
                  <p className="card-text text-muted">
                    Dedicated support throughout your rental journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Meet Our Team</h2>
          <div className="row g-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title mb-1">{member.name}</h5>
                    <p className="text-muted mb-2">{member.role}</p>
                    <p className="card-text small">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="row">
        <div className="col-12">
          <div className="bg-primary text-white rounded-3 p-5 text-center">
            <h2 className="fw-bold mb-3">Ready to Find Your Dream Home?</h2>
            <p className="mb-4 text-white-75">
              Join thousands of satisfied renters who found their perfect property with OmniRental
            </p>
            <button className="btn btn-light px-4">Browse Properties</button>
          </div>
        </div>
      </div>
    </div>

   

    </>

    
  );
};

export default AboutUs;