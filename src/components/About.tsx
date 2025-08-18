import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 15,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="relative w-full pt-16 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <motion.div
                    className="space-y-6 mb-16 text-center lg:text-left lg:flex lg:items-center lg:justify-between lg:space-x-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    <motion.div className="lg:w-1/2" variants={itemVariants}>
                        <p className="text-[#3B82F6] font-medium text-lg uppercase tracking-wide">
                            About WALLTEQ
                        </p>
                        <h1 className="text-xl md:text-3xl lg:text-5xl mt-5 font-bold leading-snug">
                            WallTeQ is your trusted source in software development services and support
                        </h1>
                    </motion.div>
                    <motion.div className="lg:w-1/2" variants={itemVariants}>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                            WallTeQ is a privately owned IT Support and IT Services business
                            formed in 2006. Today we're proud to boast a strong team of IT
                            engineers who thrive on rolling up their sleeves and solving your IT
                            problems and meeting your business needs.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Cards Section */}
                <motion.div
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={containerVariants}
                >
                    {/* Card 1 */}
                    <Link to={"/services"}>
                        <motion.div className="relative group block" variants={itemVariants}>
                            <div className="h-48 rounded-lg overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                                    alt="Business meeting"
                                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="absolute inset-x-4 -bottom-6 bg-white text-center p-4 rounded-lg shadow-md transition-all duration-300 group-hover:bottom-0 group-hover:shadow-lg">
                                <p className="text-[#3B82F6] font-medium group-hover:opacity-0 transition-opacity duration-300">Our services</p>
                                <h3 className="text-lg font-bold text-[#1D1B26]">How we can help</h3>
                                <p className="text-[#3B82F6] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Learn more</p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Card 2 */}
                    <Link to={"/why-us"}>
                        <motion.div className="relative group block" variants={itemVariants}>
                            <div className="h-48 rounded-lg overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                                    alt="Team collaboration"
                                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="absolute inset-x-4 -bottom-6 bg-white text-center p-4 rounded-lg shadow-md transition-all duration-300 group-hover:bottom-0 group-hover:shadow-lg">
                                <p className="text-[#3B82F6] font-medium group-hover:opacity-0 transition-opacity duration-300">Our expertise</p>
                                <h3 className="text-lg font-bold text-[#1D1B26]">Why partner with us</h3>
                                <p className="text-[#3B82F6] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Discover more</p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Card 3 */}
                    <Link to={"/clients"} className="sm:col-span-2 lg:col-span-1">
                        <motion.div className="relative group block" variants={itemVariants}>
                            <div className="h-48 rounded-lg overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                                    alt="Customer success"
                                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="absolute inset-x-4 -bottom-6 bg-white text-center p-4 rounded-lg shadow-md transition-all duration-300 group-hover:bottom-0 group-hover:shadow-lg">
                                <p className="text-[#3B82F6] font-medium group-hover:opacity-0 transition-opacity duration-300">Our customers</p>
                                <h3 className="text-lg font-bold text-[#1D1B26]">Client success stories</h3>
                                <p className="text-[#3B82F6] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Discover more</p>
                            </div>
                        </motion.div>
                    </Link>
                </motion.div>
            </div>

            
        </section>
    );
};

export default About;