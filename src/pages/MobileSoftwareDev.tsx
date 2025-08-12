import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Cloud, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceHero from '../components/ServiceHero';
const MobileSoftwareDevelopment = () => {
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
            title: "Custom Mobile Apps",
            description: "Tailored mobile applications for iOS and Android",
        },
        {
            title: "Web Development",
            description: "Responsive and scalable web applications",
        },
        {
            title: "Cloud Integration",
            description: "Seamless integration with cloud services",
        },
        {
            title: "UI/UX Design",
            description: "User-centric design for optimal user experience",
        },
        {
            title: "Agile Development",
            description: "Iterative development for faster delivery",
        },
        {
            title: "Maintenance & Support",
            description: "Ongoing support and updates for your applications",
        },
    ];

    const benefits = [
        "Enhanced user engagement",
        "Scalable solutions for growth",
        "Cross-platform compatibility",
        "Faster time-to-market",
        "Secure and reliable applications",
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
                        title="Mobile & Software Development"
                        description="Build innovative and scalable mobile and software solutions tailored to your business needs."
                        icon={Smartphone}
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
                        className="mx-4 bg-gradient-to-r from-[#1a2e4c] to-blue-800 rounded-2xl shadow-lg p-8 text-center"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Ready to build your next app?
                        </h2>
                        <p className="text-white mb-6">
                            Let's create something amazing together.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block bg-gradient-to-r from-[#1a2e4c] to-blue-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
                        >
                            Get Started
                        </Link>
                    </motion.div>
                </motion.div>
            {/* </div> */}
        </div>
    );
};

export default MobileSoftwareDevelopment;