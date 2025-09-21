// src/components/ui/HowItWorksSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Bot, Target } from 'lucide-react';

const FeatureCard = ({ icon, title, description, index }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.2,
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center"
            variants={cardVariants}
        >
            <div className="bg-blue-100 p-4 rounded-full mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </motion.div>
    );
};

const HowItWorksSection = () => {
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const features = [
        {
            icon: <FileText className="w-8 h-8 text-blue-600" />,
            title: "Legal Document Analysis",
            description: "Identify potential risks and key clauses in legal and financial documents with our AI-powered analysis.",
        },
        {
            icon: <Search className="w-8 h-8 text-blue-600" />,
            title: "Track Your Spending",
            description: "Automatically categorize transactions and visualize your spending to gain insights and control over your budget.",
        },
        {
            icon: <Bot className="w-8 h-8 text-blue-600" />,
            title: "AI-Powered Financial Advice",
            description: "Receive personalized guidance, investment recommendations, and actionable insights from our intelligent AI assistant.",
        },
        {
            icon: <Target className="w-8 h-8 text-blue-600" />,
            title: "Smart Budget Planning",
            description: "Create dynamic, goal-oriented budgets with AI suggestions based on your income, spending, and financial aspirations.",
        },
    ];

    return (
        <motion.section
            className="py-24 bg-gray-50"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    className="text-4xl font-extrabold text-blue-900 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    How It Works
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Four simple steps to take control of your financial life.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {features.map((feature, index) => (
                        <FeatureCard
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

export default HowItWorksSection;
