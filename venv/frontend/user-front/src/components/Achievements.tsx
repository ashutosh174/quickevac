// import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const achievements = [
  { number: "10+", text: "Years of Expertise" },
  { number: "5000+", text: "Successful Evacuations" },
  { number: "50+", text: "Expert Personnel" },
];

const Achievements = () => {
  return (
    <Container className="text-center py-5 bg-light">
      <h2>Our Achievements</h2>
      <p>Discover how Quick Evac's innovative solutions have made a significant impact.</p>
      <Row className="mt-4">
        {achievements.map((achievement, index) => (
          <Col key={index} md={4} className="fw-bold">
            <h3 className="text-primary">{achievement.number}</h3>
            <p>{achievement.text}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Achievements;
