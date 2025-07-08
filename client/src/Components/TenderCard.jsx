import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const TenderCard = ({ tender }) => {
  return (
    <Card className="h-100 border-0 shadow-sm overflow-hidden hover-effect">
      <div 
        className="bg-secondary" 
        style={{ 
          height: '200px', 
          backgroundImage: `url(${tender.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {tender.featured && (
          <Badge bg="primary" className="m-3">Featured</Badge>
        )}
      </div>
      <Card.Body>
        <div className="d-flex justify-content-between mb-2">
          <Badge bg="light" text="dark" className="fw-normal">
            {tender.category}
          </Badge>
          <div className="d-flex align-items-center">
            <FaStar className="text-warning me-1" />
            <span>{tender.rating}</span>
            <span className="text-muted ms-1">({tender.reviews})</span>
          </div>
        </div>
        <h5 className="mb-1">{tender.title}</h5>
        <p className="text-muted mb-3">{tender.description.substring(0, 100)}...</p>
        <div className="d-flex align-items-center text-muted mb-2">
          <FaMapMarkerAlt className="me-2" />
          <small>{tender.location}</small>
        </div>
        <div className="d-flex align-items-center text-muted mb-3">
          <FaCalendarAlt className="me-2" />
          <small>Available: {tender.availableDates}</small>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-primary">${tender.price}/day</h5>
          <Button 
            as={Link} 
            to={`/tender/${tender.id}`} 
            variant="outline-primary" 
            size="sm"
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TenderCard;