import React, { useState } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

const JWTLogin = () => {
  const [error, setError] = useState(''); // State for API errors
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      // Send login request to the backend
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // console.log('Login successful:', result);
        console.log(result.user);
        sessionStorage.setItem('username', result.user.username);
        sessionStorage.setItem('email', result.user.email);
        sessionStorage.setItem('user_id', result.user.id);
        sessionStorage.setItem('is_admin', result.user.is_admin);
        sessionStorage.setItem('is_manager', result.user.is_manager);
        // Check if the user is an admin or manager
        if (result.user.is_admin == '1') {
            navigate('/app/dashboard/default');  // Redirect to admin dashboard
          } else if (result.user.is_manager) {
            navigate('/manager/dashboard');  // Redirect to manager dashboard
          } else {
            navigate('/user/dashboard');  // Redirect to normal user dashboard
          }
      }else{
      setError(result.error || 'Login failed');
      setErrors({ submit: result.error || 'Login failed' });
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred while logging in');
      setErrors({ submit: 'An error occurred while logging in' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={handleLogin}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
              placeholder="Email Address"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          <div className="custom-control custom-checkbox text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {error && (
            <Col sm={12}>
              <Alert variant="danger">{error}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button
                className="btn-block mb-4"
                variant="primary"
                disabled={isSubmitting}
                size="lg"
                type="submit"
              >
                {isSubmitting ? 'Logging in...' : 'LogIn'}
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;