import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
// Replace the import with a direct image URL
const heroImage = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const Home = () => {
  // Sample data - replace with real API calls
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
  {
    id: 5,
    title: "Historic Townhouse",
    description: "Charming 3-bedroom home with antique decor and modern comfort",
    price: 160,
    location: "Savannah, GA",
    rating: 4.7,
    reviews: 53,
    category: "Historic Homes",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Pet-Friendly Bungalow",
    description: "Bright and airy 2-bedroom home with fenced backyard",
    price: 110,
    location: "Austin, TX",
    rating: 4.5,
    reviews: 22,
    category: "Pet-Friendly",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Eco-Friendly Treehouse",
    description: "Unique stay nestled in treetops with all green amenities",
    price: 130,
    location: "Portland, OR",
    rating: 4.9,
    reviews: 17,
    category: "Unique Stays",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "Lakeview Cottage",
    description: "Quaint cottage with dock access and canoe rentals",
    price: 125,
    location: "Lake Tahoe, CA",
    rating: 4.8,
    reviews: 41,
    category: "Cottages",
    image: "https://images.unsplash.com/photo-1505693416373-2f3af0a4d7c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    title: "Luxury High-Rise Condo",
    description: "Spacious condo with balcony and skyline views",
    price: 200,
    location: "Chicago, IL",
    rating: 4.6,
    reviews: 29,
    category: "Condos",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9f57c67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    title: "Desert Retreat",
    description: "Beautiful adobe home surrounded by desert scenery",
    price: 145,
    location: "Sedona, AZ",
    rating: 4.9,
    reviews: 35,
    category: "Desert Homes",
    image: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    title: "Countryside Farmhouse",
    description: "Spacious 5-bedroom farmhouse ideal for families",
    price: 180,
    location: "Lancaster, PA",
    rating: 4.8,
    reviews: 50,
    category: "Farm Stays",
    image: "https://images.unsplash.com/photo-1576675783491-8457b90f87b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    title: "Ski-In/Ski-Out Chalet",
    description: "Perfect winter escape with mountain access",
    price: 220,
    location: "Vail, CO",
    rating: 5.0,
    reviews: 39,
    category: "Ski Lodges",
    image: "https://images.unsplash.com/photo-1512915929133-30f746a11667?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
    // Add more sample rentals...
  ];

  const categories = [
    { name: "Vacation Homes", icon: "🏠", count: 1245 },
    { name: "Cars & Vehicles", icon: "🚗", count: 892 },
    { name: "Event Equipment", icon: "🎤", count: 567 },
    { name: "Tools", icon: "🛠️", count: 1203 },
    { name: "Electronics", icon: "📱", count: 756 },
    { name: "Sports Gear", icon: "⚽", count: 432 },
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
  <div 
  className="py-5 text-white position-relative"
  style={{ 
    minHeight: '100vh',
    overflow: 'hidden'
  }}
>
  {/* Background image with overlay */}
  <div 
    className="position-absolute top-0 start-0 w-100 h-100"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: -1
    }}
  ></div>

  <Container className="h-100 d-flex align-items-center">
    <Row className="justify-content-center text-center ">
      <Col lg={8} className="animate__animated animate__fadeIn">
        <h1 className="display-3 fw-bold mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
          Rent Anything You Need, <span className="text-warning">Anytime</span>
        </h1>
        <p className="lead mb-5 fs-4" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
          Join thousands of happy renters saving money and space by borrowing <br className="d-none d-lg-block" />
          instead of buying. Simple, safe, and sustainable.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Button 
            as={Link} 
            to="/rentals" 
            variant="warning" 
            size="lg" 
            className="px-4 fw-bold rounded-pill shadow"
          >
            Explore Rentals Near You
          </Button>
          <Button 
            as={Link} 
            to="/how-it-works" 
            variant="outline-light" 
            size="lg" 
            className="rounded-pill shadow"
          >
            <span className="d-flex align-items-center">
              How It Works <i className="bi bi-arrow-right ms-2"></i>
            </span>
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-5 pt-4 d-flex flex-wrap justify-content-center gap-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-shield-check fs-4 me-2 text-warning"></i>
            <span>Secure Payments</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-star-fill fs-4 me-2 text-warning"></i>
            <span>Verified Renters</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-people-fill fs-4 me-2 text-warning"></i>
            <span>500,000+ Community</span>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
</div>
      
      {/* Categories Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Popular Categories</h2>
            <Link to="/categories" className="text-decoration-none">
              View all <FaChevronRight size={14} />
            </Link>
          </div>
          
          <Row className="g-4">
            {categories.map((category, index) => (
              <Col key={index} xs={6} md={4} lg={2}>
                <Card className="h-100 border-0 shadow-sm hover-effect">
                  <Card.Body className="text-center">
                    <div className="display-4 mb-3">{category.icon}</div>
                    <h5 className="mb-1">{category.name}</h5>
                    <small className="text-muted">{category.count} listings</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Featured Rentals */}
      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Featured Rentals</h2>
            <Link to="/rentals" className="text-decoration-none">
              View all <FaChevronRight size={14} />
            </Link>
          </div>
          
          <Row className="g-4">
            {featuredRentals.map(rental => (
              <Col key={rental.id} xs={12} md={6} lg={4} xl={3}>
                <Card className="h-100 border-0 shadow-sm overflow-hidden">
                  <div 
                    className="bg-secondary" 
                    style={{ 
                      height: '200px', 
                      backgroundImage: `url(${rental.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <Badge bg="primary" className="m-3">Featured</Badge>
                  </div>
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <Badge bg="light" text="dark" className="fw-normal">
                        {rental.category}
                      </Badge>
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning me-1" />
                        <span>{rental.rating}</span>
                        <span className="text-muted ms-1">({rental.reviews})</span>
                      </div>
                    </div>
                    <h5 className="mb-1">{rental.title}</h5>
                    <p className="text-muted mb-3">{rental.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center text-muted">
                        <FaMapMarkerAlt className="me-1" />
                        <small>{rental.location}</small>
                      </div>
                      <h5 className="mb-0 text-primary">${rental.price}/day</h5>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0">
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
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">How OmniRental Works</h2>
          <Row className="g-4">
            <Col md={4} className="text-center">
              <div className="p-4">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                  <h3 className="text-white mb-0">1</h3>
                </div>
                <h4>Find What You Need</h4>
                <p className="text-muted">
                  Browse our extensive catalog or search for specific items. Filter by location, price, and more.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="p-4">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                  <h3 className="text-white mb-0">2</h3>
                </div>
                <h4>Book & Pay Securely</h4>
                <p className="text-muted">
                  Choose your dates and book instantly. Our secure payment system protects both parties.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="p-4">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                  <h3 className="text-white mb-0">3</h3>
                </div>
                <h4>Enjoy Your Rental</h4>
                <p className="text-muted">
                  Coordinate pickup/delivery with the owner. Enjoy your rental with peace of mind.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="mb-4">Ready to find your perfect rental?</h2>
          <p className="lead mb-4">Join thousands of happy renters and owners today.</p>
          <Button variant="light" size="lg" className="me-2 px-4">
            Start Exploring
          </Button>
          <Button variant="outline-light" size="lg" className="px-4">
            List Your Item
          </Button>
        </Container>
      </section>
      
      <Footer />
    </>
  );
};

export default Home;