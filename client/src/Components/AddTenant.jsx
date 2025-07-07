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


import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AddTenant = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    sell: false,
    rent: false,
    parking: false,
    furnished: false,
    offer: false,
    beds: 1,
    baths: 1,
    price: 0,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        Array.from(formData.images).forEach((file) => data.append('images', file));
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
      alert('Listing created successfully!');
    }
  } catch (err) {
    console.error(err);
    alert('Error creating listing');
  }
};


  return (
    <Container className="mt-4 p-4 bg-light rounded shadow ">
      <h3 className="text-center mb-4">Create a Listing</h3>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="mb-3">
          <Col md={6}><Form.Control name="name" placeholder="Name" onChange={handleChange} required /></Col>
          <Col md={6}>
            <Form.Label>Images: <small>(Max 6)</small></Form.Label>
            <Form.Control type="file" name="images" multiple onChange={handleChange} />
            <Button variant="outline-success" className="mt-2">UPLOAD</Button>
          </Col>
        </Row>
        <Form.Control as="textarea" name="description" rows={2} className="mb-3" placeholder="Description" onChange={handleChange} required />
        <Form.Control name="address" className="mb-3" placeholder="Address" onChange={handleChange} required />

        <div className="mb-3">
          <Form.Check inline label="Sell" name="sell" type="checkbox" onChange={handleChange} />
          <Form.Check inline label="Rent" name="rent" type="checkbox" onChange={handleChange} />
          <Form.Check inline label="Parking spot" name="parking" type="checkbox" onChange={handleChange} />
          <Form.Check inline label="Furnished" name="furnished" type="checkbox" onChange={handleChange} />
        </div>

        <Form.Check className="mb-3" label="Offer" name="offer" type="checkbox" onChange={handleChange} />

        <Row className="mb-3">
          <Col md={2}><Form.Control name="beds" type="number" value={formData.beds} onChange={handleChange} /> <small>Beds</small></Col>
          <Col md={2}><Form.Control name="baths" type="number" value={formData.baths} onChange={handleChange} /> <small>Baths</small></Col>
          <Col md={4}><Form.Control name="price" type="number" value={formData.price} onChange={handleChange} /> <small>Regular price ($ / Month)</small></Col>
        </Row>

        <div className="text-center">
          <Button type="submit" variant="dark">CREATE LISTING</Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddTenant;
