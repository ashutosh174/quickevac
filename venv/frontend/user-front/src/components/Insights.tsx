// import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const newsArticles = [
  { title: "The Importance of Regular Evacuation Drills", date: "October 10, 2023" },
  { title: "Innovations in Evacuation Technology", date: "October 13, 2023" },
  { title: "Building a Preparedness Culture", date: "October 21, 2023" },
  { title: "Effective Communication in Emergencies", date: "October 29, 2023" },
];

const LatestNews = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center">Latest Insights from Quick Evac</h2>
      <Row className="mt-4">
        {newsArticles.map((news, index) => (
          <Col key={index} md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{news.title}</Card.Title>
                <Card.Subtitle className="text-muted">{news.date}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LatestNews;
