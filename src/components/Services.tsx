import React from 'react';
import { ArrowRightIcon, FolderIcon, ServerIcon, ShieldIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            title: 'Managed IT Services',
            description: 'Comprehensive 24/7 maintenance and monitoring to ensure your computers, servers, and systems are always up and running smoothly.',
            icon: <FolderIcon className="w-12 h-12 text-navy-800 mt-6" />,
            linkText: 'Stay up and running',
            href: '/services',
        },
        {
            title: 'Deployment and Maintenance',
            description: 'Efficient deployment of IT systems and ongoing maintenance to ensure optimal performance and reliability for your business operations.',
            icon: <ServerIcon className="w-12 h-12 text-navy-800 mt-6" />,
            linkText: 'Optimize your systems',
            href: '/services',
        },
        {
            title: 'Mobile and Web Development',
            description: 'Custom mobile and web applications designed to meet your business needs, ensuring seamless functionality and user experience.',
            icon: <ShieldIcon className="w-12 h-12 text-navy-800 mt-6" />,
            linkText: 'Build your solutions',
            href: '/services',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, rotate: -2 },
        visible: {
            opacity: 1,
            y: 0,
            rotate: 0,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className="w-full bg-gray-50 mt-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="text-center mb-12 md:mb-16"
                >
                    <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
                        OUR SERVICES
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-900">
                        Stay Up, Stay Running, Stay Protected
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03, rotate: 1 }}
                            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex flex-col items-center text-center h-full">
                                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 flex-grow">
                                    {service.description}
                                </p>
                                <motion.div
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 5,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {service.icon}
                                </motion.div>
                                <Link
                                    to={service.href}
                                    className="inline-flex items-center text-[#3B82F6] font-medium mt-6 hover:text-blue-700 transition-colors duration-300"
                                >
                                    {service.linkText}
                                    <ArrowRightIcon className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="text-center my-4">
                    <Link
                        to="/services"
                        className="inline-flex items-center text-[#3B82F6] hover:text-blue-700 font-medium text-lg transition-colors duration-300"
                    >
                        Explore All WallTeQ Services
                        <ArrowRightIcon className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;