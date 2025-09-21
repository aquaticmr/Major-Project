// src/components/ui/FeatureCard.jsx
import React from 'react';

function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto">
                    {icon}
                </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default FeatureCard;