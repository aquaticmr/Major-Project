// src/components/ui/PricingDialog.jsx
import React from 'react';

const PricingDialog = ({ onClose, theme }) => {
    const isDarkTheme = theme === 'dark';
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className={`bg-white rounded-lg shadow-xl ${isDarkTheme ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white'}`}>
                <div className="p-6"> {/* Added p-6 to main content div */}
                    <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-400">Start for free. Upgrade to get the capacity that exactly matches your team's needs.</p> {/* Adjusted text color */}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Starter Plan */}
                        <div className={`p-4 rounded-md shadow-md ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}>
                            <h3 className="text-xl font-semibold mb-2">STARTER</h3>
                            <div className="text-2xl font-bold mb-2">$20 <span className="text-sm font-normal text-gray-500">/ month</span></div>
                            <p className="text-sm text-gray-600 mb-4">Perfect for hobby and occasional use:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                                <li className="mb-1">Everything in Free, plus:</li>
                                <li className="mb-1">Go beyond daily limits with a monthly limit</li>
                                <li className="mb-1">Unlimited private projects</li>
                                <li className="mb-1">Custom domains</li>
                            </ul>
                            <button className="block w-full mt-4 py-2 px-4 rounded-md font-medium bg-indigo-600 hover:bg-indigo-700 text-white">Upgrade to Starter</button> {/* Purple Buttons */}
                        </div>

                        {/* Launch Plan */}
                        <div className={`p-4 rounded-md shadow-md ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}>
                            <h3 className="text-xl font-semibold mb-2">LAUNCH</h3>
                            <div className="text-2xl font-bold mb-2">$50 <span className="text-sm font-normal text-gray-500">/ month</span></div>
                            <p className="text-sm text-gray-600 mb-4">For individuals working on small projects:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                                <li className="mb-1">Everything in Starter, plus:</li>
                                <li className="mb-1">2.5x monthly limits</li>
                            </ul>
                            <button className="block w-full mt-4 py-2 px-4 rounded-md font-medium bg-indigo-600 hover:bg-indigo-700 text-white">Upgrade to Launch</button> {/* Purple Buttons */}
                        </div>

                        {/* Scale 1 Plan */}
                        <div className={`p-4 rounded-md shadow-md ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}>
                            <h3 className="text-xl font-semibold mb-2">SCALE 1</h3>
                            <div className="text-2xl font-bold mb-2">$100 <span className="text-sm font-normal text-gray-500">/ month</span></div>
                            <p className="text-sm text-gray-600 mb-4">For individuals working on larger projects:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                                <li className="mb-1">Everything in Launch, plus:</li>
                                <li className="mb-1">Larger message limits</li>
                                <li className="mb-1">Early access to new features</li>
                            </ul>
                            <button className="block w-full mt-4 py-2 px-4 rounded-md font-medium bg-indigo-600 hover:bg-indigo-700 text-white">Upgrade to Scale 1</button> {/* Purple Buttons */}
                        </div>

                        {/* Teams Plan */}
                        <div className={`p-4 rounded-md shadow-md ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}>
                            <h3 className="text-xl font-semibold mb-2">TEAMS</h3>
                            <div className="text-2xl font-bold mb-2">Contact us</div>
                            <p className="text-sm text-gray-600 mb-4">Contact us for:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                                <li className="mb-1">Custom messaging limits</li>
                                <li className="mb-1">Centralized billing</li>
                                <li className="mb-1">SSO</li>
                                <li className="mb-1">Custom Integrations</li>
                                <li className="mb-1">Dedicated support & account management</li>
                            </ul>
                            <button className="block w-full mt-4 py-2 px-4 rounded-md font-medium bg-gray-300 hover:bg-gray-400 text-gray-800">Contact us</button> {/* Gray Button */}
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t dark:border-gray-700"> {/* Added border-t and p-6 for close button area */}
                    <button onClick={onClose} className="block w-full py-2 px-4 rounded-md text-center font-medium bg-gray-200 hover:bg-gray-300 text-gray-800">Close</button> {/* Gray Close Button */}
                </div>
            </div>
        </div>
    );
};

export default PricingDialog;