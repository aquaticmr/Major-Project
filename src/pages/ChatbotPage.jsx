// src/pages/ChatbotPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import ChatSidebar from '../components/ui/ChatSidebar';
import ChatInput from '../components/layout/ChatInput';
import Message from '../components/ui/Message';
import SuggestionPrompts from '../components/ui/SuggestionPrompts';
import { SquarePen, ChevronDown, Lock, Sun, Moon, Settings, Menu } from 'lucide-react'; // Imported Menu icon
import { GeminiAPI } from "../features/chatAI/GeminiAPI";
import { BeatLoader } from "react-spinners";
import PricingDialog from '../components/ui/PricingDialog'; // Import PricingDialog

const ChatbotPage = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [userLevel, setUserLevel] = useState('basic');
    const [theme, setTheme] = useState('light');
    const [utilitiesOpen, setUtilitiesOpen] = useState(false);
    const [chats, setChats] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility - initially closed on mobile
    const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false); // State for pricing dialog
    const [language, setLanguage] = useState('en-US'); // Added language state, default to English (India)


    // --- SYSTEM PROMPT ---
    const systemPromptBase = `You are a specialized financial advisor chatbot. Your sole purpose is to provide information and answer questions strictly related to finance, investing, economics, stock markets, personal finance management, budgeting, financial planning, insurance, and related financial concepts.

Do NOT answer questions about any other topics, including but not limited to: general knowledge, history, science, celebrities, coding, cooking, creative writing, or personal opinions unrelated to finance.

If the user asks a question outside of your designated financial domain, you MUST respond with a polite refusal stating your specialization. For example: "I am a financial advisor bot and can only help with finance-related questions. Please ask something about finance, investing, or economics." or "My apologies, I specialize in financial topics. Could you ask a question related to finance?"

Do not engage in casual conversation unrelated to finance. Stick strictly to your role as a financial advisor assistant.`;

    const getSystemPrompt = (level, currentLanguage) => {
        let levelInstructions = "";
        if (level === 'intermediate') {
            levelInstructions = ` Provide more detailed explanations and assume the user has some existing financial knowledge. The user level is ${level}.`;
        } else if (level === 'advanced') {
            levelInstructions = ` Provide highly detailed and technical answers, assuming the user has significant financial expertise. Use financial jargon where appropriate. The user level is ${level}.`;
        } else {
            levelInstructions = ` Provide simple and easy-to-understand explanations suitable for beginners in finance. Avoid complex jargon. The user level is ${level}.`;
        }
        return systemPromptBase + levelInstructions + ` Please respond in ${currentLanguage} language.`;
    };
    // --- END SYSTEM PROMPT ---

    const geminiAPI = new GeminiAPI();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isLoggedIn) {
            const storedChats = localStorage.getItem('fintech_chats');
            if (storedChats) {
                setChats(JSON.parse(storedChats));
            }
        } else {
            setChats([]);
            localStorage.removeItem('fintech_chats');
        }
    }, [isLoggedIn]);


    useEffect(() => {
        if (isLoggedIn) {
            localStorage.setItem('fintech_chats', JSON.stringify(chats));
        }
    }, [chats, isLoggedIn]);


    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSendMessage = async (messageText) => {
        if (!messageText.trim()) return;

        const newUserMessage = { text: messageText, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setIsLoading(true);


        const currentSystemPrompt = getSystemPrompt(userLevel, language);
        const fullPrompt = `${currentSystemPrompt}\n\nUser Question: ${messageText}\n\nAnswer:`;


        try {
            const botResponse = await geminiAPI.generateContent(fullPrompt);
            const responseText = typeof botResponse === 'string' ? botResponse : JSON.stringify(botResponse);
            const newBotMessage = { text: responseText, sender: "bot" };
            setMessages((prevMessages) => [...prevMessages, newBotMessage]);
        } catch (error) {
            console.error("Error getting response:", error);
            const errorBotMessage = { text: "Sorry, I encountered an error processing your request. Please try again.", sender: "bot" };
            setMessages((prevMessages) => [...prevMessages, errorBotMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (prompt) => {
        handleSendMessage(prompt);
    };

    const handleSetLevel = (level) => {
        setUserLevel(level);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleClearChatHistory = () => {
        setMessages([]); // Clear messages in ChatbotPage
        setChats([]); // Clear chats in Sidebar (and local storage indirectly via useEffect)
    };

    const handleExportChat = () => {
        if (messages.length === 0) {
            alert("No chat history to export.");
            return;
        }

        const chatText = messages.map(msg => `${msg.sender.toUpperCase()}: ${msg.text}`).join('\n\n');
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'fintech_chat_history.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const openPricingDialog = () => {
        setIsPricingDialogOpen(true);
    };

    const closePricingDialog = () => {
        setIsPricingDialogOpen(false);
    };


    const prompts = [
        'What is the difference between stocks and bonds?',
        'How does compound interest work?',
        'Explain the concept of diversification in investing.',
        'What are some common budgeting strategies?',
    ];

    const isDarkTheme = theme === 'dark';

    return (
        <div className={`flex h-screen overflow-hidden ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white'}`}>
            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} sm:block w-64 flex-shrink-0 h-screen`}> {/* Sidebar is hidden on small screens, visible on sm and up */}
                <ChatSidebar
                    setLevel={handleSetLevel}
                    selectedLevel={userLevel}
                    theme={theme}
                    chats={chats}
                    setChats={setChats}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    clearChatHistory={handleClearChatHistory}
                    openPricingDialog={openPricingDialog} // Pass openPricingDialog function
                    onMobileCloseSidebar={toggleSidebar} // Pass function to close sidebar from mobile
                    language={language} // Pass language state
                    setLanguage={setLanguage} // Pass setLanguage function
                />
            </div>
            <div className="flex flex-1 flex-col">
                {/* Top Bar */}
                <div className={`flex h-[55px] flex-shrink-0 items-center justify-between border-b ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'} px-4 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center">
                        {/* Hamburger Menu - Visible on smaller screens */}
                        <button
                            onClick={toggleSidebar}
                            className="sm:hidden mr-4" // Hidden on small screens and up, visible below sm
                        >
                            <Menu className={`h-5 w-5 cursor-pointer ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} />
                        </button>
                        <SquarePen className={`mr-4 h-5 w-5 cursor-pointer ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`mr-1 font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>Financial Advisor Chat</span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={toggleTheme}
                            className={`flex items-center rounded-md border ${isDarkTheme ? 'border-gray-600 hover:bg-gray-700 text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-700'} px-3 py-1 text-sm`}
                        >
                            {isDarkTheme ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setUtilitiesOpen(!utilitiesOpen)}
                                className={`flex items-center rounded-md border ${isDarkTheme ? 'border-gray-600 hover:bg-gray-700 text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-700'} px-3 py-1 text-sm`}
                            >
                                <Settings className="mr-1.5 h-4 w-4" /> Utilities
                            </button>
                            {utilitiesOpen && (
                                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-xl z-10 ${isDarkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
                                    <button
                                        onClick={handleClearChatHistory} // Call handleClearChatHistory
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${isDarkTheme ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700'}`}
                                    >
                                        Clear Chat History
                                    </button>
                                    <button
                                        onClick={handleExportChat} // Call handleExportChat
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${isDarkTheme ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700'}`}
                                    >
                                        Export Chat
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Chat Messages Area */}
                <div className={`flex-1 overflow-y-auto p-4 md:p-6 ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
                    {messages.length === 0 && !isLoading ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <h1 className={`mb-1 text-xl font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'} mt-12`}>FinTech Advisor</h1>
                            <p className={`mb-8 ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>Ask me anything about finance, investing, or economics.</p>
                            <div className="w-full max-w-xl">
                                <SuggestionPrompts prompts={prompts} onPromptClick={handleSuggestionClick} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {messages.map((message, index) => (
                                <Message key={index} text={message.text} sender={message.sender} theme={theme} />
                            ))}
                            {isLoading && (
                                <div
                                    className={`max-w-[85%] self-start break-words rounded-lg p-3 mb-2 shadow-sm mr-auto ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}
                                >
                                    <BeatLoader color={isDarkTheme ? "#D1D5DB" : "#6B7280"} size={8} />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Chat Input Area */}
                <div className={`px-4 pb-4 md:px-6 md:pb-6 border-t ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} pt-4`}>
                    <ChatInput onSendMessage={handleSendMessage} theme={theme} />
                    <p className={`text-xs ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'} text-center mt-2 px-2`}>
                        Disclaimer: This chatbot provides information for educational purposes only and is not financial advice. Consult with a qualified professional for personalized advice.
                    </p>
                </div>
            </div>

            {/* Pricing Dialog - Conditionally rendered */}
            {isPricingDialogOpen && (
                <PricingDialog onClose={closePricingDialog} theme={theme} />
            )}
        </div>
    );
};

export default ChatbotPage;
