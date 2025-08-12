import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ContactForm from "./forms/ContactForm";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5,
        connection: [],
      });
    }

    function drawConnections(particle, index) {
      if (!ctx) return;
      particles.forEach((p, i) => {
        if (index === i) return;
        const distance = Math.hypot(particle.x - p.x, particle.y - p.y);
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59, 130, 246, ${
            0.15 * (1 - distance / 100)
          })`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, p.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      });
    }

    let lastFrameTime = 0;
    const fps = 30; // Target frames per second
    const frameDuration = 1000 / fps;

    function animate(currentTime) {
      if (!ctx) return;
      const deltaTime = currentTime - lastFrameTime;
      if (deltaTime < frameDuration) {
        requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      particles.forEach((particle, index) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (canvas && (particle.x < 0 || particle.x > canvas.width))
          particle.dx *= -1;
        if (canvas && (particle.y < 0 || particle.y > canvas.height))
          particle.dy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
        ctx.fill();

        drawConnections(particle, index);
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX - window.innerWidth / 2) * 0.005,
      y: (e.clientY - window.innerHeight / 2) * 0.005,
    });
  };

  const handleCloseForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <div
      className="w-full min-h-[75vh] bg-slate-900 text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900/95" />
      <main
        className="relative flex items-center justify-center w-full min-h-[75vh] py-16"
        ref={ref}
      >
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-2 lg:px-4 py-8 sm:py-12 lg:py-16 flex flex-col items-center justify-center text-center"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mb-4"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              WALLTEQ <ChevronRight className="w-4 h-4" />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 200%" }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Innovation Through
              </motion.span>{" "}
              <span className="relative">
                {" "}
                <br />
                Digital Excellence
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 lg:mb-16"
          >
            Revolutionizing business landscapes through cutting-edge technology
            solutions. <br /> We transform challenges into opportunities for
            digital growth.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-row items-center justify-center gap-4 w-full max-w-md mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 group relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#1a2e4c] to-blue-800  text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg text-lg font-semibold overflow-hidden whitespace-nowrap"
              onClick={() => setIsContactFormOpen(true)}
            >
              <Link to="/contact-us" className="relative">
                Get Started
              </Link>
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-lg font-semibold text-gray-300 hover:text-white transition-colors border-2 border-blue-800 shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] whitespace-nowrap"
            >
              <Link to="/about">Learn More</Link>
            </motion.button>
          </motion.div>
        </div>
      </main>

      {isContactFormOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseForm}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-lg w-full relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-2xl"
              onClick={handleCloseForm}
            >
              &times;
            </button>
            <ContactForm />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Hero;
