// src/components/LoginForm.tsx
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface Props {
  switchToRegister: () => void;
}

const LoginForm = ({ switchToRegister }: Props) => {
  const [loginData, setLoginData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Logging in:', loginData);
    // TODO: Send login request to backend
  };

  return (
    <Form onSubmit={handleLoginSubmit}>
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

      <Form.Group className="mb-3">
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

      <Button type="submit" variant="primary" className="w-100 rounded-pill py-2 fs-5">
        Login
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
