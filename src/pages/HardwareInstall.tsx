import React from 'react';
import { motion } from 'framer-motion';
import { HardDrive, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceHero from '../components/ServiceHero';

const HardwareInstallation = () => {
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

    const benefits = [
        "Optimized system performance",
        "Professional cable management",
        "Minimal downtime during installation",
        "Expert configuration and testing",
        "Comprehensive documentation",
        "Post-installation support",
    ];

    const process = [
        {
            title: "Assessment",
            description: "We evaluate your current infrastructure and requirements",
        },
        {
            title: "Planning",
            description: "Detailed installation plan and timeline development",
        },
        {
            title: "Installation",
            description: "Professional hardware setup and configuration",
        },
        {
            title: "Testing",
            description: "Thorough testing of all installed components",
        },
        {
            title: "Documentation",
            description: "Complete system documentation and user guides",
        },
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
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
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
                        title="Hardware Installation"
                        description="Professional installation of computer systems, servers, and networking equipment for optimal performance."
                        icon={HardDrive}
                    />

                    {/* Benefits Section */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="px-4 text-2xl font-bold text-gray-900 mb-6">
                            Key Benefits
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white p-4 rounded-lg shadow-sm flex items-start space-x-3"
                                >
                                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Process Section */}
                    <motion.div variants={itemVariants}>
                        <h2 className="mx-4 text-2xl font-bold text-gray-900 mb-6">
                            Our Process
                        </h2>
                        <div className="relative">
                            {/* Process Timeline */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-300" />

                            {/* Process Steps */}
                            {process.map((step, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ x: 10 }}
                                    className="relative flex items-start mb-8 last:mb-0"
                                >
                                    <div className="absolute left-8 w-4 h-4 -ml-2 rounded-full bg-blue-500" />
                                    <div className="ml-16">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            {/* </div> */}
        </div>
    );
};

export default HardwareInstallation;