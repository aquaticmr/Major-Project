// src/components/ui/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.section
            className="relative bg-gradient-to-b from-blue-50 via-white to-blue-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto px-6 py-24 text-center flex flex-col items-center">
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-6 leading-tight"
                    variants={textVariants}
                >
                    <TypeAnimation
                        sequence={[
                            'Navigate Your Financial Future with',
                            1000,
                            '',
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ display: 'inline-block' }}
                        repeat={Infinity}
                    />
                    <br />
                    <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                    >
                        AI-Powered Precision
                    </motion.span>
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-blue-800 max-w-3xl mx-auto mb-10"
                    variants={itemVariants}
                >
                    Unlock smarter financial decisions. Our AI-driven platform provides personalized insights, budget planning, and risk analysis to help you achieve your financial goals with confidence.
                </motion.p>
                <motion.div
                    className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
                    variants={itemVariants}
                >
                    <Link to="/sign-up">
                        <motion.button
                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform flex items-center space-x-2"
                            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.7)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Get Started for Free</span>
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                    <Link to="/about">
                        <motion.button
                            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full border-2 border-blue-600 shadow-md transition-all duration-300 transform"
                            whileHover={{ scale: 1.1, backgroundColor: "#eff6ff", boxShadow: "0px 0px 15px rgba(239, 246, 255, 0.8)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
            <motion.div
                className="hidden lg:block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-64"
                variants={imageVariants}
            >
                <img
                    src="https://cdn.dribbble.com/users/236991/screenshots/1073136/chart.gif"
                    alt="Financial Dashboard"
                    className="object-contain w-full h-full"
                />
            </motion.div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
        </motion.section>
    );
};

export default HeroSection;