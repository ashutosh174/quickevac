import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Banner from './components/Banner';
import ResourceGallery from './components/Resources_Gallery';
import WhyPlan from './components/WhySection';
import ComprehensiveResources from './components/Comprehensive';
import HowItWorks from './components/Howitworks';
import Contact from './components/Contact';
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div>
      {/* Navigation Bar */}
      <Navigation />
      </div>

      <div>
      {/* Hero Section */}
      <Banner />

      {/* Essential Evacuation Resources */}
      <ResourceGallery />

      {/* Why Plan? Section */}
      <WhyPlan />

      {/* Comprehensive Resources Section */}
      <ComprehensiveResources />

      {/* How It works Section */}
      <HowItWorks />

      {/* Emergency Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
      </div>
    </>
  )
}

export default App
