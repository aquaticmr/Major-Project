// RiskAnalysisResults.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, FileText } from 'lucide-react';

const RiskAnalysisResults = ({ analysisResults }) => {
    if (!analysisResults) {
        return (
            <div className="text-center py-10">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No analysis yet</h3>
                <p className="mt-1 text-sm text-gray-500">Upload a PDF to get started.</p>
            </div>
        );
    }

    const sections = typeof analysisResults === 'string' ? analysisResults.split('\n\n') : [];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-900">Analysis Results</h3>
            {sections.map((section, index) => {
                const lines = section.split('\n');
                const headingLine = lines[0].replace(/\*\*/g, '');
                const contentLines = lines.slice(1);

                const isRisk = headingLine.toLowerCase().includes('risk');

                return (
                    <motion.div
                        key={index}
                        className={`rounded-xl shadow-md overflow-hidden border-l-4 ${isRisk ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                {isRisk ? (
                                    <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                                ) : (
                                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                                )}
                                <h4 className="text-xl font-semibold text-gray-800">{headingLine}</h4>
                            </div>
                            <div className="space-y-2 text-gray-700">
                                {contentLines.map((line, lineIndex) => {
                                    const formattedLine = line.replace(/\*\s/g, '').split('**').reduce((acc, part, i) => {
                                        acc.push(i % 2 === 1 ? <strong key={i}>{part}</strong> : part);
                                        return acc;
                                    }, []);
                                    return <p key={lineIndex}>{formattedLine}</p>;
                                })}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default RiskAnalysisResults;