import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dqj0xgk8v/image/upload/v1698231234/Default-Profile-Picture.png",
    },
    bio: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    education: {
      type: String,
      default: "",
    },
    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],
    location: {
      type: String,
      default: "",
    },
    experience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ], // Removed incorrect `{default: []}` object
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
