import React from 'react';

function FeedbackCard({ feedback, name, position }) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md hover:scale-105 transform transition duration-300">
            <p className="text-gray-600 italic">"{feedback}"</p>
            <div className="mt-4 text-gray-800 font-semibold">{name}</div>
            <div className="text-gray-500">{position}</div>
        </div>
    );
}

export default FeedbackCard;
