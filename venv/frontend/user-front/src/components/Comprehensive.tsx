import '../styling/comprehensive_resources.css';
import resourcesImg from '../assets/images/cr.jpg'; // 
import { FaClipboardCheck, FaMapMarkedAlt, FaBell } from 'react-icons/fa';

const ComprehensiveResources = () => {
  return (
    <section id="comprehensive-resources" className="comprehensive-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img src={resourcesImg} alt="Office" className="img-fluid rounded shadow-sm resource-img" />
          </div>
          <div className="col-md-6">
            <p className="be-prepared-title">Be Prepared</p>
            <h2 className="section-title">Comprehensive Resources</h2>
            <p className="section-subtitle">
              Quick Evac offers a suite of tools, from step-by-step guides to customizable checklists, ensuring you're ready for any emergency.
            </p>
            <ul className="features-list list-unstyled mt-4">
              <li><FaClipboardCheck className="me-2 text-primary" /> Customizable Checklists</li>
              <li><FaMapMarkedAlt className="me-2 text-primary" /> Interactive Maps</li>
              <li><FaBell className="me-2 text-primary" /> Emergency Alerts</li>
            </ul>
            <p className="mt-3">Quick Evac ensures you're always one step ahead, offering peace of mind and preparedness.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveResources;
