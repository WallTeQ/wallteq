import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, Wifi, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceHero from '../components/ServiceHero';
const NetworkCabling = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
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

    const features = [
        {
            title: "Structured Cabling",
            description: "Reliable and organized cabling infrastructure",
        },
        {
            title: "Fiber Optic Installation",
            description: "High-speed fiber optic networks",
        },
        {
            title: "Network Design",
            description: "Custom network layouts for optimal performance",
        },
        {
            title: "Cable Management",
            description: "Efficient cable routing and organization",
        },
        {
            title: "Wireless Solutions",
            description: "Seamless Wi-Fi connectivity",
        },
        {
            title: "Maintenance & Support",
            description: "Ongoing network maintenance and troubleshooting",
        },
    ];

    const benefits = [
        "Improved network performance",
        "Scalable infrastructure",
        "Reduced downtime",
        "Enhanced data security",
        "Future-proof solutions",
        "24/7 technical support",
    ];

    return (
        <div className="min-h-screen bg-white py-12">
            {/* <div className="max-w-7xl mx-auto "> */}
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        to="/services"
                        className="mx-4 inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Services
                    </Link>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Hero Section */}
                    <ServiceHero
                        title="Network Cabling"
                        description="Professional network cabling solutions for businesses of all sizes."
                        icon={Wifi}
                    />

                    {/* Features Grid */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="mx-4 text-2xl font-bold text-gray-900 mb-6">
                            Key Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white p-6 rounded-lg shadow-sm"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Benefits Section */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="mx-4 text-2xl font-bold text-gray-900 mb-6">
                            Benefits
                        </h2>
                        <div className="mx-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center space-x-3"
                                >
                                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    <span className="text-gray-700">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        variants={itemVariants}
                        className="mx-4 bg-gradient-to-r from-[#1a2e4c] to-blue-800  rounded-2xl shadow-lg p-8 text-center"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Ready to upgrade your network?
                        </h2>
                        <p className="text-white mb-6">
                            Let's build a robust network infrastructure for your business.
                        </p>
                        <Link
                            to="/contact"
                        className="inline-block bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group flex items-center justify-center gap-3"
                        >
                            Get Started
                        </Link>
                    </motion.div>
                </motion.div>
            {/* </div> */}
        </div>
    );
};

export default NetworkCabling;