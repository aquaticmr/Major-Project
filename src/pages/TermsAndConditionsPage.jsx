// src/pages/TermsAndConditionsPage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function TermsAndConditionsPage() {
    return (
        <div>
            <Navbar />

            <section className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Terms and Conditions of Use</h2>

                    <div className="prose max-w-none">
                        <p>
                            Welcome to Financial AI ("we," "us," or "our"). By accessing or using our website and AI-powered financial assistant services (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms"). Please read them carefully.
                        </p>

                        <h3>1. Acceptance of Terms</h3>
                        <p>
                            These Terms constitute a legally binding agreement between you and Financial AI. By using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy, which is incorporated herein by reference. If you do not agree to all of these Terms, you are expressly prohibited from using the Services and must discontinue use immediately.
                        </p>

                        <h3>2. Description of Services</h3>
                        <p>
                            Financial AI provides a GenAI-powered financial assistant designed to offer informational and educational resources related to personal finance and investing. Our Services include, but are not limited to: financial question answering, share data analysis, risk assessment, and budget planning tools.
                            <span className="font-semibold">It is important to understand that Financial AI is not a financial advisor, and our Services are not intended to provide financial, investment, tax, legal, or accounting advice.</span>  The information provided is for educational and informational purposes only.
                        </p>

                        <h3>3. User Responsibilities and Financial Literacy Levels</h3>
                        <p>
                            You acknowledge that investment decisions are complex and carry risk. You are solely responsible for evaluating the merits and risks associated with utilizing the information provided by Financial AI before making any financial decisions. We encourage you to consider your own financial situation, investment objectives, and risk tolerance, and to seek advice from a qualified financial advisor before making any investment.
                            <span className="font-semibold">By using our Services, you acknowledge that your financial literacy level (Low, Medium, Advanced) is self-assessed and used to tailor the responses from our AI, but does not alter your responsibility for your financial decisions.</span>
                        </p>

                        <h3>4. Account Registration and Security</h3>
                        <p>
                            To access certain features, you may be required to register an account. You agree to: (a) provide accurate, current, and complete information during the registration process; (b) maintain the security of your password and accept responsibility for all activities that occur under your account; (c) notify us immediately of any unauthorized access or breach of security.
                        </p>

                        <h3>5. Acceptable Use Policy</h3>
                        <p>
                            You agree not to use the Services to: (a) violate any applicable law or regulation; (b) infringe upon the rights of others; (c) transmit any harmful, unlawful, or objectionable content; (d) interfere with or disrupt the integrity or performance of the Services; (e) attempt to gain unauthorized access to our systems or user data.
                        </p>

                        <h3>6. Intellectual Property Rights</h3>
                        <p>
                            The Services and all content, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Financial AI, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your personal, non-commercial use only.
                        </p>

                        <h3>7. Disclaimer of Warranties and Limitation of Liability</h3>
                        <p>
                            <span className="font-semibold">The Services are provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, either express or implied, including, but not limited to, warranties of merchantability, fitness for a particular purpose, or non-infringement.</span>  Financial AI does not warrant that the Services will be uninterrupted, error-free, secure, or that any defects will be corrected.
                        </p>
                        <p>
                            <span className="font-semibold">To the maximum extent permitted by applicable law, Financial AI, its affiliates, officers, directors, employees, agents, suppliers, or licensors shall not be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, the Services.</span>
                        </p>

                        <h3>8. Modifications to Services and Terms</h3>
                        <p>
                            We reserve the right to modify, suspend, or discontinue, temporarily or permanently, the Services (or any part thereof) with or without notice. We also reserve the right to modify these Terms at any time. We will endeavor to provide reasonable notice of any material changes. Your continued use of the Services after such modifications will constitute acknowledgment and agreement of the modified Terms.
                        </p>

                        <h3>9. Governing Law and Dispute Resolution</h3>
                        <p>
                            These Terms and any disputes arising out of or in connection with them or their subject matter or formation (including non-contractual disputes) shall be governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles. Any dispute relating in any way to your use of the Services shall be adjudicated in the courts located in [Your City, State], India.
                        </p>

                        <h3>10. Contact Information</h3>
                        <p>
                            For any questions or concerns regarding these Terms, please contact us at: <a href="mailto:legal@financialai.com">legal@financialai.com</a>.
                        </p>

                        <p className="mt-8 text-sm text-gray-500">
                            Last updated: October 26, 2023
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default TermsAndConditionsPage;