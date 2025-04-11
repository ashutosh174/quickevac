import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Footer from '../components/Footer';
import '../styling/userprofile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    joined: 'April 2024' // You can replace this with real join date if available
  });

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [saved, setSaved] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Load user data from sessionStorage
  useEffect(() => {
    const name = `${sessionStorage.getItem('first_name') || ''} ${sessionStorage.getItem('last_name') || ''}`;
    const email = sessionStorage.getItem('email') || '';
    const phone = sessionStorage.getItem('phone_no') || '';
    const location = sessionStorage.getItem('location') || '';
    const lat = sessionStorage.getItem('latitude') || '';
    const lon = sessionStorage.getItem('longitude') || '';

    setUserData({ name, email, phone, location, joined: 'April 2024' });
    setLatitude(lat);
    setLongitude(lon);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    console.log('Saving user profile:', userData);
    setSaved(true);
  };

  return (
    <div className="profile-page d-flex flex-column min-vh-100">
      <Container fluid className="flex-grow-1 py-5" style={{ paddingTop: '90px' }}>
        <Row className="gx-4">
          {/* Map Section */}
          <Col md={6}>
            <div
              className="map-container shadow"
              style={{
                height: cardRef.current?.offsetHeight || 500,
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <iframe
                title="User Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=42.9849,-81.2453&z=13&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </Col>

          {/* Form Section */}
          <Col md={6}>
            <Card className="shadow p-4 h-100" style={{ borderRadius: '12px' }} ref={cardRef}>
              <h3 className="mb-3">Edit Profile</h3>

              {saved && (
                <Alert variant="success" className="py-2">
                  Profile saved successfully!
                </Alert>
              )}

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={userData.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" value={userData.phone} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" name="location" value={userData.location} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Joined</Form.Label>
                  <Form.Control type="text" name="joined" value={userData.joined} disabled />
                </Form.Group>

                <div className="text-end">
                  <Button variant="primary" onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default UserProfile;
