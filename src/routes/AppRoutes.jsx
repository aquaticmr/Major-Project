// src/routes/AppRoutes.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Import your page components
import HomePage from "../pages/HomePage";
import FinancialQuestionResolverPage from "../pages/ChatbotPage"; // Assuming path, adjust if needed
// import ShareDataAnalysisPage from '../features/chatAI/pages/ShareDataAnalysisPage';
// import LiveShareTrackingPage from '../features/dataAnalysis/pages/LiveShareTrackingPage';
import PDFRiskAnalysisPage from '../pages/PDFRiskAnalysisPage';
import BudgetPlannerPage from '../pages/budgetPlannerPage';
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage";
import AboutPage from "../pages/AboutUs";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import SignInPage from "../features/auth/SignInPage";
import SignUpPage from "../features/auth/SignUpPage";
import CreditCardRecommenderPage from "../pages/CreditCardRecommenderPage";
import { useAuth } from "@clerk/clerk-react"; // Import useAuth

// Create a ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner
  }
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    // <Router> {/* REMOVE: No Router needed here */}
    <Routes>
      {/* Public Routes - Sign In, Sign Up, HomePage, About Us, Terms, Policy are PUBLIC */}
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/terms-and-conditions"
        element={<TermsAndConditionsPage />}
      />
      <Route path="/policy" element={<PrivacyPolicyPage />} />
      <Route
        path="/financial-advice"
        element={<FinancialQuestionResolverPage />}
      />
      <Route
        path="/credit-card-recommender"
        element={<CreditCardRecommenderPage />}
      />
      <Route
        path="/pdf-risk-analysis"
        element={<PDFRiskAnalysisPage />}
      />

                {/* Protected Routes - Data Analysis, PDF Risk Analysis are PROTECTED */}

      {/* <Route path="/share-analysis" element={
                    <ProtectedRoute>
                        <ShareDataAnalysisPage />
                    </ProtectedRoute>
                } />
                <Route path="/live-tracking" element={
                    <ProtectedRoute>
                        <LiveShareTrackingPage />
                    </ProtectedRoute>
                } /> */}

      <Route path="/budget-planner" element={
          <BudgetPlannerPage />
      } />

      {/* You can add more routes here as needed */}
    </Routes>
    // </Router> {/* REMOVE: No Router needed here */}
  );
}

export default AppRoutes;