import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <Container className="my-5 py-5">
        <h1>About OmniRental</h1>
        <p>Information about your company...</p>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUs;