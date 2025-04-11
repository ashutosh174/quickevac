import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

interface Props {
  switchToRegister: () => void;
}

const LoginForm = ({ switchToRegister }: Props) => {
  const [loginData, setLoginData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginData.usernameOrEmail,
          password: loginData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // ✅ Save user session data
        sessionStorage.setItem('first_name', result.user.first_name);
        sessionStorage.setItem('last_name', result.user.last_name);
        sessionStorage.setItem('latitude', result.user.latitude);
        sessionStorage.setItem('longitude', result.user.longitude);
        sessionStorage.setItem('location', result.user.location);
        sessionStorage.setItem('phone_no', result.user.phone_no);
        sessionStorage.setItem('username', result.user.username);
        sessionStorage.setItem('email', result.user.email);
        sessionStorage.setItem('user_id', result.user.id);
        sessionStorage.setItem('is_admin', result.user.is_admin);
        sessionStorage.setItem('is_manager', result.user.is_manager);

        // alert('Login successful!');

        // 🔁 Replace with navigate or route redirect
        window.location.href = '/profile';
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleLoginSubmit}>
      <h2 className="form-title mb-3">Welcome Back</h2>
      <p className="form-subtitle">Sign in to stay informed and safe during critical evacuations.</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Username or Email</Form.Label>
        <Form.Control
          type="text"
          name="usernameOrEmail"
          placeholder="Enter username or email"
          value={loginData.usernameOrEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLoginData({ ...loginData, usernameOrEmail: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter password"
          value={loginData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          required
        />
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        className="w-100 rounded-pill py-2 fs-5"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>

      <div className="text-center mt-3">
        Don’t have an account?{' '}
        <span
          className="text-primary fw-bold"
          style={{ cursor: 'pointer' }}
          onClick={switchToRegister}
        >
          Sign up here
        </span>
      </div>
    </Form>
  );
};

export default LoginForm;
