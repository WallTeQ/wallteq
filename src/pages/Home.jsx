
import About from '../components/About';
import Services from '../components/Services';
import Hero from '../components/Hero';
import TemplateShowcase from '../components/TemplateShowcase';
import TrustedBy from '../components/TrustedBy';
import ServiceType from '../components/ServiceType';
import ContactSection from '../components/ContactSection';

function Home() {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <ServiceType />
      <TemplateShowcase />
      <ContactSection />
      {/* <Footer /> */}
     
    </div>
  );
}

export default Home