import '../styling/howitworks.css';
import workImage from '../assets/images/howitworks.jpg';

const HowItWorks = () => {
  return (
    <section className="how-it-works-section py-5">
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Quick Evac simplifies evacuation planning into actionable steps, making safety accessible to everyone.</p>
          </div>
          <div className="col-md-6 text-center">
            <img src={workImage} alt="How It Works" className="how-it-works-img" />
          </div>
        </div>

        <div className="row text-center step-flow step-flow-wrapper">
          <div className="col-md-4 sf-inner-wrap" >
            <div className="step-circle">01</div>
            <h5 className="mt-3 sf-title">Assess Your Risks</h5>
            <p className="sf-content">Identify potential hazards in your area and understand the risks you face.</p>
          </div>
          <div className="col-md-4 sf-inner-wrap">
            <div className="step-circle">02</div>
            <h5 className="mt-3 sf-title">Create Your Plan</h5>
            <p className="sf-content">Use our resources to develop a clear and effective evacuation strategy.</p>
          </div>
          <div className="col-md-4 sf-inner-wrap">
            <div className="step-circle">03</div>
            <h5 className="mt-3 sf-title">Prepare Your Kit</h5>
            <p className="sf-content">Ensure you have all essential supplies ready for any emergency.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;