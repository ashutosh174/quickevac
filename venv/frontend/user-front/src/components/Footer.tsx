
import '../styling/Footer.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
const scrollToSection = (id: string): void => {
  const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
const Footer = () => {
  return (
    <footer className="footer bg-light-blue py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="footer-links mb-3 mb-md-0">
          <a onClick={() => scrollToSection('home')}>Home</a>
          <a onClick={() => scrollToSection('about-us')}>About Us</a>
          {/* <a onClick={() => scrollToSection('emergency-section')}>Contact</a> */}
        </div>

        <div className="footer-copy text-center mb-3 mb-md-0">
          &copy; Quick Evac 2023, Your Partner in Evacuation Safety.
        </div>

        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;