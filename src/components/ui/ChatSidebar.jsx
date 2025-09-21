// src/components/ui/ChatSidebar.jsx
import React from 'react';
import { Plus, LogIn, GripHorizontal, Home, Trash2, BookOpen, GraduationCap, Rocket, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatSidebar = ({ setLevel, selectedLevel, theme, chats, setChats, isLoggedIn, setIsLoggedIn, openPricingDialog, onMobileCloseSidebar, language, setLanguage }) => { // Added language and setLanguage props
    const navigate = useNavigate();
    const isDarkTheme = theme === 'dark';

    const handleNewChat = () => {
        if (!isLoggedIn) {
            alert("Please sign in to save and manage chats.");
            return;
        }
        const newChatName = `Chat ${chats.length + 1}`;
        setChats([...chats, newChatName]);
        // In a real app, you would also initiate a new chat session and store it in local storage or backend.
        console.log("New chat added:", newChatName); // For debugging and feedback
    };

    const handleDeleteChat = (indexToDelete) => {
        const chatToDelete = chats[indexToDelete];
        const updatedChats = chats.filter((_, index) => index !== indexToDelete);
        setChats(updatedChats);
        // In a real app, you would also delete the chat session from local storage or backend.
        console.log("Chat deleted:", chatToDelete); // For debugging and feedback
    };

    const handleSignIn = () => {
        navigate('/signin'); // Redirect to sign-in page
        console.log("Navigating to sign-in page"); // For debugging and feedback
    };

    const handleSignOut = () => {
        setIsLoggedIn(false); // Example logout action
        setChats([]); // Clear chats on sign out for this example - adjust as needed
        console.log("User signed out"); // For debugging and feedback
    };

    const handleUpgradeClick = () => {
        openPricingDialog();
        console.log("Upgrade button clicked"); // For debugging and feedback
    };

    const handleHomeClick = () => {
        navigate('/'); // Navigate to home page
        console.log("Navigating to home page"); // For debugging and feedback
    };

    const handleLevelChange = (level) => {
        setLevel(level);
        console.log("Level changed to:", level); // For debugging and feedback
    };

    const handleMobileSidebarClose = () => {
        if (onMobileCloseSidebar) {
            onMobileCloseSidebar();
            console.log("Mobile sidebar close button clicked"); // For debugging and feedback
        }
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        console.log("Language changed to:", e.target.value); // For debugging and feedback
    };


    return (
        <aside className={`flex h-full w-64 flex-shrink-0 flex-col border-r border-gray-200 ${isDarkTheme ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800'}`}>
            {/* Sidebar Header - Home Link and Close Button for Mobile */}
            <div className="flex items-center justify-between px-4 py-3">
                <a href="/" className="flex items-center text-lg font-semibold" onClick={handleHomeClick}>
                    <Home size={20} className="mr-2" />
                    FInTech.ai
                </a>
                <button
                    onClick={handleMobileSidebarClose}
                    className="sm:hidden"
                    aria-label="Close Sidebar"
                >
                    <X size={20} className={`${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`} />
                </button>
            </div>

            {/* Navigation - User Levels */}
            <nav className="px-2 py-2">
                <NavItem
                    icon={<BookOpen size={18} />}
                    text="Basic"
                    level="basic"
                    setLevel={handleLevelChange}
                    isActive={selectedLevel === 'basic'}
                    theme={theme}
                />
                <NavItem
                    icon={<GraduationCap size={18} />}
                    text="Intermediate"
                    level="intermediate"
                    setLevel={handleLevelChange}
                    isActive={selectedLevel === 'intermediate'}
                    theme={theme}
                />
                <NavItem
                    icon={<Rocket size={18} />}
                    text="Advanced"
                    level="advanced"
                    setLevel={handleLevelChange}
                    isActive={selectedLevel === 'advanced'}
                    theme={theme}
                />
            </nav>

             {/* Language Selection */}
             <div className="px-4 py-2">
                <label htmlFor="chatbotLanguage" className="block text-xs font-medium uppercase text-gray-500 mb-1">
                    Language
                </label>
                <select
                    id="chatbotLanguage"
                    value={language}
                    onChange={handleLanguageChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isDarkTheme ? 'bg-gray-700 text-white border-gray-600 focus:ring-indigo-500 focus:border-indigo-500' : ''}`}
                >
                    <option value="en-IN">English (India)</option>
                    <option value="hi-IN">Hindi (India)</option>
                    <option value="gu-IN">Gujarati (India)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ru">Russian</option>
                    <option value="ar">Arabic</option>
                    <option value="pt">Portuguese</option>
                    <option value="ko">Korean</option>
                </select>
            </div>


            {/* Chats Section */}
            <div className="mt-4 px-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase text-gray-500">Chats</span>
                    <div className="flex items-center space-x-2 text-gray-500">
                        <Plus size={16} className="cursor-pointer hover:text-gray-700" onClick={handleNewChat} aria-label="New Chat" />
                        <GripHorizontal size={16} className="cursor-pointer hover:text-gray-700" aria-label="Reorder Chats" /> {/* Add aria-label for accessibility */}
                    </div>
                </div>
                {!isLoggedIn && (
                    <div className={`mb-4 rounded-md p-3 text-center text-sm ${isDarkTheme ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-600'}`}>
                        Login to save and revisit previous chats!
                    </div>
                )}
                {/* Chat List */}
                <div>
                    {isLoggedIn && chats.map((chat, index) => (
                        <div key={index} className="relative">
                            <a
                                href="#" // Replace with actual chat link/functionality
                                className={`block mb-1 rounded-md px-3 py-2 pr-8 text-sm ${isDarkTheme ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}
                            >
                                {chat}
                            </a>
                            <button
                                onClick={() => handleDeleteChat(index)}
                                className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600`}
                                aria-label={`Delete chat ${chat}`}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                    {isLoggedIn && chats.length === 0 && ( // Display message when no chats and logged in
                        <div className={`mb-4 rounded-md p-3 text-center text-sm ${isDarkTheme ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-600'}`}>
                            No chats yet. Start a new chat!
                        </div>
                    )}
                </div>
            </div>

            {/* Sign In/Out Button */}
            {!isLoggedIn && (
                <div className="px-4 mb-4">
                    <button
                        className={`flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${isDarkTheme ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        onClick={handleSignIn}
                    >
                        <LogIn size={16} className="mr-2" />
                        Sign in
                    </button>
                </div>
            )}
            {isLoggedIn && (
                <div className="px-4 mb-4">
                    <button
                        className={`flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${isDarkTheme ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        onClick={handleSignOut}
                    >
                        <LogIn size={16} className="mr-2 rotate-180" />
                        Sign out
                    </button>
                </div>
            )}


            {/* Bottom Section - Upgrade Button */}
            <div className="mt-auto border-t border-gray-200 p-4" style={{ borderTopColor: isDarkTheme ? '#4B5563' : '#D1D5DB' }}>
                <button
                    className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    onClick={handleUpgradeClick}
                >
                    Upgrade
                </button>
            </div>
        </aside>
    );
};

// Helper component for Navigation items
const NavItem = ({ icon, text, level, setLevel, isActive, theme }) => {
    const isDarkTheme = theme === 'dark';
    const handleClick = () => {
        setLevel(level);
    };

    return (
        <a
            href="#"
            className={`mb-1 flex items-center rounded-md px-3 py-2 text-sm ${isDarkTheme ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'} ${isActive ? (isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800') : ''}`}
            onClick={handleClick}
            aria-current={isActive ? "page" : undefined} // For accessibility - indicate current page
        >
            <span className="mr-3">{icon}</span>
            {text}
        </a>
    );
};

export default ChatSidebar;