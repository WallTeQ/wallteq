import React from 'react';
import { motion } from 'framer-motion';
import { Network, ArrowLeft, CheckCircle, Server, Cloud, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceHero from '../components/ServiceHero';
const ITDeployment = () => {
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

    const deploymentTypes = [
        {
            icon: <Server className="w-8 h-8 text-blue-600" />,
            title: "On-Premise Deployment",
            description: "Traditional deployment within your physical infrastructure",
        },
        {
            icon: <Cloud className="w-8 h-8 text-blue-600" />,
            title: "Cloud Deployment",
            description: "Flexible and scalable cloud-based solutions",
        },
        {
            icon: <Shield className="w-8 h-8 text-blue-600" />,
            title: "Hybrid Deployment",
            description: "Best of both worlds with combined deployment strategies",
        },
    ];

    const benefits = [
        "Reduced deployment time and costs",
        "Minimized system downtime",
        "Standardized deployment process",
        "Enhanced security measures",
        "Scalable infrastructure",
        "Comprehensive documentation",
    ];

    const process = [
        {
            title: "Assessment & Planning",
            description: "Evaluate current infrastructure and define deployment strategy",
        },
        {
            title: "Environment Preparation",
            description: "Set up and configure deployment environment",
        },
        {
            title: "Testing & Validation",
            description: "Thorough testing of deployment procedures",
        },
        {
            title: "Deployment Execution",
            description: "Systematic rollout of IT infrastructure",
        },
        {
            title: "Post-Deployment Support",
            description: "Ongoing monitoring and optimization",
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
                        className="ml-4  inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
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
                        title="IT Deployment Services"
                        description="Strategic planning and implementation of IT infrastructure across your organization. We ensure smooth deployment of systems, applications, and network resources."
                        icon={Network}
                    />

                    {/* Deployment Types */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="mx-4 text-2xl font-bold text-gray-900 mb-6">
                            Deployment Options
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {deploymentTypes.map((type, index) => (
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

                    {/* Process Section */}
                    <motion.div variants={itemVariants}>
                        <h2 className="mx-4 text-2xl font-bold text-gray-900 mb-6">
                            Deployment Process
                        </h2>
                        <div className="relative">
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200" />
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

                    {/* CTA Section */}
                    <motion.div
                        variants={itemVariants}
                        className="mx-4 bg-gradient-to-r from-[#1a2e4c] to-blue-800 rounded-2xl shadow-lg p-8 mt-12 text-center"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Ready to deploy your IT infrastructure?
                        </h2>
                        <p className="text-blue-100 mb-6">
                            Let's discuss your deployment requirements and create a strategic plan.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block bg-gradient-to-r from-[#1a2e4c] to-blue-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
                        >
                            Schedule Consultation
                        </Link>
                    </motion.div>
                </motion.div>
            {/* </div> */}
        </div>
    );
};

export default ITDeployment;