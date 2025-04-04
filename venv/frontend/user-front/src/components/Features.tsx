// import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const services = [
  {
    title: "Real-Time Coordination",
    description: "Utilize advanced technology for seamless communication during evacuations.",
  },
  {
    title: "Custom Evacuation Plans",
    description: "Plans designed to fit the unique requirements of your organization.",
  },
  {
    title: "Training and Drills",
    description: "Prepare your team with comprehensive training programs and emergency drills.",
  },
];

const Services = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center">Comprehensive Evacuation Solutions</h2>
      <Row className="mt-4">
        {services.map((service, index) => (
          <Col key={index} md={4} className="text-center">
            <h4 className="fw-bold">{service.title}</h4>
            <p>{service.description}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
