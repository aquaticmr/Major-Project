// src/components/layout/ChatInput.jsx
import React, { useState } from "react";
import { Send } from "lucide-react"; // Import Send icon

const ChatInput = ({ onSendMessage, theme }) => { // Receive theme prop
    const [message, setMessage] = useState("");
    const isDarkTheme = theme === 'dark'; // Helper for dark theme check

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            onSendMessage(message); // Call the passed function
            setMessage(""); // Clear the input
        }
    };

    return (
        // Form structure for input and button
        <form onSubmit={handleSubmit} className="relative mx-auto flex max-w-xl items-center">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a message..."
                // Styling for the input field - now theme-aware
                className={`flex-grow appearance-none rounded-lg border ${isDarkTheme ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            />
            <button
                type="submit"
                disabled={!message.trim()} // Disable button if input is empty
                // Styling for the send button (changes based on disabled state) - now theme-aware
                className={`ml-2 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    message.trim()
                        ? `border-transparent ${isDarkTheme ? 'bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-400 shadow-sm' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm focus:ring-indigo-500'}` // Enabled state - theme aware
                        : `border-gray-300 ${isDarkTheme ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}` // Disabled state - theme aware
                }`}
            >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span> {/* For screen readers */}
            </button>
        </form>
    );
};

export default ChatInput;