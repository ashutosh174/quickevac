// import React from 'react';
import '../styling/Contact.css';
import { Container, Row, Col } from 'react-bootstrap';

const EmergencyContacts = () => {
  return (
    <section className="emergency-section py-5">
      <Container>
        <h2 className="section-title text-center">Emergency Contacts</h2>
        <p className="section-subtitle text-center">Reach out to Quick Evac for assistance or guidance during emergencies. We're here to help.</p>
        <Row className="mt-5 justify-content-center">
          <Col md={5} className="mb-4">
            <div className="contact-box p-4">
              <h5 className="fw-bold">General Inquiry</h5>
              <p className="mb-1"><a href="mailto:support@quickevac.com">support@quickevac.com</a></p>
              <p>+1 (555) 123-4567</p>
            </div>
          </Col>
          <Col md={5} className="mb-4">
            <div className="contact-box p-4">
              <h5 className="fw-bold">Emergency Support</h5>
              <p className="mb-1"><a href="mailto:emergency@quickevac.com">emergency@quickevac.com</a></p>
              <p>+1 (555) 987-6543</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EmergencyContacts;
