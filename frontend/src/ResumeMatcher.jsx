import { useState } from "react";
import { Upload, FileText, Check, X, BarChart } from "lucide-react";

export default function ResumeMatcherPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [results, setResults] = useState(null);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock results for demonstration
    const mockResults = files.map((file, index) => ({
      name: file.name,
      matchScore: Math.floor(Math.random() * 100),
      keyMatches: ['Experience', 'Skills', 'Education'].filter(() => Math.random() > 0.5)
    }));
    
    // Sort by match score (highest first)
    mockResults.sort((a, b) => b.matchScore - a.matchScore);
    setResults(mockResults);
  };

  // Helper function to get color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-600 text-green-100';
    if (score >= 60) return 'bg-blue-600 text-blue-100';
    if (score >= 40) return 'bg-yellow-600 text-yellow-100';
    return 'bg-red-600 text-red-100';
  };

  return (
    <div className="p-4 sm:p-6 mt-16 overflow-auto min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Resume Matcher</h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800 hover:border-blue-400 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-300 mb-4">Match Resumes to Job Description</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-300">Job Description</label>
                  <textarea 
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white min-h-32"
                    placeholder="Paste job description here..."
                    value={jobDescription}
                    onChange={handleJobDescriptionChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-300">Upload Resumes</label>
                  <div 
                    className={`border-2 border-dashed rounded-md p-6 text-center ${isDragging ? 'border-blue-500 bg-blue-900 bg-opacity-20' : 'border-gray-700'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="mb-3 flex flex-col items-center">
                      <Upload size={32} className="text-blue-400 mb-2" />
                      <p className="text-gray-300">Drag and drop files here or</p>
                      <label className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md font-medium cursor-pointer hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105">
                        Browse Files
                        <input 
                          type="file" 
                          multiple 
                          className="hidden" 
                          onChange={handleFileChange} 
                          accept=".pdf,.doc,.docx"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-400">Accepts PDF, DOC, DOCX files</p>
                  </div>
                </div>
                
                {files.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-gray-300 font-medium mb-2">Selected Files ({files.length})</h3>
                    <div className="bg-gray-800 rounded-md p-2 max-h-40 overflow-y-auto">
                      {files.map((file, index) => (
                        <div key={index} className="flex justify-between items-center py-2 px-3 border-b border-gray-700 last:border-b-0 group hover:bg-gray-700 transition-all duration-200">
                          <div className="flex items-center">
                            <FileText size={16} className="text-blue-400 mr-2" />
                            <span className="truncate max-w-xs text-gray-300">{file.name}</span>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900 hover:bg-opacity-20 p-1 rounded-full transition-all duration-200"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  disabled={!jobDescription || files.length === 0}
                >
                  <BarChart size={18} className="mr-2" />
                  Match Resumes
                </button>
              </form>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800 hover:border-blue-400 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-300 mb-4">Matching Results</h2>
              
              {!results ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <BarChart size={64} className="mb-4 text-blue-800" />
                  <p>Submit job description and resumes to see matching results</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-800 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-gray-750 border-l-4 hover:border-opacity-80"
                      style={{ borderLeftColor: index === 0 ? '#4CAF50' : index === 1 ? '#2196F3' : index === 2 ? '#FF9800' : '#F44336' }}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <FileText size={16} className="text-blue-400 mr-2" />
                            <h3 className="font-medium text-gray-200 truncate">{result.name}</h3>
                          </div>
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getScoreColor(result.matchScore)}`}>
                            <span className="font-bold text-sm">{result.matchScore}</span>
                          </div>
                        </div>
                        
                        {result.keyMatches.length > 0 && (
                          <div className="mt-2">
                            <div className="text-sm text-gray-400">Key matches:</div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {result.keyMatches.map((match, i) => (
                                <span key={i} className="text-xs bg-blue-900 px-2 py-1 rounded-full text-blue-200 flex items-center">
                                  <Check size={12} className="mr-1 text-green-400" />
                                  {match}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}