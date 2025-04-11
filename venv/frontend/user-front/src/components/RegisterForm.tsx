import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    location: '',
    latitude: '',
    longitude: '',
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setStatus((s) => ({ ...s, error: 'Geolocation not supported by browser.' }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        }));

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const place = data.address || {};
          const locationName = `${place.city || place.town || place.village || ''}, ${place.state || ''}`;
          setFormData((prev) => ({ ...prev, location: locationName }));
        } catch {
          setStatus((s) => ({ ...s, error: 'Unable to fetch location name.' }));
        }
      },
      () => {
        setStatus((s) => ({ ...s, error: 'Permission denied for location access.' }));
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const res = await fetch('http://127.0.0.1:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        // Save user to session and redirect to home
        sessionStorage.setItem('username', formData.username);
        sessionStorage.setItem('email', formData.email);
        sessionStorage.setItem('first_name', formData.fname);
        sessionStorage.setItem('last_name', formData.lname);
        sessionStorage.setItem('phone', formData.phone);
        sessionStorage.setItem('location', formData.location);
        sessionStorage.setItem('latitude', formData.latitude);
        sessionStorage.setItem('longitude', formData.longitude);

        navigate('/'); // ✅ Redirect to home
      } else {
        setStatus({ loading: false, error: result.error || 'Registration failed.', success: '' });
      }
    } catch (err) {
      setStatus({ loading: false, error: 'Server error during registration.', success: '' });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 rounded bg-light shadow">
      <h3 className="mb-3 text-center">Register</h3>

      {status.error && <Alert variant="danger">{status.error}</Alert>}
      {status.success && <Alert variant="success">{status.success}</Alert>}

      <div className="row">
        <div className="col-md-6 mb-3">
          <Form.Control
            type="text"
            name="fname"
            placeholder="First Name"
            value={formData.fname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <Form.Control
            type="text"
            name="lname"
            placeholder="Last Name"
            value={formData.lname}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="location"
          placeholder="Click to autofill location"
          onFocus={fetchLocation}
          value={formData.location}
          readOnly
        />
        <Form.Text className="text-muted">Location will auto-fill when you click.</Form.Text>
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100" disabled={status.loading}>
        {status.loading ? 'Registering...' : 'Register'}
      </Button>
    </Form>
  );
};

export default RegisterForm;
