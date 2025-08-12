import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="mb-8 relative min-h-[600px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/young-men-women-sitting-office-working-laptops-emotions-concept_155003-16650.jpg?ga=GA1.1.364483453.1741266769&semt=ais_hybrid')`,
        }}
      >
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      {/* Content */}
      <div className="relative  text-center max-w-3xl mx-auto px-4">
        <p className="text-gray-800 text-lg mb-4">Let's get started</p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a2e4c] mb-6">
          Are you ready for a better, more productive business?
        </h2>
        <div className="space-y-4 mb-8">
          <p className="text-[#1a2e4c] text-lg">
            Stop worrying about technology problems. Focus on your business. Let
            us provide the support you deserve.
          </p>
          
        </div>
        <Link to="/contact">
        <button className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200">
          Contact us Now
        </button>
        </Link>
      </div>
    </div>
  );
}
