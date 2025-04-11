import React, { useState } from 'react';
import { Row, Col, Alert, Button, Card } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.jpg';
import bgImage from '../../../assets/images/login-art.png'; // Replace with your actual path

const SignUp1 = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Signup successful!');
        navigate('/auth/signin-1');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert('An error occurred while submitting the form.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          flex: '0 0 60%',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="d-flex justify-content-center align-items-center" style={{ flex: '0 0 40%', backgroundColor: '#f9fbfc' }}>
        <Card className="p-4 shadow" style={{ width: '80%', maxWidth: '450px' }}>
          <div className="text-center mb-4">
            <img src={logo} alt="QuickEvac" style={{ height: '100px' }} />
          </div>
          <h4 className="text-center mb-2">Create Your Account</h4>
          <p className="text-center text-muted mb-4">Join us to stay alert and safe during disasters</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter your username"
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <Button type="submit" variant="primary" className="w-100" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>

          <div className="text-center mt-3">
            Already have an account?{' '}
            <NavLink to="/auth/signin-1" className="text-primary">
              Login
            </NavLink>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp1;
