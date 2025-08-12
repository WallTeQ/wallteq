import React from "react";
import {
  HardDrive,
  Camera,
  Network,
  Wrench,
  ArrowUpCircle,
  Smartphone,
  Cable,
  Monitor,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ServiceHero from "../components/ServiceHero";

export default function Services() {
  // Animation variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of each child
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const services = [
    {
      icon: <HardDrive className="w-8 h-8" />,
      title: "Hardware Installation",
      description:
        "Professional installation of computer systems, servers, and networking equipment for optimal performance.",
      path: "/services/hardware-installation",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "IP Network & Video Surveillance",
      description:
        "Advanced security solutions with IP cameras and network-based video monitoring systems to enhance security and efficiency.",
      path: "/services/network-surveillance",
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "IT Deployment",
      description:
        "Strategic planning and implementation of IT infrastructure across your organization.",
      path: "/services/it-deployment",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "IT Equipment Maintenance",
      description:
        "Regular maintenance and support services to keep your IT equipment running smoothly.",
      path: "/services/equipment-maintenance",
    },
    {
      icon: <ArrowUpCircle className="w-8 h-8" />,
      title: "IT Upgrade",
      description:
        "System upgrades and modernization to keep your technology current and efficient.",
      path: "/services/it-upgrades",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile & Software Development",
      description:
        "Custom mobile applications and software solutions tailored to your business needs.",
      path: "/services/software-development",
    },
    {
      icon: <Cable className="w-8 h-8" />,
      title: "Structured Network Cabling",
      description:
        "Professional network cabling installation and management for reliable connectivity.",
      path: "/services/network-cabling",
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Digital Signage",
      description:
        "Dynamic digital display solutions for advertising and information delivery.",
      path: "/services/digital-signage",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Website Development",
      description:
        "Custom website design and development to establish your online presence.",
      path: "/services/web-development",
    },
  ];

  return (
    <section className="min-h-screen bg-white py-12">
      <div>
        {/* Hero Section */}
        <ServiceHero
          title="Our Services"
          description="Comprehensive IT solutions tailored to meet your business needs and
            drive digital transformation"
        />

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <Link to={service.path} key={index}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, rotate: 1 }}
                className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 cursor-pointer"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 3,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                    {service.icon}
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>

                {/* Hover Effect Border */}
                <div className="absolute bottom-0 left-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
