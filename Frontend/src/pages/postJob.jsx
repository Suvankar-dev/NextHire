import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo.token) console.log(userInfo);
      else Navigate("/login");

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        "http://localhost:3000/api/jobs",
        { title, company, location, salary, description },
        config
      );

      alert("Job Posted Successfully!");

      // Clear form
      setTitle("");
      setCompany("");
      setLocation("");
      setSalary("");
      setDescription("");
    } catch (error) {
      alert(error.response.data.message || "Failed to post job");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4 font-bold">Post a Job</h1>
      <form onSubmit={handlePostJob} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded h-32"
        />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
