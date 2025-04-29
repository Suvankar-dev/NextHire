import express from "express";
import {
  protect,
  employerOnly,
  protectRoute,
} from "../middleware/auth.middleware.js";
const jobsRouter = express.Router();
import Job from "../model/jobSchema.model.js";

jobsRouter.post("/", protectRoute, employerOnly, async (req, res) => {
  try {
    const { title, description, company } = req.body;

    const newJob = new Job({
      title,
      description,
      company,
      postedBy: req.user._id,
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all jobs (public)
jobsRouter.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default jobsRouter;
