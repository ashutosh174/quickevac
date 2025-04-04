// import React from 'react';
import '../styling/MyComponent.css';
import bannerImage from '../assets/images/banner-img.jpeg';

const Banner = () => {
  return (
    <section className="banner d-flex align-items-center text-white" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="container text-center">
        <h1 className="display-4 fw-bold">Evacuation Planning Saves Lives</h1>
        <p className="lead">Emergencies can strike at any time. With Quick Evac, ensure you're equipped with the knowledge and resources to act swiftly and safely.</p>
        <a href="#resources" className="btn btn-primary mt-3">Explore Resources</a>
      </div>
    </section>
  );
};

export default Banner;