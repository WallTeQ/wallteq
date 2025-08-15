import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, ArrowLeft, CheckCircle, PenTool as Tool, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceHero from '../components/ServiceHero';
const EquipmentMaintenance = () => {
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

    const maintenanceTypes = [
        {
            icon: <Tool className="w-8 h-8 text-blue-600" />,
            title: "Preventive Maintenance",
            description: "Regular check-ups to prevent issues before they occur",
        },
        {
            icon: <AlertCircle className="w-8 h-8 text-blue-600" />,
            title: "Emergency Repairs",
            description: "Quick response to urgent equipment problems",
        },
        {
            icon: <Clock className="w-8 h-8 text-blue-600" />,
            title: "Scheduled Servicing",
            description: "Planned maintenance during off-peak hours",
        },
    ];

    const services = [
        "Hardware diagnostics and repair",
        "Software updates and patches",
        "Network equipment maintenance",
        "Server maintenance",
        "Workstation optimization",
        "Peripheral device support",
    ];

    const benefits = [
        "Reduced equipment downtime",
        "Extended hardware lifespan",
        "Improved system performance",
        "Cost-effective maintenance plans",
        "Preventive issue detection",
        "24/7 emergency support",
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
                        className="ml-4 inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
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
                        title="IT Equipment Maintenance"
                        description="Comprehensive maintenance services to keep your IT equipment running at peak performance. Our expert technicians ensure your systems operate efficiently and reliably."
                        icon={Wrench}
                    />
                    

                    {/* Maintenance Types */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="mx-4 text-2xl font-bold text-gray-900 mb-6">
                            Maintenance Solutions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {maintenanceTypes.map((type, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white p-6 rounded-lg shadow-sm"
                                >
                                    <div className="flex items-center mb-4">
                                        {type.icon}
                                        <h3 className="text-lg font-semibold text-gray-900 ml-3">
                                            {type.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600">{type.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Services Section */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="mx-4 text-2xl font-bold text-gray-900 mb-6">
                            Our Services
                        </h2>
                        <div className="mx-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center space-x-3"
                                >
                                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    <span className="text-gray-700">{service}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Benefits Section */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="mx-4 text-2xl font-bold text-gray-900 mb-6">
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

                    {/* CTA Section */}
                    <motion.div
                        variants={itemVariants}
                        className="mx-4 bg-gradient-to-r from-[#1a2e4c] to-blue-800 rounded-2xl shadow-lg p-8 text-center"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Keep your equipment running smoothly
                        </h2>
                        <p className="text-blue-100 mb-6">
                            Contact us to discuss your maintenance needs and create a customized plan.
                        </p>
                        <Link
                            to="/contact"
                        className="inline-block bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group flex items-center justify-center gap-3"
                        >
                            Get Started
                        </Link>
                    </motion.div>
                </motion.div>
            {/* </div> */}
        </div>
    );
};

export default EquipmentMaintenance;