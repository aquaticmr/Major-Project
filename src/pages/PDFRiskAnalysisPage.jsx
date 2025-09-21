// PDFRiskAnalysisPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import RiskAnalysisResults from '../features/pdfRiskAnalysis/RiskAnalysisResults';
import ChatWithPDF from '../features/pdfRiskAnalysis/ChatWithPDF';
import LoadingWrapper from '../components/ui/LoadingWrapper';

const backend_url = import.meta.env.VITE_BACKEND_URL;

const PDFRiskAnalysisPage = () => {
    const [analysisResults, setAnalysisResults] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [pdfText, setPdfText] = useState('');

    const handleFileUpload = async (file) => {
        setIsAnalyzing(true);
        setAnalysisError(null);
        setAnalysisResults(null);
        setPdfText('');

        try {
            const formData = new FormData();
            formData.append('pdfFile', file);

            const response = await fetch(backend_url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json();
            setAnalysisResults(data.results);
            setPdfText(data.text); // Assuming the backend returns the extracted text
        } catch (error) {
            console.error("Analysis Error:", error);
            setAnalysisError("Failed to analyze PDF. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles[0]) {
            setUploadedFile(acceptedFiles[0]);
            setAnalysisError(null);
            handleFileUpload(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1,
    });

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Navbar />
            <main className="container mx-auto px-4 py-12">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl font-extrabold text-blue-900">PDF Financial Risk Analysis</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Upload your financial documents to automatically identify potential risks and gain actionable insights.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        {...getRootProps()}
                        className={`relative p-8 border-4 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${isDragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
                        whileHover={{ scale: 1.02 }}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center justify-center text-center">
                            <UploadCloud className="w-16 h-16 text-gray-400 mb-4" />
                            {isAnalyzing ? (
                                <>
                                    <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                                    <p className="mt-2 text-lg font-semibold text-blue-800">Analyzing your document...</p>
                                </>
                            ) : uploadedFile ? (
                                <>
                                    <FileText className="w-8 h-8 text-green-600" />
                                    <p className="mt-2 text-lg font-semibold text-gray-800">{uploadedFile.name}</p>
                                    <p className="text-sm text-gray-500">Drop a new file or click to replace</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-lg font-semibold text-gray-700">Drag & drop your PDF here</p>
                                    <p className="text-sm text-gray-500">or click to select a file</p>
                                </>
                            )}
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {analysisError && (
                            <motion.div
                                className="mt-6 flex items-center p-4 bg-red-100 text-red-700 rounded-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <AlertCircle className="w-5 h-5 mr-3" />
                                {analysisError}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {analysisResults && (
                            <motion.div
                                className="mt-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <RiskAnalysisResults analysisResults={analysisResults} />
                                {pdfText && <ChatWithPDF pdfText={pdfText} />}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default PDFRiskAnalysisPage;
