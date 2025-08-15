import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceHero from '../components/ServiceHero';
const NetworkSurveillance = () => {
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
            title: "HD Video Quality",
            description: "Crystal clear footage with high-definition cameras",
        },
        {
            title: "Remote Access",
            description: "Monitor your premises from anywhere, anytime",
        },
        {
            title: "Smart Analytics",
            description: "AI-powered motion detection and object recognition",
        },
        {
            title: "Secure Storage",
            description: "Encrypted cloud storage for all footage",
        },
        {
            title: "24/7 Monitoring",
            description: "Round-the-clock surveillance and alerts",
        },
        {
            title: "Easy Integration",
            description: "Seamless integration with existing security systems",
        },
    ];

    const benefits = [
        "Enhanced security and protection",
        "Deterrent to potential threats",
        "Real-time monitoring and alerts",
        "Evidence preservation",
        "Reduced security personnel costs",
        "Peace of mind",
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
                        title="IP Network & Video Surveillance"
                        description="Advanced security solutions with IP cameras and network-based video monitoring systems."
                        icon={Camera}   
                    />
                    
                    

                    {/* Features Grid */}
                    <motion.div variants={itemVariants} className="mb-12 px-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
                    <motion.div variants={itemVariants} className="px-4  mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Benefits
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    {/* Security Highlight */}
                    <motion.div
                        variants={itemVariants}
                        className="mx-4 bg-gradient-to-r from-[#1a2e4c] to-blue-800 rounded-2xl shadow-lg p-8 text-white mb-12"
                    >
                        <div className="flex items-center mb-6">
                            <Shield className="w-12 h-12 mr-4" />
                            <h2 className="text-2xl font-bold">
                                Enterprise-Grade Security
                            </h2>
                        </div>
                        <p className="text-blue-100 mb-6">
                            Our surveillance systems are built with multiple layers of security,
                            including end-to-end encryption, secure access controls, and
                            redundant storage to ensure your footage is always protected and
                            available when you need it.
                        </p>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        variants={itemVariants}
                        className="mx-4 p-8 text-center"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Ready to secure your premises?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Get in touch for a customized surveillance solution.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group flex items-center justify-center gap-3"
                        >
                            Request a Demo
                        </Link>
                    </motion.div>
                </motion.div>
            {/* </div> */}
        </div>
    );
};

export default NetworkSurveillance;