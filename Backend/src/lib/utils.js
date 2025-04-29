import jwt from "jsonwebtoken";
export const generateToken = (userID, res, role) => {
  let token; // Declare token outside the try block
  try {
    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    // Generate JWT token
    token = jwt.sign({ id: userID, role: role }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: "/",
    });
  } catch (error) {
    console.log("Error in generating token", error.message);
  }
  console.log("Token generated successfully", typeof token, token);
  return token;
};
