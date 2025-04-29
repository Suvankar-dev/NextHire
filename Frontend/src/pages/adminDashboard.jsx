import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const fetchData = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) console.log("userInfo", userInfo);
      else Navigate("/login");

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const usersRes = await axios.get(
        "http://localhost:3000/api/admin/users",
        config
      );
      const jobsRes = await axios.get(
        "http://localhost:3000/api/admin/jobs",
        config
      );
      const appsRes = await axios.get(
        "http://localhost:3000/api/admin/applications",
        config
      );

      setUsers(usersRes.data);
      setJobs(jobsRes.data);
      setApplications(appsRes.data);
    } catch (error) {
      alert("Failed to fetch admin data");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.delete(`http://localhost:3000/api/admin/users/${id}`, config);
      fetchData();
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.delete(`http://localhost:3000/api/admin/jobs/${id}`, config);
      fetchData();
    } catch (error) {
      alert("Failed to delete job");
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.delete(
        `http://localhost:3000/api/admin/applications/${id}`,
        config
      );
      fetchData();
    } catch (error) {
      alert("Failed to delete application");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Users Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>{user.name}</strong> ({user.role})
                </p>
                <p>{user.email}</p>
              </div>
              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-600 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Jobs</h2>
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>{job.title}</strong> at {job.company}
                </p>
                <p>{job.location}</p>
              </div>
              <button
                onClick={() => deleteJob(job._id)}
                className="bg-red-600 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Applications Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Applications</h2>
        <div className="grid gap-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Job:</strong> {app.jobTitle}
                </p>
                <p>
                  <strong>Seeker Email:</strong> {app.seekerEmail}
                </p>
              </div>
              <button
                onClick={() => deleteApplication(app._id)}
                className="bg-red-600 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
