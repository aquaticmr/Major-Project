// src/components/ui/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BanknotesIcon,
    DocumentChartBarIcon,
    QuestionMarkCircleIcon,
    Bars3Icon, // Hamburger Icon
    XMarkIcon, // Close Icon
    ListBulletIcon,
    ChatBubbleLeftRightIcon,
    TrophyIcon,
    ShoppingCartIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import { useAuth, SignOutButton, SignInButton, UserButton, SignUpButton } from '@clerk/clerk-react'; // Added SignInButton and UserButton

function Navbar() {
    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const { isSignedIn } = useAuth();

    const toggleDesktopDropdown = () => {
        setIsDesktopDropdownOpen(!isDesktopDropdownOpen);
    };

    const closeDesktopDropdown = () => {
        setIsDesktopDropdownOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutsideDropdown = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDesktopDropdown();
            }
        };

        const handleClickOutsideMobileMenu = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMobileMenuOpen) {
                closeMobileMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutsideDropdown);
        document.addEventListener('mousedown', handleClickOutsideMobileMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown);
            document.removeEventListener('mousedown', handleClickOutsideMobileMenu);
        };
    }, [isDesktopDropdownOpen, isMobileMenuOpen]); // Removed refs from dependency array

    const signUpButtonStyle = "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer transition-colors block w-full text-center";

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo - Only visible on Desktop */}
                <Link to="/" className="items-center cursor-pointer hidden md:flex">
                    <img src="./Logo.png" alt="Financial AI Logo" className="h-8 mr-2" />
                    <span className="font-bold text-xl text-black">FinoAddWise</span>
                </Link>

                {/* Logo - Only visible on Mobile */}
                <Link to="/" className="flex items-center cursor-pointer md:hidden">
                    <img src="./Logo.png" alt="Financial AI Logo" className="h-8 mr-2" />
                    <span className="font-bold text-xl text-black">FinoAddWise</span>
                </Link>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="focus:outline-none cursor-pointer" aria-label="Toggle mobile menu">
                        {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6 text-gray-700" /> : <Bars3Icon className="h-6 w-6 text-gray-700" />}
                    </button>
                </div>

                {/* Navigation Links (Desktop) - UNCHANGED */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/home" className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300">Home</Link>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDesktopDropdown}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none flex items-center cursor-pointer transition-colors duration-300"
                            aria-expanded={isDesktopDropdownOpen}
                            aria-haspopup="true"
                        >
                            Features
                            <svg className={`w-4 h-4 ml-1 transition-transform duration-300 ${isDesktopDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {isDesktopDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                                <Link to="/financial-advice" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300" onClick={closeDesktopDropdown}>
                                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-500" />
                                    <span>AI Financial Advice</span>
                                </Link>
                                <Link to="/pdf-risk-analysis" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300" onClick={closeDesktopDropdown}>
                                    <DocumentChartBarIcon className="h-5 w-5 text-green-500" />
                                    <span>PDF Risk Analysis</span>
                                </Link>
                                <Link to="/budget-planner" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300" onClick={closeDesktopDropdown}>
                                    <BanknotesIcon className="h-5 w-5 text-purple-500" />
                                    <span>Budget Planner</span>
                                </Link>
                                <Link to="/credit-card-recommender" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300" onClick={closeDesktopDropdown}>
                                    <CreditCardIcon className="h-5 w-5 text-red-500" />
                                    <span>Credit Card Recommender</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link to="/about" className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300">About</Link>
                    <Link to="/team" className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300">Team</Link>
                </div>

                {/* Auth Buttons (Desktop) */}
                <div className="hidden md:flex items-center space-x-4">
                    {isSignedIn ? (
                        <UserButton afterSignOutUrl="/" />
                    ) : (
                        <>
                           <div className="flex-shrink-0">
                                <SignInButton afterSignInUrl="/" className="block text-center bg-white text-gray-700 py-2 px-4 rounded-full cursor-pointer transition-colors hover:bg-gray-100">Sign In</SignInButton>
                            </div>
                            <SignUpButton afterSignUpUrl="/" className={signUpButtonStyle}>Sign Up</SignUpButton>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu - REFACTORED */}
            <div
                ref={mobileMenuRef}
                className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-20 transform transition-all duration-300 origin-top ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <nav className="py-2 px-6">
                    <Link to="/home" className="block py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <ListBulletIcon className="h-5 w-5 text-gray-500" /> <span>Home</span>
                    </Link>
                    <Link to="/financial-advice" className="block py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" /> <span>Financial Advice</span>
                    </Link>
                    <Link to="/pdf-risk-analysis" className="block py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <DocumentChartBarIcon className="h-5 w-5 text-gray-500" /> <span>PDF Risk Analysis</span>
                    </Link>
                    <Link to="/budget-planner" className="block py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <BanknotesIcon className="h-5 w-5 text-gray-500" /> <span>Budget Planner</span>
                    </Link>
                    <Link to="/credit-card-recommender" className="block py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <CreditCardIcon className="h-5 w-5 text-gray-500" /> <span>Credit Card Recommender</span>
                    </Link>
                    <Link to="/about" className="block py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <ListBulletIcon className="h-5 w-5 text-gray-500" /> <span>About</span>
                    </Link>
                    <Link to="/team" className="block py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300 flex items-center space-x-3" onClick={closeMobileMenu}>
                        <ListBulletIcon className="h-5 w-5 text-gray-500" /> <span>Team</span>
                    </Link>

                    {isSignedIn ? (
                        <UserButton afterSignOutUrl="/" onClick={closeMobileMenu} />
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <SignInButton afterSignInUrl="/" onClick={closeMobileMenu} className="block w-full text-center">Sign In</SignInButton>
                            <SignUpButton afterSignUpUrl="/" onClick={closeMobileMenu} className={signUpButtonStyle}>Sign Up</SignUpButton>
                        </div>
                    )}
                </nav>
            </div>
        </nav>
    );
}

export default Navbar;
