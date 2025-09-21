// src/components/ui/KeyFeaturesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, BarChart2, PieChart, Percent, Lightbulb, Shield } from 'lucide-react';

const KeyFeatureCard = ({ icon, title, description, index }) => {
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: index * 0.15,
                type: 'spring',
                stiffness: 120,
            },
        },
    };

    return (
        <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            variants={cardVariants}
        >
            <div className="p-8">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                            {icon}
                        </div>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg leading-6 font-bold text-blue-900">{title}</h3>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-base text-gray-600">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};

const KeyFeaturesSection = () => {
    const sectionVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const features = [
        {
            icon: <DollarSign className="w-6 h-6" />,
            title: "AI-Powered Budgeting",
            description: "Intelligent budget creation, spending insights, and adaptive strategies to keep you on track.",
        },
        {
            icon: <BarChart2 className="w-6 h-6" />,
            title: "Bank Account Integration",
            description: "Seamlessly connect with major banks for automated transaction tracking and a holistic financial view.",
        },
        {
            icon: <PieChart className="w-6 h-6" />,
            title: "Investment Portfolio Management",
            description: "Track, analyze, and optimize your investments with AI-driven insights and performance metrics.",
        },
        {
            icon: <Percent className="w-6 h-6" />,
            title: "FD Manager",
            description: "Track fixed deposits, get maturity alerts, and discover better investment avenues for your savings.",
        },
        {
            icon: <Lightbulb className="w-6 h-6" />,
            title: "Personalized Financial Advisor",
            description: "Receive tailored financial advice based on your unique situation, goals, and risk tolerance.",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Data Security & Privacy",
            description: "End-to-end encryption and secure authentication ensure your financial data is always safe and private.",
        },
    ];

    return (
        <motion.section
            className="py-24 bg-white"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl font-extrabold text-blue-900 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Key Features
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Everything you need to master your finances, all in one place. Our platform is packed with powerful tools to help you succeed.
                    </motion.p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <KeyFeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default KeyFeaturesSection;