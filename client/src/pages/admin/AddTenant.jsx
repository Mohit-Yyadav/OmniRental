// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// const AddTenant = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     rentAmount: '',
//     address: '',
//   });
//   // const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/tenants', formData);
//       alert("Tenant added successfully!");
//       setFormData({ name: '', email: '', phone: '', rentAmount: '', address: '' });
//     } catch (err) {
//       console.error(err);
//       alert("Error adding tenant");
//     }
//   };

//   return (
//     <Container className="mt-4 p-4 bg-white rounded shadow">
//       <h3 className="mb-4 text-center text-success">Add New Tenant</h3>
//       <Form onSubmit={handleSubmit}>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control 
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter tenant name"
//                 required
//               />
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control 
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group controlId="formPhone">
//               <Form.Label>Phone</Form.Label>
//               <Form.Control 
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Enter phone number"
//                 required
//               />
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group controlId="formRent">
//               <Form.Label>Rent Amount</Form.Label>
//               <Form.Control 
//                 type="number"
//                 name="rentAmount"
//                 value={formData.rentAmount}
//                 onChange={handleChange}
//                 placeholder="Enter rent amount"
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Form.Group controlId="formAddress" className="mb-3">
//           <Form.Label>Address</Form.Label>
//           <Form.Control 
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Enter address"
//             required
//           />
//         </Form.Group>

//         <div className="text-center">
//           <Button variant="primary" type="submit">
//             Add Tenant
//           </Button>
//         </div>
//       </Form>
//     </Container>
//   );

// };

// export default AddTenant;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// const AddTenant = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     address: '',
//     sell: false,
//     rent: false,
//     parking: false,
//     furnished: false,
//     offer: false,
//     beds: 1,
//     baths: 1,
//     price: 0,
//     images: [],
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === 'checkbox') {
//       setFormData({ ...formData, [name]: checked });
//     } else if (type === 'file') {
//       setFormData({ ...formData, images: files });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === 'images') {
//         Array.from(formData.images).forEach((file) => data.append('images', file));
//       } else {
//         data.append(key, formData[key]);
//       }
//     });

//     const res = await axios.post('http://localhost:5000/api/tenants', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (res.status === 201) {
//       alert('Listing created successfully!');
//     }
//   } catch (err) {
//     console.error(err);
//     alert('Error creating listing');
//   }
// };


//   return (
//     <Container className="mt-4 p-4 bg-light rounded shadow ">
//       <h3 className="text-center mb-4">Create a Listing</h3>
//       <Form onSubmit={handleSubmit} encType="multipart/form-data">
//         <Row className="mb-3">
//           <Col md={6}><Form.Control name="name" placeholder="Name" onChange={handleChange} required /></Col>
//           <Col md={6}>
//             <Form.Label>Images: <small>(Max 6)</small></Form.Label>
//             <Form.Control type="file" name="images" multiple onChange={handleChange} />
//             <Button variant="outline-success" className="mt-2">UPLOAD</Button>
//           </Col>
//         </Row>
//         <Form.Control as="textarea" name="description" rows={2} className="mb-3" placeholder="Description" onChange={handleChange} required />
//         <Form.Control name="address" className="mb-3" placeholder="Address" onChange={handleChange} required />

//         <div className="mb-3">
//           <Form.Check inline label="Sell" name="sell" type="checkbox" onChange={handleChange} />
//           <Form.Check inline label="Rent" name="rent" type="checkbox" onChange={handleChange} />
//           <Form.Check inline label="Parking spot" name="parking" type="checkbox" onChange={handleChange} />
//           <Form.Check inline label="Furnished" name="furnished" type="checkbox" onChange={handleChange} />
//         </div>

//         <Form.Check className="mb-3" label="Offer" name="offer" type="checkbox" onChange={handleChange} />

//         <Row className="mb-3">
//           <Col md={2}><Form.Control name="beds" type="number" value={formData.beds} onChange={handleChange} /> <small>Beds</small></Col>
//           <Col md={2}><Form.Control name="baths" type="number" value={formData.baths} onChange={handleChange} /> <small>Baths</small></Col>
//           <Col md={4}><Form.Control name="price" type="number" value={formData.price} onChange={handleChange} /> <small>Regular price ($ / Month)</small></Col>
//         </Row>

//         <div className="text-center">
//           <Button type="submit" variant="dark">CREATE LISTING</Button>
//         </div>
//       </Form>
//     </Container>
//   );
// };

// export default AddTenant;


import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { User, Mail, Phone, Home, DollarSign, MapPin, Edit, Image as ImageIcon, CheckCircle } from 'lucide-react';

const AddTenant = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rentAmount: '',
    address: '',
    propertyType: 'apartment',
    leaseStart: '',
    leaseEnd: '',
    deposit: '',
    emergencyContact: '',
    images: []
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const selectedImages = Array.from(files).slice(0, 5); // Limit to 5 images
      setFormData({ ...formData, images: selectedImages });
      
      // Create image previews
      const imagePreviews = selectedImages.map(file => URL.createObjectURL(file));
      setPreviewImages(imagePreviews);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          formData.images.forEach(file => data.append('images', file));
        } else {
          data.append(key, formData[key]);
        }
      });

      const res = await axios.post('http://localhost:5000/api/tenants', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201) {
        setSuccess('Tenant added successfully!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          rentAmount: '',
          address: '',
          propertyType: 'apartment',
          leaseStart: '',
          leaseEnd: '',
          deposit: '',
          emergencyContact: '',
          images: []
        });
        setPreviewImages([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding tenant');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0 d-flex align-items-center">
                <User size={24} className="me-2" />
                Add New Tenant
              </h4>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && (
                <Alert variant="success" className="d-flex align-items-center">
                  <CheckCircle size={20} className="me-2" />
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <User size={16} className="me-1" /> Full Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter tenant's full name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <Mail size={16} className="me-1" /> Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <Phone size={16} className="me-1" /> Phone Number
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <DollarSign size={16} className="me-1" /> Monthly Rent
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="rentAmount"
                        value={formData.rentAmount}
                        onChange={handleChange}
                        placeholder="Enter monthly rent amount"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <MapPin size={16} className="me-1" /> Property Address
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full property address"
                    required
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Property Type</Form.Label>
                      <Form.Select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        required
                      >
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="townhouse">Townhouse</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Lease Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="leaseStart"
                        value={formData.leaseStart}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Lease End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="leaseEnd"
                        value={formData.leaseEnd}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Security Deposit</Form.Label>
                      <Form.Control
                        type="number"
                        name="deposit"
                        value={formData.deposit}
                        onChange={handleChange}
                        placeholder="Enter security deposit amount"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Emergency Contact</Form.Label>
                      <Form.Control
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        placeholder="Name and phone number"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>
                    <ImageIcon size={16} className="me-1" /> Property Images (Max 5)
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="images"
                    multiple
                    onChange={handleChange}
                    accept="image/*"
                  />
                  {previewImages.length > 0 && (
                    <div className="mt-3 d-flex flex-wrap gap-2">
                      {previewImages.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Preview ${index}`}
                          className="img-thumbnail"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      ))}
                    </div>
                  )}
                </Form.Group>

                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="px-4"
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Adding Tenant...
                      </>
                    ) : (
                      <>
                        <Edit size={18} className="me-1" />
                        Add Tenant
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTenant;