
import About from '../components/About';
import Services from '../components/Services';
import Hero from '../components/Hero';
import TemplateShowcase from '../components/TemplateShowcase';
import TrustedBy from '../components/TrustedBy';
import ServiceType from '../components/ServiceType';
function Home() {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <ServiceType />
      <TemplateShowcase />
     
    </div>
  );
}

export default Home