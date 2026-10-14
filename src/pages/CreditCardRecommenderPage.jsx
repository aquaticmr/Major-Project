import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { GeminiAPI } from '../features/chatAI/GeminiAPI';
import { CreditCard, Award, TrendingUp, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const CreditCardRecommenderPage = () => {
  const [creditScore, setCreditScore] = useState('Good (690-719)');
  const [primaryGoal, setPrimaryGoal] = useState('Cashback');
  const [monthlySpend, setMonthlySpend] = useState('');
  
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations('');

    try {
      const gemini = new GeminiAPI();
      
      const prompt = `You are an expert financial advisor specializing in credit cards available in India. Please recommend 3-4 specific credit cards for an Indian user with the following profile:
      
      - Credit Score: ${creditScore}
      - Primary Goal: ${primaryGoal}
      - Typical Monthly Spending: ${monthlySpend || 'Not specified'}

      For each recommended card, please provide:
      1. **Card Name**
      2. **Why it's a good fit** based on their profile
      3. **Pros & Cons**
      4. **Estimated Welcome Bonus / Rewards Rate**
      5. **Annual Fee**
      
      CRITICAL INSTRUCTIONS: 
      - ALL monetary amounts (fees, rewards, spending limits) MUST be in Indian Rupees (₹). DO NOT use US Dollars or any other currency.
      - Recommend credit cards that are actually available in the Indian market (e.g., HDFC, SBI, ICICI, Axis, Amex India).
      - Format the response using clean Markdown with headers (H3) for each card, and bullet points for the details to ensure a highly readable output format. 
      - Make the advice practical and emphasize responsible credit usage. Add a disclaimer that these are AI recommendations and the user should check the issuer's website for current terms.`;

      const result = await gemini.generateContent(prompt);
      setRecommendations(result);
    } catch (err) {
      console.error(err);
      setError('Failed to generate recommendations. Please ensure your Gemini API key is correctly configured.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 flex items-center justify-center gap-3">
            <CreditCard className="w-10 h-10" />
            Credit Card Recommender
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your credit profile and spending habits, and our AI will find the best credit card matches for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Your Profile</h2>
              <form onSubmit={handleGenerate} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Credit Score</label>
                  <select 
                    value={creditScore} 
                    onChange={(e) => setCreditScore(e.target.value)}
                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Excellent (720+)">Excellent (720+)</option>
                    <option value="Good (690-719)">Good (690-719)</option>
                    <option value="Fair (630-689)">Fair (630-689)</option>
                    <option value="Poor (< 630)">Poor (&lt; 630)</option>
                    <option value="No Credit History">No Credit History</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Goal</label>
                  <select 
                    value={primaryGoal} 
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Cashback">Cashback</option>
                    <option value="Travel Rewards">Travel Rewards</option>
                    <option value="0% Intro APR / Balance Transfer">0% Intro APR / Balance Transfer</option>
                    <option value="Building Credit">Building Credit</option>
                    <option value="Dining & Groceries">Dining & Groceries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Spend (Optional)</label>
                  <textarea 
                    value={monthlySpend} 
                    onChange={(e) => setMonthlySpend(e.target.value)}
                    placeholder="e.g. ₹15,000 on groceries, ₹5,000 on dining, ₹2,000 on fuel..."
                    className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Finding Cards...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5" />
                      Get Recommendations
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
              {error ? (
                <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl">
                  <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              ) : recommendations ? (
                <div className="prose prose-blue max-w-none prose-headings:text-blue-900 prose-a:text-blue-600">
                  <ReactMarkdown>{recommendations}</ReactMarkdown>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 py-16 text-center">
                  <Award className="w-16 h-16 mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">Ready to find your perfect card?</h3>
                  <p className="max-w-md">Fill out your profile on the left and click "Get Recommendations" to see your AI-curated list of credit cards.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreditCardRecommenderPage;
