import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface Props {
  switchToLogin: () => void;
}

const RegisterForm = ({ switchToLogin }: Props) => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  });

  const [location, setLocation] = useState('');
  const [locationStatus, setLocationStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationStatus('Fetching location...');

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
          );
          const data = await response.json();
          const place = data.address || {};
          const locationName = `${place.city || place.town || place.village || ''}, ${place.state || ''}`;
          setLocation(locationName);
          setLocationStatus('Location captured.');
        } catch (error) {
          setLocationStatus('Could not get location name.');
        }
      },
      () => {
        setLocationStatus('Location permission denied.');
      }
    );
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Registering:', { ...formData, location });
  };

  return (
    <Form onSubmit={handleRegisterSubmit} className="styled-form">
      <h2 className="form-title">Create Your Account</h2>
      <p className="form-subtitle">Track alerts. Plan routes. Stay safe.</p>

      <div className="row">
        <div className="col-md-6 mb-3">
          <Form.Control
            name="fname"
            placeholder="First Name"
            value={formData.fname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <Form.Control
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
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="tel"
          name="phone"
          placeholder="+1 123 456 7890"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          name="location"
          placeholder="Click to allow location access"
          value={location}
          onFocus={requestLocation}
          readOnly
        />
        <Form.Text muted>{locationStatus}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          name="username"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Control
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button type="submit" className="w-100 register-btn">
        Register
      </Button>

      <div className="text-center mt-3">
        Already have an account?{' '}
        <span className="text-primary fw-bold" style={{ cursor: 'pointer' }} onClick={switchToLogin}>
          Login here
        </span>
      </div>
    </Form>
  );
};

export default RegisterForm;