// backend/routes/applicationRoutes.js
import express from "express";
import Application from "../model/application.model.js";
import { protect, seekerOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// Apply to a job (job seeker only)
router.post("/:jobId", protect, seekerOnly, async (req, res) => {
  try {
    const { resumeLink } = req.body;
    const { jobId } = req.params;

    const alreadyApplied = await Application.findOne({
      job: jobId,
      seeker: req.user._id,
    });
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = new Application({
      job: jobId,
      seeker: req.user._id,
      resumeLink,
    });

    await application.save();
    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all applications for a specific job (employer only) - coming later
// Admin can also view all applications - coming later

export default router;
