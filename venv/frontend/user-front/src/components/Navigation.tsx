import { useState } from "react";
import '../styling/Navigation.css';
import logo from '../assets/images/quick_evac.png';
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import LoginForm from './Loginform';

const Navigation = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className="custom-navbar-wrapper">
        <Navbar expand="lg" className="custom-navbar">
          <Container className="d-flex justify-content-between align-items-center px-4">
            <Navbar.Brand href="#home">
              <img src={logo} alt="Quick Evac Logo" className="logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="align-items-center">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#evacuation">Evacuation Plans</Nav.Link>
                <Nav.Link href="#about">About Us</Nav.Link>
                <Button variant="outline-primary" className="ms-3" onClick={() => setShowLogin(true)}>
                  Login
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navigation;
