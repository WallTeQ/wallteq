import React from 'react'
import About from '../components/About';
import Services from '../components/Services';
import ValuesSection from '../components/ValuesSection';
import ContactSection from '../components/ContactSection';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
function Home() {
  return (
    <div>
       <Hero /> 
      <About />
      <Services />
      <TrustedBy />
      <ValuesSection />
      {/* <ContactSection /> */}
    </div>
  );
}

export default Home