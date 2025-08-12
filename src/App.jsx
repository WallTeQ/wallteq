import './App.css';
import './index.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import {
  AboutPage,
  Contact,
  HardwareInstallation,
  Home,
  NetworkSurveillance,
  Services,
  WhyUs,
  EquipmentMaintenance,
  ITDeployment,
  ITUpgrades,
  WebsiteDevelopment,
  NetworkCabling,
  MobileSoftwareDevelopment,
} from "./pages";
// import Services from './components/Services';
import ContactSection from './components/ContactSection';
import ValuesSection from './components/ValuesSection';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import CompanyProfile from './pages/CompanyProfile';
import { useEffect } from "react";

// ScrollToTop component to ensure page starts at the top after navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/values" element={<ValuesSection />} />
        {/* <Route path="/contact" element={<ContactSection />} /> */}
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/hardware-installation" element={<HardwareInstallation />} />
        <Route path="/services/network-surveillance" element={<NetworkSurveillance />} />
        <Route path="/services/equipment-maintenance" element={<EquipmentMaintenance />} />
        <Route path="/services/it-deployment" element={<ITDeployment />} />
        <Route path="/services/it-upgrades" element={<ITUpgrades />} />
        <Route path="/services/web-development" element={<WebsiteDevelopment />} />
        <Route path="/services/network-cabling" element={<NetworkCabling />} />
        <Route path="/services/software-development" element={<MobileSoftwareDevelopment />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
       {/* <About />
      <Services />
      <ValuesSection /> */}
      <ContactSection /> 
      <Footer />
    </Router>
  );
}

export default App;
