import '../styling/WhySection.css';
import warehouseImage from '../assets/images/whyplan.jpg';
import { Link } from 'react-scroll';

const WhyPlan = () => {
    return (
      <section id="about-us" className="why-plan-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="section-title">Evacuation Planning Saves Lives</h2>
              <p className="section-subtitle">Emergencies can strike at any time. With Quick Evac, ensure you're equipped with the knowledge and resources to act swiftly and safely.</p>
              <button className="get-started-btn"><Link to="resource-gallery-section" >Explore Resources</Link></button>
              <div className="testimonial mt-4">
                <p className="quote">“Thanks to Quick Evac, our family was prepared and knew exactly what to do during a recent wildfire evacuation.”</p>
                <p className="author">– John Doe, Community Member</p>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <img src={warehouseImage} alt="Warehouse" className="img-fluid rounded plan-img" />
            </div>
          </div>
        </div>
      </section>
    );
  };
export default WhyPlan;
