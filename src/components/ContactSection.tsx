import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import backGroundImg from "../assets/images/business-team.png";
import ContactForm from "./forms/ContactForm";
import { Link } from "react-router-dom";

const ContactSection = () => {

    return (
        <div
            className="relative w-full overflow-hidden md:mt-10 mt-4  min-h-[600px]"
            style={{
                backgroundImage: `url(${backGroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-white opacity-70"></div>

            {/* Content Section */}
            <motion.div
                className="mt-52 relative z-10 flex flex-col items-center justify-center px-6 sm:px-8 py-16 text-center h-full"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <p className="text-blue-700 font-medium text-sm sm:text-base mb-3">
                    Let's get started
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6 max-w-3xl">
                    Are you ready for a better, more productive business?
                </h1>

                <p className="text-lg text-gray-700 font-bold mb-4">
                    Stop worrying about technology problems. Focus on your business.
                </p>
                <p className="text-lg text-gray-700 font-bold mb-8">
                    Let us provide the support you deserve.
                </p>

                <Link to="/contact-us"
                    // onClick={handleButtonClick}
                    className="inline-block bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group flex items-center justify-center gap-3"

                >
                    Contact us Now
                </Link>
            </motion.div>

        </div>
    );
};

export default ContactSection;