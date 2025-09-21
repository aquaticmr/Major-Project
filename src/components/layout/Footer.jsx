// src/components/ui/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
    const footerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.footer
            className="bg-blue-900 text-white"
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
                    {/* About Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <h2 className="font-bold text-2xl mb-4">FinoAddWise</h2>
                        <p className="text-blue-200 max-w-xs">
                            AI-powered financial insights to help you achieve your goals.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-blue-300 hover:text-white transition-colors duration-300" aria-label="Facebook"><FaFacebook size={24} /></a>
                            <a href="#" className="text-blue-300 hover:text-white transition-colors duration-300" aria-label="Twitter"><FaTwitter size={24} /></a>
                            <a href="#" className="text-blue-300 hover:text-white transition-colors duration-300" aria-label="Instagram"><FaInstagram size={24} /></a>
                            <a href="#" className="text-blue-300 hover:text-white transition-colors duration-300" aria-label="LinkedIn"><FaLinkedin size={24} /></a>
                            <a href="#" className="text-blue-300 hover:text-white transition-colors duration-300" aria-label="GitHub"><FaGithub size={24} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h6 className="font-bold text-lg mb-6 uppercase">Quick Links</h6>
                        <ul className="space-y-3 text-blue-200">
                            <li><Link to="/home" className="hover:text-white transition-colors duration-300">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link></li>
                            <li><Link to="/features" className="hover:text-white transition-colors duration-300">Features</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h6 className="font-bold text-lg mb-6 uppercase">Legal</h6>
                        <ul className="space-y-3 text-blue-200">
                            <li><Link to="/terms-and-conditions" className="hover:text-white transition-colors duration-300">Terms & Conditions</Link></li>
                            <li><Link to="/policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
                            <li><Link to="/disclaimer" className="hover:text-white transition-colors duration-300">Disclaimer</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col items-center md:items-start">
                        <h6 className="font-bold text-lg mb-6 uppercase">Stay Updated</h6>
                        <p className="text-blue-200 mb-4">Subscribe to our newsletter for the latest financial tips and updates.</p>
                        <div className="flex w-full max-w-sm">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-r-md transition-colors duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-blue-800 text-center text-blue-300">
                    <p>&copy; {new Date().getFullYear()} FinoAddWise. All rights reserved.</p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;