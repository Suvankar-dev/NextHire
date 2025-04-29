import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullname: name,
      email,
      password: hashPassword,
      role,
    });
    if (newUser) {
      const gotToken = generateToken(newUser._id, res, role);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        token: gotToken,
      });
    }
    return res.status(400).json({ message: "invalid user data" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log(user);
    const role = user.role;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id, res, role);
    if (!token || token === undefined) {
      console.log("Token not generated");
    }

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
export const updateProfilePic = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userID = req.user._id;

    if (!profilePicture) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const uploadResponce = await cloudinary.uploader.upload(profilePicture);
    const updateUser = await User.findByIdAndUpdate(
      userID,
      { profilePicture: uploadResponce.secure_url },
      { new: true }
    );
    if (updateUser) {
      return res.status(200).json({
        _id: updateUser._id,
        fullname: updateUser.fullname,
        email: updateUser.email,
        role: updateUser.role,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
