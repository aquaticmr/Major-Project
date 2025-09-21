import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { GeminiAPI } from '../chatAI/GeminiAPI';

const ChatWithPDF = ({ pdfText }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const geminiAPI = new GeminiAPI();

    const systemPrompt = `You are a specialized financial and policy advisor bot. Your task is to answer questions based *only* on the provided PDF document text. The document contains financial or policy information. you can respond to Hi hello

- **Strictly Adhere to the Document:** Answer only using the information found within the document. Do not use any external knowledge.
- **Finance and Policy Focus:** If the user asks a question that is not related to finance, policy, or the content of the document, you must politely refuse. For example, say: "I can only answer questions related to the provided financial document."
- **Be Concise:** Provide clear and concise answers based on the text.

Here is the document you need to analyze:
---
${pdfText}
---`;

    useEffect(() => {
        setMessages([
            {
                sender: 'bot',
                text: "Hello! I'm ready to answer your questions about this document. What would you like to know?"
            }
        ]);
    }, [pdfText]);

    const handleSendMessage = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // The context is now the system prompt which already includes the pdfText
            const response = await geminiAPI.generateContent(input, systemPrompt);

            const botMessage = { sender: 'bot', text: response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error with Gemini API:", error);
            const errorMessage = { sender: 'bot', text: "Sorry, I'm having trouble responding right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="mt-12 bg-white rounded-2xl shadow-xl p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Chat with Your PDF</h3>
            <div className="h-96 bg-gray-50 rounded-lg p-4 overflow-y-auto flex flex-col space-y-4">
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {msg.sender === 'bot' && <Bot className="w-8 h-8 text-blue-600 flex-shrink-0" />}
                        <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            <p>{msg.text}</p>
                        </div>
                        {msg.sender === 'user' && <User className="w-8 h-8 text-gray-600 flex-shrink-0" />}
                    </motion.div>
                ))}
                {isLoading && (
                    <div className="flex items-center gap-3">
                        <Bot className="w-8 h-8 text-blue-600 flex-shrink-0" />
                        <div className="max-w-md p-3 rounded-lg bg-gray-200 text-gray-800">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-6 flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask a question about your document..."
                    className="flex-grow px-4 py-2 text-gray-800 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="bg-blue-600 text-white font-bold px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
};

export default ChatWithPDF;
