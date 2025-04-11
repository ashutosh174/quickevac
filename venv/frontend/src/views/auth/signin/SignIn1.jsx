import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import logo from '../../../assets/images/logo.jpg';
import loginArt from '../../../assets/images/login-art.png'; // Your 60% background image
import AuthLogin from './JWTLogin';

const Signin1 = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden'
      }}>
        {/* Image Panel - 60% */}
        <div style={{
          flex: '0 0 60%',
          backgroundImage: `url(${loginArt})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />

        {/* Form Panel - 40% */}
        <div style={{
          flex: '0 0 40%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f9fc',
          padding: '40px'
        }}>
          <Card style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '16px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
            padding: '30px 35px',
            backgroundColor: '#ffffff'
          }}>
            <Card.Body className="text-center">
              <img src={logo} alt="QuickEvac Logo" style={{ height: '100px', marginBottom: '20px' }} />
              <h4 className="mb-2" style={{ color: '#003366', fontWeight: '600' }}>Welcome Back</h4>
              <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                Sign in to stay informed and safe during critical evacuations.
              </p>

              <AuthLogin />

              <div className="text-start mt-3">
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  Forgot password?{' '}
                  <NavLink to="#" style={{ color: '#007bff', fontWeight: '500' }}>Reset</NavLink>
                </p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  Don’t have an account?{' '}
                  <NavLink to="/auth/signup-1" style={{ color: '#007bff', fontWeight: '500' }}>Signup</NavLink>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
