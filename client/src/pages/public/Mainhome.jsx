import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaChevronRight, FaShieldAlt, FaUsers, FaSearch, FaCalendarAlt, FaSmile } from 'react-icons/fa';
import '../../assets/css/Mainhome.css'; // We'll create this CSS file

const Mainhome = () => {
  // Sample data - same as before
const featuredRentals = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    description: "Stunning 4-bedroom villa with private pool and ocean view",
    price: 350,
    location: "Malibu, CA",
    rating: 4.9,
    reviews: 42,
    category: "Vacation Homes",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Modern Downtown Apartment",
    description: "Cozy 2-bedroom apartment in the heart of the city",
    price: 120,
    location: "New York, NY",
    rating: 4.7,
    reviews: 85,
    category: "City Rentals",
    image: "https://images.unsplash.com/photo-1560448070-c911dbb6b29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Cozy Mountain Cabin",
    description: "Perfect retreat surrounded by nature and hiking trails",
    price: 95,
    location: "Aspen, CO",
    rating: 4.8,
    reviews: 64,
    category: "Cabins",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Elegant Studio Loft",
    description: "Stylish open-concept studio with skyline views",
    price: 140,
    location: "San Francisco, CA",
    rating: 4.6,
    reviews: 30,
    category: "Studios",
    image: "https://images.unsplash.com/photo-1599423300746-b62533397364?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  
  
];

 const categories = [
    { name: "Vacation Homes", icon: "🏠", count: 1245 },
    { name: "Cars & Vehicles", icon: "🚗", count: 892 },
    { name: "Event Equipment", icon: "🎤", count: 567 },
    { name: "Tools", icon: "🛠️", count: 1203 },
    { name: "Electronics", icon: "📱", count: 756 },
    { name: "Sports Gear", icon: "⚽", count: 432 },
  ]; // Your existing category data

  return (
    <div className="main-home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-container">
          <Row className="justify-content-center align-items-center min-vh-75 py-5">
            <Col lg={8} className="text-center">
              <h1 className="hero-title">
                Rent Anything You Need, <span className="text-highlight">Anytime</span>
              </h1>
              <p className="hero-subtitle">
                Join thousands of happy renters saving money and space by borrowing 
                instead of buying. Simple, safe, and sustainable.
              </p>
              <div className="hero-buttons">
                <Button 
                  as={Link} 
                  to="/rentals" 
                  variant="warning" 
                  size="lg" 
                  className="px-4 fw-bold rounded-pill hero-btn-primary"
                >
                  Explore Rentals Near You
                </Button>
                <Button 
                  as={Link} 
                  to="/how-it-works" 
                  variant="outline-light" 
                  size="lg" 
                  className="rounded-pill hero-btn-secondary"
                >
                  <span className="d-flex align-items-center">
                    How It Works <FaChevronRight className="ms-2" />
                  </span>
                </Button>
              </div>
              
              <div className="trust-indicators">
                <div className="trust-item">
                  <FaShieldAlt className="trust-icon" />
                  <span>Secure Payments</span>
                </div>
                <div className="trust-item">
                  <FaStar className="trust-icon" />
                  <span>Verified Renters</span>
                </div>
                <div className="trust-item">
                  <FaUsers className="trust-icon" />
                  <span>500,000+ Community</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-5">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Popular Categories</h2>
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
      
      {/* Featured Rentals */}
      <section className="featured-section py-5">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Featured Rentals</h2>
            <Link to="/properties" className="section-link">
              View all <FaChevronRight />
            </Link>
          </div>
          
          <Row className="g-4">
            {featuredRentals.map(rental => (
              <Col key={rental.id} xs={12} md={6} lg={4} xl={3}>
                <Card className="rental-card">
                  <div 
                    className="rental-image"
                    style={{ backgroundImage: `url(${rental.image})` }}
                  >
                    <Badge bg="primary" className="featured-badge">Featured</Badge>
                  </div>
                  <Card.Body>
                    <div className="rental-meta">
                      <Badge bg="light" text="dark" className="rental-category">
                        {rental.category}
                      </Badge>
                      <div className="rental-rating">
                        <FaStar className="rating-icon" />
                        <span>{rental.rating}</span>
                        <span className="rating-count">({rental.reviews})</span>
                      </div>
                    </div>
                    <h5 className="rental-title">{rental.title}</h5>
                    <p className="rental-description">{rental.description}</p>
                    <div className="rental-footer">
                      <div className="rental-location">
                        <FaMapMarkerAlt className="location-icon" />
                        <small>{rental.location}</small>
                      </div>
                      <h5 className="rental-price">${rental.price}<span>/day</span></h5>
                    </div>
                  </Card.Body>
                  <Card.Footer className="rental-actions">
                    <Button as={Link} to={`/rental/${rental.id}`} variant="outline-primary" className="w-100">
                      View Details
                    </Button>
                  </Card.Footer>
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
                <div className="step-number">
                  <h3>1</h3>
                </div>
                <div className="step-icon">
                  <FaSearch />
                </div>
                <h4>Find What You Need</h4>
                <p className="step-description">
                  Browse our extensive catalog or search for specific items. Filter by location, price, and more.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="step-card">
                <div className="step-number">
                  <h3>2</h3>
                </div>
                <div className="step-icon">
                  <FaCalendarAlt />
                </div>
                <h4>Book & Pay Securely</h4>
                <p className="step-description">
                  Choose your dates and book instantly. Our secure payment system protects both parties.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="step-card">
                <div className="step-number">
                  <h3>3</h3>
                </div>
                <div className="step-icon">
                  <FaSmile />
                </div>
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
            <Button variant="light" size="lg" className="cta-btn-primary">
              Start Exploring
            </Button>
            <Button variant="outline-light" size="lg" className="cta-btn-secondary">
              List Your Item
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Mainhome;