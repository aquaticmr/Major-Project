// src/components/ui/FeedbackCards.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const feedbacks = [
    {
        name: "Suresh Dhamnkar",
        title: "Happy Customer",
        feedback: "The AI-powered advice is surprisingly insightful. I've discovered savings I didn't know I could make. Highly recommend!",
        image: "https://th.bing.com/th/id/OIP.Ee7pg-0WD9WBjBCeoEhxrwHaLZ?w=810&h=1246&rs=1&pid=ImgDetMain",
        rating: 5,
    },
    {
        name: "Dinesh Kumar",
        title: "Satisfied User",
        feedback: "Easy to use and understand. The spending tracker is fantastic, and the budget planner is helping me stay on track. Great product!",
        image: 'https://th.bing.com/th/id/OIP.ZVPNwiGRP68Ji-RDuCep5QHaHa?w=626&h=626&rs=1&pid=ImgDetMain',
        rating: 5,
    },
    {
        name: "Anushka Chaudhary",
        title: "Loyal User",
        feedback: "A game-changer for managing my finances. The portfolio analysis gave me the clarity I needed to rebalance my investments.",
        image: "https://th.bing.com/th/id/OIP.bDIlzptISFNENH19DHSwewHaHu?w=783&h=817&rs=1&pid=ImgDetMain",
        rating: 4,
    }
];

const FeedbackCard = ({ name, title, feedback, image, rating, index }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut"
            },
        },
    };

    return (
        <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
        >
            <img className="w-24 h-24 rounded-full object-cover mb-4 shadow-md" src={image} alt={name} />
            <h4 className="text-xl font-bold text-blue-900">{name}</h4>
            <p className="text-sm text-gray-500 mb-4">{title}</p>
            <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                ))}
            </div>
            <p className="text-gray-600 italic">"{feedback}"</p>
        </motion.div>
    );
};

const FeedbackCards = () => {
    const sectionVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <motion.section
            className="py-24 bg-blue-50"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
                        Loved by Users Worldwide
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Don't just take our word for it. Here's what our satisfied customers have to say about their journey to financial wellness.
                    </motion.p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {feedbacks.map((feedback, index) => (
                        <FeedbackCard
                            key={index}
                            {...feedback}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default FeedbackCards;
