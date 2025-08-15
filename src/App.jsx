import './App.css';
import './index.css';
// import NavBar from './components/layout/NavBar';
// import Footer from './components/layout/Footer';
// import {
//   AboutPage,
//   Contact,
//   HardwareInstallation,
//   Home,
//   NetworkSurveillance,
//   Services,
//   WhyUs,
//   EquipmentMaintenance,
//   ITDeployment,
//   ITUpgrades,
//   WebsiteDevelopment,
//   NetworkCabling,
//   MobileSoftwareDevelopment,
//   TemplatesPage
// } from "./pages";
// import Services from './components/Services';
// import ContactSection from './components/ContactSection';
// import ValuesSection from './components/ValuesSection';
import { BrowserRouter, BrowserRouter as Router, useLocation } from "react-router-dom";
import PageRoutes from './routes/index';
import { useEffect } from "react";
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageRoutes />
        {/* <About />
        <Services />
        <ValuesSection /> */}
        {/* <ContactSection />  */}
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
