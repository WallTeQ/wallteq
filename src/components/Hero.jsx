import { useEffect, useRef } from "react";
import img from "../assets/img1.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay to maintain readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Animated Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-gray-900/30 to-black/50"></div>

      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-2 mb-8 hero-badge">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-blue-400 font-medium text-sm">
                100+ Businesses Thriving
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight hero-title">
              Turning Ideas into
              <span className=" text-blue-400 block hero-highlight">
                Powerful Web & Mobile Experiences
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed hero-subtitle">
              We build digital products that meet your market&#39;s most authentic
              needs, engineered for growth, and ready for the future. Our goal
              is simple: turn your vision into an experience users will love.
            </p>

            {/* CTA Buttons - Responsive Layout */}
            <div className="mb-16 hero-cta">
              
              <div className="flex flex-col gap-4 sm:hidden">
                <Link
                  to="/contact"
                  className="w-full bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group flex items-center justify-center gap-3"
                >
                  <span className="text-base">Get in Touch</span>
                </Link>
                <Link
                  to="/templates"
                  className="w-full bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group flex items-center justify-center gap-3"
                >
                  <span className="text-base">Select Template</span>
                </Link>
              </div>

              
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex bg-blue-800 items-center gap-3 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group"
                >
                  <span className="text-sm md:text-base whitespace-nowrap">
                    Get in Touch
                  </span>
                </Link>
                <Link
                  to="/templates"
                  className="inline-flex bg-blue-800 items-center gap-3 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group"
                >
                  <span className="text-sm md:text-base whitespace-nowrap">
                    Select Template
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
