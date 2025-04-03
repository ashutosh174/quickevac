// import React from 'react';
import '../styling/Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-light text-dark py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ul className="nav flex-column">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#evacuation-plans">Evacuation Plans</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            <div>
              <a href="#" className="me-3"><i className="fab fa-facebook"></i></a>
              <a href="#" className="me-3"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <small>&copy; Quick Evac 2023, Your Partner in Evacuation Safety.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
