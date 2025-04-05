import { useState } from "react";
import { Trash2, Edit, Plus, Search, Filter, X, Save } from "lucide-react";

export default function CurrentVacancies() {
  // Sample job data - in a real app, you would fetch this from an API
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      description: "We're looking for a Frontend Developer proficient in React, TypeScript, and modern CSS frameworks. You'll work on building responsive and accessible user interfaces for our enterprise applications.",
      salary: "$90,000 - $120,000",
      postedDate: "2025-03-15"
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      experience: "2-4 years",
      description: "Join our product design team to create user-centered designs and experiences. Proficiency in Figma, user research, and design systems is required.",
      salary: "$85,000 - $110,000",
      postedDate: "2025-03-22"
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Contract",
      experience: "4+ years",
      description: "Looking for a DevOps Engineer to help maintain and improve our cloud infrastructure, CI/CD pipelines, and containerization strategy.",
      salary: "$110,000 - $140,000",
      postedDate: "2025-03-28"
    }
  ]);

  const [editingJob, setEditingJob] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  // New job template
  const emptyJob = {
    id: Date.now(),
    title: "",
    department: "",
    location: "",
    type: "",
    experience: "",
    description: "",
    salary: "",
    postedDate: new Date().toISOString().split('T')[0]
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "" || job.type === filterType;
    const matchesLocation = filterLocation === "" || job.location.includes(filterLocation);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  // Handle create new job
  const handleCreateJob = () => {
    setEditingJob(null);
    setIsCreating(true);
  };

  // Handle edit job
  const handleEditJob = (job) => {
    setIsCreating(false);
    setEditingJob({...job});
  };

  // Handle delete job
  const handleDeleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
    if (editingJob && editingJob.id === id) {
      setEditingJob(null);
    }
  };

  // Handle save job (create or update)
  const handleSaveJob = (jobData) => {
    if (isCreating) {
      // Add new job
      setJobs([...jobs, jobData]);
      setIsCreating(false);
    } else {
      // Update existing job
      setJobs(jobs.map(job => job.id === jobData.id ? jobData : job));
      setEditingJob(null);
    }
  };

  // Handle cancel edit/create
  const handleCancelEdit = () => {
    setEditingJob(null);
    setIsCreating(false);
  };

  // JobForm component for editing and creating jobs
  const JobForm = ({ job, onSave, onCancel }) => {
    const [formData, setFormData] = useState(job);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg mt-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-blue-300">{isCreating ? "Create New Job" : "Edit Job"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Experience Required</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Salary Range</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300 ease-in-out flex items-center"
            >
              <Save size={16} className="mr-2" />
              Save Job
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 mt-16 overflow-auto bg-navy-900 min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Current Vacancies</h1>
          <button
            onClick={handleCreateJob}
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300 ease-in-out flex items-center transform hover:scale-105"
          >
            <Plus size={18} className="mr-2" />
            Create New Job
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-6 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search job titles and descriptions..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <select
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form for creating/editing jobs */}
        {(isCreating || editingJob) && (
          <JobForm 
            job={isCreating ? emptyJob : editingJob} 
            onSave={handleSaveJob} 
            onCancel={handleCancelEdit} 
          />
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800 hover:border-blue-400 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-blue-300">{job.title}</h2>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-sm bg-blue-900 px-3 py-1 rounded-full text-blue-200">{job.department}</span>
                        <span className="text-sm bg-blue-900 px-3 py-1 rounded-full text-blue-200">{job.location}</span>
                        <span className="text-sm bg-blue-900 px-3 py-1 rounded-full text-blue-200">{job.type}</span>
                        <span className="text-sm bg-blue-900 px-3 py-1 rounded-full text-blue-200">{job.experience}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <button 
                        onClick={() => handleEditJob(job)}
                        className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
                        title="Edit Job"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-300 ease-in-out transform hover:scale-110"
                        title="Delete Job"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-gray-300 mb-1 font-medium">Job Description</h3>
                    <p className="text-gray-400">{job.description}</p>
                  </div>
                  
                  <div className="mt-4 flex flex-col sm:flex-row justify-between text-sm">
                    <div className="text-green-400 font-medium">{job.salary}</div>
                    <div className="text-gray-400 mt-2 sm:mt-0">Posted on: {new Date(job.postedDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-900 p-8 rounded-lg text-center shadow-lg border border-gray-800">
              <p className="text-gray-400">No jobs found matching your criteria. Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}