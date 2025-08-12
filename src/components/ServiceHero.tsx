import React from 'react';
import { motion } from 'framer-motion';

const ServiceHero = ({ title, description, icon: Icon, bgColor = 'bg-slate-900', textColor = 'text-white' }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className={`${bgColor} w-full p-8 mb-12 flex flex-col items-center justify-center text-center h-[300px] ${textColor}`}
        >
            <div className="flex items-center mb-6 mt-4">
                {/* Conditionally render the icon container */}
                {Icon && (
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-6">
                        <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                )}
                <h1 className={`text-xl font-bold lg:text-4xl ${!Icon ? '' : '-ml-4 lg:-ml-0'}`}>
                    {title}
                </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl">
                {description}
            </p>
        </motion.div>
    );
};

export default ServiceHero;