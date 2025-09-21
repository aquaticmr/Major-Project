import React from 'react';
import { SignUp } from '@clerk/clerk-react'; // Correct import for React

function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <SignUp afterSignUpUrl="/" /> {/* Redirect after sign-up using Clerk's prop */}
    </div>
  );
}

export default SignUpPage;
