import React, { useState, useRef } from "react";

export default function ResumeAnalyzer() {
  const [jobDesc, setJobDesc] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [activePrompt, setActivePrompt] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setFileName(droppedFile.name);
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  const handleSubmit = async (prompt) => {
    if (!file) {
      alert("Please upload a resume.");
      return;
    }
    
    setLoading(true);
    setResponseText("Processing...");
    setActivePrompt(prompt);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_desc", jobDesc);
    formData.append("prompt", prompt);
    
    try {
      const response = await fetch("/resume", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResponseText(data.response);
    } catch (error) {
      setResponseText("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 text-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Resume Analyzer</h1>
          <p className="text-gray-400">Upload your resume and match it against job descriptions</p>
        </div>

        {/* Main Content */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Input Section */}
          <div className="p-6 md:p-8">
            {/* Job Description Input */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Job Description</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-600"
                placeholder="Paste the job description here..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                rows="4"
              />
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Resume Upload</label>
              <div 
                className="w-full border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-gray-800"
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  className="hidden"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                
                {!fileName ? (
                  <div>
                    <svg className="w-12 h-12 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mt-2 text-gray-400">Drag and drop your resume here or click to browse</p>
                    <p className="text-sm text-gray-500 mt-1">(PDF only, Max: 5MB)</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-300">{fileName}</span>
                    <button 
                      className="ml-2 text-red-400 hover:text-red-300 focus:outline-none" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setFileName("");
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                className={`${activePrompt === "prompt1" ? 'bg-blue-700' : 'bg-gradient-to-r from-blue-800 to-indigo-800'} hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg`}
                onClick={() => handleSubmit("prompt1")}
              >
                Tell Me About the Resume
              </button>
              <button 
                className={`${activePrompt === "prompt2" ? 'bg-blue-700' : 'bg-gradient-to-r from-blue-800 to-indigo-800'} hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg`}
                onClick={() => handleSubmit("prompt2")}
              >
                Percentage Match
              </button>
              <button 
                className={`${activePrompt === "prompt3" ? 'bg-blue-700' : 'bg-gradient-to-r from-blue-800 to-indigo-800'} hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg`}
                onClick={() => handleSubmit("prompt3")}
              >
                Skill Gap Analysis
              </button>
            </div>
          </div>

          {/* Response Section */}
          <div className="border-t border-gray-800 bg-gray-800 bg-opacity-50 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              {activePrompt === "prompt1" && "Resume Overview"}
              {activePrompt === "prompt2" && "Match Analysis"}
              {activePrompt === "prompt3" && "Skill Gap Analysis"}
              {!activePrompt && "Response Output"}
            </h3>
            
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="loader">
                  <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-3 text-gray-400">Analyzing your resume...</p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 min-h-32 text-gray-300 shadow-inner">
                {responseText ? (
                  <div className="whitespace-pre-wrap">{responseText}</div>
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    <svg className="w-12 h-12 mx-auto text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p>Upload your resume and select an analysis option to see results</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}