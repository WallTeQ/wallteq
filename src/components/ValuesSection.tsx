import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ValuesSection: React.FC = () => {
    const values = ["EXCELLENCE", "INNOVATION", "COMMITMENT", "REPUTATION"];
    const paragraphs = [
        "We uphold the highest standards of quality and professionalism in every aspect of our services, ensuring exceptional outcomes for our clients.",
        "Embracing cutting-edge technologies, we deliver innovative solutions that address the evolving needs of our clients and the market.",
        "We are dedicated to understanding our clients' unique challenges and working closely with them to achieve mutual success.",
        "We strive to maintain and enhance our reputation through consistent performance and transparent communication."
    ];
    const [currentValueIndex, setCurrentValueIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrentValueIndex((prevIndex) => (prevIndex + 1) % values.length);
        }, 5000); // Changed interval to 5000ms (5 seconds)
        return () => clearInterval(interval);
    }, [values.length, isPaused]);

    const handlePlayButtonClick = () => {
        setIsPaused((prev) => !prev);
    };

    return (
        <section className="relative bg-gray-800 text-white h-[70vh] md:h-screen flex items-center justify-center">
            {/* Background image overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{
                    backgroundImage: `url('https://assets.isu.pub/document-structure/220317213720-acd890e8e971f33d46633b91bdedcffd/v1/58273e0ea6f5b8c0e822313811760634.jpeg')`,
                }}
            ></div>

            {/* Content */}
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
                }}
                className="relative z-10 text-center px-4"
            >
                <h2 className="text-lg sm:text-xl font-medium uppercase tracking-wide">our values</h2>
                <motion.h1
                    className="text-4xl sm:text-6xl font-bold mt-2"
                    key={currentValueIndex} // Key prop to trigger re-render
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {values[currentValueIndex]}
                </motion.h1>
                <p className="text-base sm:text-2xl mt-4">{paragraphs[currentValueIndex]}</p>
                {/* Play button */}
                <div className="mt-6 flex justify-center">
                    <motion.button
                        className="w-12 h-12 sm:w-16 sm:h-16 bg-white text-red-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
                        aria-label="Play"
                        animate={{ opacity: [2, 0.7, 2], scale: isPaused ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        onClick={handlePlayButtonClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="w-6 h-6 sm:w-8 sm:h-8"
                        >
                            <path d="M11.596 8.697l-6-4A.5.5 0 0 0 5 5v6a.5.5 0 0 0 .596.485l6-2a.5.5 0 0 0 0-.97z" />
                        </svg>
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
};

export default ValuesSection;