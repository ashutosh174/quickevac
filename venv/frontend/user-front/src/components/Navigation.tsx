import { useState } from 'react';
import '../styling/Navigation.css';
import logo from '../assets/images/quick_evac.png';
import formlogo from '../assets/images/formlogo.png'
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const scrollToSection = (id: string): void => {
  const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <>
    <div className="custom-navbar-wrapper">
      <Navbar expand="lg" className="custom-navbar">
        <Container className="d-flex justify-content-between align-items-center px-4">
          <Navbar.Brand>
            <img src={logo} alt="Quick Evac Logo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center">
              <Nav.Link onClick={() => scrollToSection('home')}>Home</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('comprehensive-resources')}>Evacuation Plans</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('about-us')}>About Us</Nav.Link>
              <Button variant="primary" className="ms-3" onClick={() => setShowModal(true)}>
                {isRegister ? 'Register' : 'Login'}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
      <div className="auth-modal d-flex w-100">
        <div className="auth-image-side">
          <img src={formlogo} alt="Emergency scene" />
        </div>
        <div className="auth-form-side">
          <div className="text-center mb-4">
            <img src={logo} alt="QuickEvac Logo" className="auth-logo" />
          </div>
          {isRegister ? (
            <RegisterForm switchToLogin={() => setIsRegister(false)} />
          ) : (
            <LoginForm switchToRegister={() => setIsRegister(true)} />
          )}
        </div>
      </div>
    </Modal>
    </>
  );
};

export default Navigation;
