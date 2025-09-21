// src/pages/SignInPage.jsx  (React - NOT Next.js)
import React from 'react';
import { SignIn } from '@clerk/clerk-react'; // Correct import for React

function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <SignIn afterSignInUrl="/" /> {/* Redirect after sign-in using Clerk's prop */}
    </div>
  );
}

export default SignInPage;
