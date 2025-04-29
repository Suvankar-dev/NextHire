export const getInfo = async (req, res) => {
  const { userid } = req.params;
  if (!userid) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findById(userid).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      bio: user.bio,
      location: user.location,
      phone: user.phone,
      skills: user.skills,
      experience: user.experience,
      education: user.education,
      projects: user.projects,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const updateInfo = async (req, res) => {
  const { bio, location, phone, skills, experience, education, projects } =
    req.body;
  const { userid } = req.params;
  if (!userid) console.log("User ID not found in request");
  try {
    if (
      !bio &&
      !location &&
      !phone &&
      !skills &&
      !experience &&
      !education &&
      !projects
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findByIdAndUpdate(
      userID,
      {
        bio,
        location,
        phone,
        skills,
        experience,
        education,
        projects,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.save();
    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      bio: user.bio,
      location: user.location,
      phone: user.phone,
      skills: user.skills,
      experience: user.experience,
      education: user.education,
      projects: user.projects,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
