import { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Modal, Dropdown } from 'react-bootstrap';
import logo from '../assets/images/quick_evac.png';
import formlogo from '../assets/images/formlogo.png';
import LoginForm from './Loginform';
import RegisterForm from './RegisterForm';
import '../styling/Navigation.css';

import { useNavigate } from 'react-router-dom'; // ✅ useNavigate hook

const Navigation = () => {
  const navigate = useNavigate(); // ✅ use it inside the component
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [userInitial, setUserInitial] = useState<string | null>(null);

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (username) {
      setUserInitial(username.charAt(0).toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUserInitial(null);
    window.location.href = '/';
  };

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

                {!userInitial ? (
                  <Button variant="primary" className="ms-3" onClick={() => setShowModal(true)}>
                    {isRegister ? 'Register' : 'Login'}
                  </Button>
                ) : (
                  <Dropdown align="end" className="ms-3 user-dropdown">
                    <Dropdown.Toggle
                      variant="link"
                      id="dropdown-user"
                      className="p-0 d-flex align-items-center justify-content-center rounded-circle bg-dark text-white fw-bold"
                      style={{ width: '42px', height: '42px', fontSize: '18px' }}
                    >
                      {userInitial}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="shadow-sm rounded-3">
                      <Dropdown.Item onClick={() => navigate('/profile')} className="fw-bold">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
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
