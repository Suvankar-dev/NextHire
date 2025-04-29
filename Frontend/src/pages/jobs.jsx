import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/jobs");
        setJobs(data);
      } catch (error) {
        alert("Failed to load jobs");
      }
    };

    fetchJobs();
  }, []);

  const applyJob = async (jobId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) Navigate("/login");

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `http://localhost:3000/api/applications`,
        { jobId },
        config
      );

      alert("Applied Successfully!");
    } catch (error) {
      alert(error.response.data.message || "Failed to apply");
    }
  };

  // Filter jobs based on search input
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6 font-bold">Available Jobs</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      />

      {/* Jobs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div key={job._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-700">
              {job.company} - {job.location}
            </p>
            <p className="text-green-600 font-bold">₹ {job.salary}</p>
            <p className="mt-2">{job.description}</p>
            <button
              onClick={() => applyJob(job._id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
