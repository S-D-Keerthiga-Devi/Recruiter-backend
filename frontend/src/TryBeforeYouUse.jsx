import React, { useState } from 'react';

const TryBeforeYouUse = () => {
  const [career, setCareer] = useState('');
  const [role, setRole] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating API call with timeout
    setTimeout(() => {
      setOutput(`Based on your selection of ${career} as your career and ${role} as your role, here's a preview of what this path might look like for you. This information can help you make an informed decision before committing to this career path.`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Try Before You Use</h1>
        <p className="text-xl text-gray-400">Explore your potential career path before committing to it</p>
      </div>
      
      {/* Content Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Card */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-8 border border-gray-800 relative overflow-hidden group">
          {/* Gradient ornament */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500 bg-opacity-20 rounded-full blur-2xl group-hover:bg-indigo-600 transition-all duration-500"></div>
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500 bg-opacity-20 rounded-full blur-2xl group-hover:bg-blue-600 transition-all duration-500"></div>
          
          <h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b-2 border-indigo-500 inline-block relative z-10">Input Your Preferences</h2>
          
          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="mb-6">
              <label htmlFor="career" className="block text-gray-300 font-medium mb-2">
                Choose Your Career
              </label>
              <input
                type="text"
                id="career"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                placeholder="e.g. Software Developer, Doctor, Designer"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-600"
                required
              />
            </div>
            
            <div className="mb-8">
              <label htmlFor="role" className="block text-gray-300 font-medium mb-2">
                Specify Your Role
              </label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Developer, Cardiologist, UI/UX Designer"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-600"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className={`w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Get Insights'}
            </button>
          </form>
        </div>
        
        {/* Output Card */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-8 border border-gray-800 relative overflow-hidden group">
          {/* Gradient ornament */}
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500 bg-opacity-20 rounded-full blur-2xl group-hover:bg-blue-600 transition-all duration-500"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500 bg-opacity-20 rounded-full blur-2xl group-hover:bg-indigo-600 transition-all duration-500"></div>
          
          <h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b-2 border-blue-500 inline-block relative z-10">Career Insights</h2>
          
          <div className="min-h-64 flex items-start relative z-10">
            {output ? (
              <div className="text-gray-300 bg-gray-800 bg-opacity-90 p-6 rounded-lg border border-gray-700 w-full transform transition-all duration-500 hover:shadow-lg">
                {output}
              </div>
            ) : (
              <div className="text-gray-500 bg-gray-800 bg-opacity-80 p-6 rounded-lg border border-gray-700 w-full text-center flex flex-col items-center justify-center h-64">
                <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                <span className="italic">Fill in your preferences and submit to see career insights</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryBeforeYouUse;