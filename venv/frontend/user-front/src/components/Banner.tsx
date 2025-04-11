// import React from 'react';
import { Link } from 'react-scroll';
import '../styling/MyComponent.css';
// import bannerImage from '../assets/images/banner-img.jpeg';
import { Button } from 'react-bootstrap';

const Banner = () => {
  const scrollToSection = (id: string): void => {
    const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
  return (
    <section id="home" className="banner-section d-flex justify-content-center align-items-center text-center">
      <div className="container">
        <h1 className="banner-title">Plan Ahead, Stay Safe</h1>
        <p className="banner-subtitle">
          Quick Evac empowers you with the tools and knowledge to prepare for emergencies. Your safety is our priority.
        </p>
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4 flex-wrap">
          <Button className="get-started-btn">
            <Link to="resource-gallery-section" >Get Started</Link>
          </Button>
          <a onClick={() => scrollToSection('about-us')} className="learn-more-link">Learn More →</a>
        </div>
      </div>
    </section>
  );
};

export default Banner;