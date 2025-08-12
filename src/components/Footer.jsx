import { motion } from "framer-motion";
import { Link, } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import {
   faXTwitter,
   faFacebook,
   faInstagram,
   faLinkedin,
 } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Contact", path: "/contact-us" },
    // { name: "Blog", path: "/blog" },
  ];

  const services = [
    { name: "Hardware Installation", path: "/services/hardware-installation" },
    {
      name: "IP Network & Video Installation",
      path: "/services/network-surveillance",
    },
    { name: "IT Deployment", path: "/services/it-deployment" },
    { name: "Equipment Maintenance", path: "/services/equipment-maintenance" },
    { name: "IT Upgrades", path: "/services/it-upgrades" },
    { name: "Mobile & Software Development", path: "/services/software-development" },
    { name: "Network Cabling", path: "/services/network-cabling" },
    {name: "Website Development", path: "/services/web-development"},
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link to={"/"} className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">WallTeQ</span>
              <div className="w-10 h-10 flex justify-center items-center">
                <img src="/logo.png" alt="Logo" className="w-8 h-8" />{" "}
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner in IT services and solutions. We help
              businesses navigate the digital landscape with confidence.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "#1877f2" }}
                className="hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "#1da1f2" }}
                className="hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faXTwitter} className="text-2xl" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "#0a66c2" }}
                className="hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "#e4405f" }}
                className="hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2"
                >
                  <ArrowRight size={14} className="text-blue-500" />
                  <Link
                    to={link.path}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2"
                >
                  <ArrowRight size={14} className="text-blue-500" />
                  <Link
                    to={service.path}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start space-x-3"
                whileHover={{ x: 5 }}
              >
                <MapPin size={20} className="text-blue-500 mt-1" />
                <span className="text-sm">
                  Airfield new road, Cheeseman Avenue,
                  <br />
                  Monrovia, Liberia
                </span>
              </motion.li>
              <motion.li
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <Phone size={20} className="text-blue-500" />
                <a
                  href="tel:+231555964462"
                  className="text-sm hover:text-white transition-colors"
                >
                  + (231) 555 964 462
                </a>
              </motion.li>
              <motion.li
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <Mail size={20} className="text-blue-500" />
                <a
                  href="mailto:info@wallteq.com"
                  className="text-sm hover:text-white transition-colors"
                >
                  wallteqinc@gmail.com
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400"
        >
          <p>© {new Date().getFullYear()} WallTeQ. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
