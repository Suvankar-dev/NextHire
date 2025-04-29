import express from "express";
import {
  protectRoute,
  adminOnly,
  protect,
} from "../middleware/auth.middleware.js";
import User from "../model/user.model.js";
import Job from "../model/jobSchema.model.js";
import Application from "../model/application.model.js";

const adminRouter = express.Router();
// Get all users\\
adminRouter.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all jobs \\
adminRouter.get("/jobs", protect, adminOnly, async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all applications \\
adminRouter.get("/applications", protect, adminOnly, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job", "title company")
      .populate("seeker", "name email");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a user \\
adminRouter.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a job \\
adminRouter.delete("/jobs/:id", protect, adminOnly, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an application \\
adminRouter.delete(
  "/applications/:id",
  protectRoute,
  adminOnly,
  async (req, res) => {
    try {
      await Application.findByIdAndDelete(req.params.id);
      res.json({ message: "Application deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
export default adminRouter;
