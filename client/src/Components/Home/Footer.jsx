import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row>
          <Col lg={4} className="mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">OmniRental</h5>
            <p>
              The premier platform for renting anything you need from people in your community.
              Simple, safe, and convenient.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><FaFacebook size={20} /></a>
              <a href="#" className="text-white"><FaTwitter size={20} /></a>
              <a href="#" className="text-white"><FaInstagram size={20} /></a>
              <a href="#" className="text-white"><FaLinkedin size={20} /></a>
            </div>
          </Col>
          
          <Col md={4} lg={2} className="mb-4 mb-md-0">
            <h6 className="text-uppercase mb-4">Renters</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/how-it-works" className="text-white-50 text-decoration-none">How it works</Link></li>
              <li className="mb-2"><Link to="/rentals" className="text-white-50 text-decoration-none">Browse rentals</Link></li>
              <li className="mb-2"><Link to="/categories" className="text-white-50 text-decoration-none">Categories</Link></li>
              <li className="mb-2"><Link to="/safety" className="text-white-50 text-decoration-none">Safety tips</Link></li>
            </ul>
          </Col>
          
          <Col md={4} lg={2} className="mb-4 mb-md-0">
            <h6 className="text-uppercase mb-4">Owners</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/list-item" className="text-white-50 text-decoration-none">List your item</Link></li>
              <li className="mb-2"><Link to="/owner-guide" className="text-white-50 text-decoration-none">Owner's guide</Link></li>
              <li className="mb-2"><Link to="/pricing" className="text-white-50 text-decoration-none">Pricing</Link></li>
              <li className="mb-2"><Link to="/resources" className="text-white-50 text-decoration-none">Resources</Link></li>
            </ul>
          </Col>
          
          <Col md={4} lg={2} className="mb-4 mb-md-0">
            <h6 className="text-uppercase mb-4">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/about" className="text-white-50 text-decoration-none">About us</Link></li>
              <li className="mb-2"><Link to="/careers" className="text-white-50 text-decoration-none">Careers</Link></li>
              <li className="mb-2"><Link to="/press" className="text-white-50 text-decoration-none">Press</Link></li>
              <li className="mb-2"><Link to="/blog" className="text-white-50 text-decoration-none">Blog</Link></li>
            </ul>
          </Col>
          
          <Col md={4} lg={2}>
            <h6 className="text-uppercase mb-4">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/help" className="text-white-50 text-decoration-none">Help Center</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-white-50 text-decoration-none">Contact us</Link></li>
              <li className="mb-2"><Link to="/privacy" className="text-white-50 text-decoration-none">Privacy</Link></li>
              <li className="mb-2"><Link to="/terms" className="text-white-50 text-decoration-none">Terms</Link></li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4 bg-secondary" />
        
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0 text-white-50">
              &copy; {new Date().getFullYear()} OmniRental. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <Link to="/privacy" className="text-white-50 text-decoration-none">Privacy Policy</Link>
              <Link to="/terms" className="text-white-50 text-decoration-none">Terms of Service</Link>
              <Link to="/sitemap" className="text-white-50 text-decoration-none">Sitemap</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;