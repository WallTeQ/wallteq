import { CloudDownload } from "lucide-react";
import foto from "../assets/images/business-team.png"
import FeatureCards from "../components/Cards";
import ContactSection from "../components/ContactSection";
import CTA from "../components/Cta";
import MissionVision from "../components/Mission";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      {/* Banner Section */}
      <div
        id="banner"
        className="relative w-full h-[300px] bg-slate-900 text-white"
      >
        <div className="absolute inset-0 flex items-center justify-center w-full">
          <div className="flex flex-col justify-center items-center px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ABOUT WALLTEQ
            </h1>
            <p className="text-center text-white text-sm md:text-lg max-w-2xl">
              WallTeq is a leading provider of Information Communication
              Technology(ICT) and electronic support services, specializing in
              comprehensive infrastructure solutions for businesses and
              organizations.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with imgs */}
      <div className="container mx-auto py-12">
        <div className="mt-12 grid grid-cols-2 md:grid-cols-2 gap-6">
          {/* Left div (50% width) */}
          <div className="bg-gray-100 rounded-lg overflow-hidden h-[250px]  lg:h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
              alt="WallTeq Technology"
              width={400}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right div (50% width) with stacked images */}
          <div className="flex flex-col gap-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-[100px] lg:h-[200px]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="WallTeq Team"
                width={400}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden h-[100px] lg:h-[200px]">
              <img
                src={foto}
                alt="WallTeq Office"
                width={400}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8 justify-center items-center">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-[#1a2e4c] mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            Technology solutions to help businesses and organizations flourish
          </h2>
          <p className="text-[#1a2e4c] mx-2  md:text-lg max-w-4xl text-left lg:text-center lg:mx-auto lg:text-lg">
            WallTeq is a privately owned IT Support and IT Services business
            formed in 2006. Today we’re proud to boast a strong team of IT
            engineers who thrive on rolling up their sleeves and solving your IT
            problems and meeting your business needs. We are on a mission to
            exceed your expectations and form a long-term, mutually beneficial
            relationship with you.
          </p>

          {/* Download PDF Button */}
          <div className="flex justify-center mt-6">
            <a
              href="../assets/WallTeQ-Profile.pdf" // Path to your PDF file
              download="WallTeQ-Profile.pdf" // Name of the downloaded file
              className="px-6 py-3 bg-gradient-to-r from-[#1a2e4c] to-blue-800 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <CloudDownload className="w-5 h-5" />{" "}
              {/* Adjust icon size as needed */}
              Download Company Brochure
            </a>
          </div>
        </div>
      </div>
      <FeatureCards />
      <MissionVision />
      {/* <div width="100%" className="container mx-auto py-8">
        <iframe
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Cheeseman%20Avenue,%20Airfield%20Sinkor%20Monrovia%201000,%20Liberia%2010%20GPS:+(WallTeq%20Company)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/collections/drones/">drones ireland</a>
        </iframe>
      </div> */}
      {/* <CTA /> */}
      {/* <ContactSection /> */}
    </div>
  );
}
