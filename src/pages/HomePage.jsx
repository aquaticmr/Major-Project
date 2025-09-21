// src/features/home/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/ui/HeroSection';
import HowItWorksSection from '../components/ui/HowItWorksSection';
import KeyFeaturesSection from '../components/ui/KeyFeaturesSection';
import FeedbackCards from '../components/ui/FeedbackCards';
import { motion } from 'framer-motion';
import LoadingWrapper from '../components/ui/LoadingWrapper'; // Import LoadingWrapper

function HomePage() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <LoadingWrapper>
            <div className="bg-white font-sans">
                <Navbar />

                <HeroSection />

                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <HowItWorksSection />
                </motion.div>

                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <KeyFeaturesSection />
                </motion.div>

                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <FeedbackCards />
                </motion.div>

                <Footer />
            </div>
        </LoadingWrapper>
    );
}

export default HomePage;
