// src/components/ui/KeyFeatureCard.jsx
import React from 'react';

function KeyFeatureCard({ icon, title, description }) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center space-x-2">
                <span className="text-blue-500">{icon}</span>
                <span>{title}</span>
            </h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default KeyFeatureCard;