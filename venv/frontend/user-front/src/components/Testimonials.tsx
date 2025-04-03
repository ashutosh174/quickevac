import React from "react";
import { Card } from "react-bootstrap";
import "../styling/testimonials.css";

interface TestimonialProps {
  name: string;
  role: string;
  quote: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ name, role, quote, image }) => {
  return (
    <Card className="testimonial-card">
      <div className="testimonial-header">
        <img src={image} alt={name} className="testimonial-img" />
        <div>
          <h5 className="testimonial-name">{name}</h5>
          <p className="testimonial-role">{role}</p>
        </div>
      </div>
      <Card.Body>
        <p className="testimonial-text">{quote}</p>
      </Card.Body>
    </Card>
  );
};

export default TestimonialCard;
