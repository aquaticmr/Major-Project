// src/pages/PrivacyPolicyPage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function PrivacyPolicyPage() {
    return (
        <div>
            <Navbar />

            <section className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Privacy Policy</h2>

                    <div className="prose max-w-none">
                        <p>
                            Financial AI ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information when you use our website and AI-powered financial assistant services (collectively, the "Services").
                        </p>

                        <h3>1. Information We Collect</h3>
                        <p>
                            We collect information to provide and improve our Services. The types of information we collect include:
                        </p>
                        <ul className="list-disc pl-5">
                            <li>
                                <span className="font-semibold">Account Information:</span> When you register for an account, we collect personal information such as your name, email address, and self-assessed financial literacy level.
                            </li>
                            <li>
                                <span className="font-semibold">Usage Information:</span> We gather data on how you interact with our Services, including your questions to the AI assistant, features you use, pages you visit, and the duration and frequency of your sessions.
                            </li>
                            <li>
                                <span className="font-semibold">Transaction Information:</span> If you engage in transactions through our Services (e.g., subscribing to premium features), we collect transaction details such as purchase amounts and dates.
                            </li>
                            <li>
                                <span className="font-semibold">Log Data:</span>  Our servers automatically record information ("log data") created by your use of the Services. Log Data may include information such as your IP address, browser type, operating system, referring webpage, pages visited, location, your mobile carrier, device and application IDs, search terms, and cookie information.
                            </li>
                            <li>
                                <span className="font-semibold">Cookies and Similar Technologies:</span> We use cookies, pixel tags, and other similar technologies to collect information, remember your preferences, and enhance your experience with our Services.
                            </li>
                            <li>
                                <span className="font-semibold">Uploaded Content:</span> For features like PDF Risk Analysis, we collect the content of documents you upload to provide the service.
                            </li>
                        </ul>

                        <h3>2. How We Use Your Information</h3>
                        <p>
                            We use the collected information for various purposes, including to:
                        </p>
                        <ul className="list-disc pl-5">
                            <li>Provide, operate, and maintain our Services.</li>
                            <li>Personalize and improve our Services, including tailoring AI responses based on your financial literacy level.</li>
                            <li>Analyze usage trends and patterns to enhance user experience and develop new features.</li>
                            <li>Respond to your inquiries and provide customer support.</li>
                            <li>Send you administrative and service-related communications, including updates and security alerts.</li>
                            <li>Process transactions and send you related information, including purchase confirmations and invoices.</li>
                            <li>Monitor and analyze usage and trends to improve and personalize the Services.</li>
                            <li>Detect, prevent, and address technical issues, security breaches, or fraud.</li>
                            <li>Comply with legal obligations.</li>
                        </ul>

                        <h3>3. Data Sharing and Disclosure</h3>
                        <p>
                            We do not sell, trade, or rent your personal information to third parties. We may share information in the following limited circumstances:
                        </p>
                        <ul className="list-disc pl-5">
                            <li><span className="font-semibold">With Your Consent:</span> We may share information when we have your explicit consent to do so.</li>
                            <li><span className="font-semibold">Service Providers:</span> We engage trusted third-party service providers to perform functions and provide services to us, such as hosting, payment processing, analytics, customer service, and email delivery. We share personal information with these service providers only to the extent necessary for them to perform these services and require them to protect your information.</li>
                            <li><span className="font-semibold">Legal Compliance:</span> We may disclose information if required to do so by law or in the good faith belief that such action is necessary to comply with legal obligations, protect our rights or property, or in response to lawful requests from public authorities, including to meet national security or law enforcement requirements.</li>
                            <li><span className="font-semibold">Business Transfers:</span> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company, we may share or transfer your information as part of the transaction.</li>
                        </ul>

                        <h3>4. Data Security</h3>
                        <p>
                            We implement reasonable and appropriate security measures designed to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, firewalls, and secure server facilities. However, no security system is impenetrable, and we cannot guarantee the absolute security of your information.
                        </p>

                        <h3>5. Your Rights and Choices</h3>
                        <p>
                            You have certain rights regarding your personal information, including:
                        </p>
                        <ul className="list-disc pl-5">
                            <li><span className="font-semibold">Access:</span> You have the right to request access to the personal information we hold about you.</li>
                            <li><span className="font-semibold">Correction:</span> You have the right to request that we correct any inaccurate or incomplete personal information.</li>
                            <li><span className="font-semibold">Deletion:</span> You have the right to request deletion of your personal information, subject to certain exceptions as required by law.</li>
                            <li><span className="font-semibold">Opt-out of Marketing Communications:</span> You can opt-out of receiving promotional emails from us by following the unsubscribe instructions provided in those emails.</li>
                            <li><span className="font-semibold">Cookie Preferences:</span> You can manage your cookie preferences through your browser settings.</li>
                        </ul>

                        <h3>6. Data Retention</h3>
                        <p>
                            We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                        </p>

                        <h3>7. Children's Privacy</h3>
                        <p>
                            Our Services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information as soon as possible.
                        </p>

                        <h3>8. International Data Transfers</h3>
                        <p>
                            Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the privacy laws may not be as protective as those in your jurisdiction.
                        </p>

                        <h3>9. Changes to this Privacy Policy</h3>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on our website and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                        </p>

                        <h3>10. Contact Us</h3>
                        <p>
                            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: <a href="mailto:privacy@financialai.com">privacy@financialai.com</a>.
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

export default PrivacyPolicyPage;