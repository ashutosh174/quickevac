import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Banner from './components/Banner';
import ResourceGallery from './components/Resources_Gallery';
import WhyPlan from './components/WhySection';
import ComprehensiveResources from './components/Comprehensive';
import HowItWorks from './components/Howitworks';
import Contact from './components/Contact';
import Footer from "./components/Footer";
import UserProfile from './components/profile';
import Loginform from './components/Loginform'; // ✅ make sure this path matches your structure

function App() {
  return (
    <Router>
      <Navigation />

      <Routes>
        {/* Home page */}
        <Route path="/" element={
          <>
            <Banner />
            <ResourceGallery />
            <WhyPlan />
            <ComprehensiveResources />
            <HowItWorks />
            <Contact />
            <Footer />
          </>
        } />

        {/* User Profile page */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Loginform />} />
      </Routes>
    </Router>
  );
}

export default App;