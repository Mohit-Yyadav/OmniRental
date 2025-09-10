import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaChevronRight, FaShieldAlt, FaUsers, FaSearch, FaCalendarAlt, FaSmile } from "react-icons/fa";
import axios from "axios";
import "../../assets/css/Mainhome.css";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

// Add this array at the top, just after BACKEND_URI
const heroImages = [

  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1950&q=80&utm_source=chatgpt.com",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1950&q=80&utm_source=chatgpt.com",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80&utm_source=chatgpt.com"
  
];


const Mainhome = () => {
  const [properties, setProperties] = useState([]);
const [currentHero, setCurrentHero] = useState(0);

  // Fetch only 4 properties from backend
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${BACKEND_URI}/api/properties/public?limit=4`);
      setProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties:", error.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

// Preload images
useEffect(() => {
  heroImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}, []);

// Hero slider
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentHero(prev => (prev + 1) % heroImages.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);



  const categories = [
    { name: "Vacation Homes", icon: "🏠", count: 1245 },
    { name: "Cars & Vehicles", icon: "🚗", count: 892 },
    { name: "Event Equipment", icon: "🎤", count: 567 },
    { name: "Tools", icon: "🛠️", count: 1203 },
    { name: "Electronics", icon: "📱", count: 756 },
    { name: "Sports Gear", icon: "⚽", count: 432 },
  ];

  return (
    <div className="main-home">
 {/* Hero Section */}
<section className="hero-section">
  {heroImages.map((image, index) => (
    <div
      key={index}
      className={`hero-slide ${index === currentHero ? "active" : ""}`}
 style={{ 
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0.5, 0.7)), url(${image})` 
}}

    />
  ))}

  <div className="hero-overlay"></div>

  <Container className="hero-container">
    <Row className="justify-content-center align-items-center min-vh-75 py-5">
      <Col lg={8} className="text-center">
        <h1 className="hero-title fs-2">
          Rent Anything You Need, <span className="text-highlight">Anytime</span>
        </h1>
        <p className="hero-subtitle fs-6">
          Join thousands of happy renters saving money and space by borrowing instead of buying. Simple, safe, and sustainable.
        </p>
        <div className="hero-buttons">
          <Button as={Link} to="/rentals" variant="warning" size="lg" className="fw-bold fs-5 rounded-pill hero-btn-primary">
            Explore Rentals Near You
          </Button>
          <Button as={Link} to="/how-it-works" variant="outline-light" size="lg" className="rounded-pill hero-btn-secondary w-30">
            <span className="d-flex align-items-center fs-5 p-1">
              How It Works <FaChevronRight className="ms-2" />
            </span>
          </Button>
        </div>
        <div className="trust-indicators">
          <div className="trust-item"><FaShieldAlt className="trust-icon" /><span>Secure Payments</span></div>
          <div className="trust-item"><FaStar className="trust-icon" /><span>Verified Renters</span></div>
          <div className="trust-item"><FaUsers className="trust-icon" /><span>500,000+ Community</span></div>
        </div>
      </Col>
    </Row>
  </Container>
</section>


      {/* Categories Section */}
      <section className="categories-section py-5">
        <Container>
          <div className="section-header">
            <h2 className="section-title fs-4">Popular Categories</h2>
            <Link to="/categories" className="section-link">
              View all <FaChevronRight />
            </Link>
          </div>
          
          <Row className="g-4">
            {categories.map((category, index) => (
              <Col key={index} xs={6} md={4} lg={2}>
                <Card className="category-card">
                  <Card.Body className="text-center">
                    <div className="category-icon">{category.icon}</div>
                    <h5 className="category-name">{category.name}</h5>
                    <small className="category-count">{category.count} listings</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Property Rentals Section */}
      <section className="featured-section py-5">
        <Container>
          <div className="section-header d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title fs-5">Property Rentals</h2>
            <Link to="/properties" className="section-link">
              View all <FaChevronRight />
            </Link>
          </div>

          <Row className="g-4">
            {properties.map((property) => (
              <Col key={property._id} xs={12} md={6} lg={4} xl={3}>
                <Card className="rental-card h-100 shadow-sm">
                  {property.images?.[0] ? (
                    <Card.Img 
                      variant="top" 
                      src={`${BACKEND_URI}/uploads/${property.images[0]}`} 
                      style={{ height: "200px", objectFit: "cover" }} 
                    />
                  ) : (
                    <div style={{ height: "200px", backgroundColor: "#f0f0f0" }} className="d-flex justify-content-center align-items-center">
                      No Image
                    </div>
                  )}
                  <Card.Body>
                    <h5>{property.name}</h5>
                    <p className="text-muted">{property.address}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-primary fw-bold">
                        ₹{property.personRents?.find(p => p.persons === 1)?.rent || property.rent}
                      </span>
                      <Badge bg={property.status === "Vacant" ? "success" : "secondary"}>
                        {property.status}
                      </Badge>
                    </div>
                    <Link to={`/property/${property._id}`} className="btn btn-outline-primary mt-2 w-100">
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section className="how-it-works py-5">
        <Container>
          <h2 className="section-title text-center mb-5">How OmniRental Works</h2>
          <Row className="g-4">
            <Col md={4} className="text-center">
              <div className="step-card">
                <div className="step-number"><h3>1</h3></div>
                <div className="step-icon"><FaSearch /></div>
                <h4>Find What You Need</h4>
                <p className="step-description">
                  Browse our extensive catalog or search for specific items. Filter by location, price, and more.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="step-card">
                <div className="step-number"><h3>2</h3></div>
                <div className="step-icon"><FaCalendarAlt /></div>
                <h4>Book & Pay Securely</h4>
                <p className="step-description">
                  Choose your dates and book instantly. Our secure payment system protects both parties.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="step-card">
                <div className="step-number"><h3>3</h3></div>
                <div className="step-icon"><FaSmile /></div>
                <h4>Enjoy Your Rental</h4>
                <p className="step-description">
                  Coordinate pickup/delivery with the owner. Enjoy your rental with peace of mind.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container className="text-center">
          <h2 className="cta-title">Ready to find your perfect rental?</h2>
          <p className="cta-subtitle">Join thousands of happy renters and owners today.</p>
          <div className="cta-buttons">
            <Button as={Link} to="/properties" variant="light" size="lg" className="cta-btn-primary">
              Start Exploring
            </Button>
            <Button as={Link} to="/list-property" variant="outline-light" size="lg" className="cta-btn-secondary">
              List Your Item
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Mainhome;
