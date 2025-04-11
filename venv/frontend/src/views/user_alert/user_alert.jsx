import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form, Alert } from 'react-bootstrap';

const AlertSender = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/roles/users_with_roles');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSendAlert = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/api/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, latitude, longitude }),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess(result.message || 'Alert sent successfully!');
        setMessage('');
      } else {
        alert(result.error || 'Failed to send alert');
      }
    } catch (error) {
      alert('Something went wrong while sending the alert.');
    }
  };

  useEffect(() => {
    fetchUsers();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude);
          setLongitude(pos.coords.longitude);
        },
        (err) => {
          console.error("Location error:", err.message);
        }
      );
    }
  }, []);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h3 className="mb-3">Send Emergency Alert</h3>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your alert message..."
          />
          <Button variant="danger" className="mt-2" onClick={handleSendAlert}>
            Send SMS to All
          </Button>
          {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        </Col>
      </Row>

      <Row>
        <Col>
          <h5>User List</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.first_name} {u.last_name}</td>
                  <td>{u.phone_no || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AlertSender;
