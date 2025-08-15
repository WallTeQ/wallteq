import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CompanyProfile from "../pages/CompanyProfile";
import AboutPage from "../pages/About";
import ValuesSection from "../components/ValuesSection";
import WhyUs from "../pages/WhyUs";
import Services from "../pages/Services";
import TemplatesPage from "../pages/Template";
import HardwareInstallation from "../pages/HardwareInstall";
import NetworkSurveillance from "../pages/NetworkSurveillance";
import EquipmentMaintenance from "../pages/EquipmentMaintenance";
import ITDeployment from "../pages/ItDeployments";
import ITUpgrades from "../pages/ItUpgrades";
import WebsiteDevelopment from "../pages/WebDev";
import NetworkCabling from "../pages/NetworkCabling";
import MobileSoftwareDevelopment from "../pages/MobileSoftwareDev";
import Contact from "../pages/Contact";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import ContactSection from "../components/ContactSection";
const PublicRoutes: React.FC = () => (
  <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/company-profile" element={<CompanyProfile />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/values" element={<ValuesSection />} />
      <Route path="/why-us" element={<WhyUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/templates" element={<TemplatesPage />} />
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
    <Footer />
  </>
);

export default PublicRoutes;