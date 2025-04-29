import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("No token found");

      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized-1" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
////////////////////////////////////////////////////////////////////////

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Admin access only" });
  }
};
export { adminOnly };

// Middleware to check employer only
const employerOnly = (req, res, next) => {
  if (req.user && req.user.role === "employer") {
    next();
  } else {
    res.status(401).json({ message: "Employer access only" });
  }
};
export { employerOnly };

// Middleware to check seeker only
const seekerOnly = (req, res, next) => {
  if (req.user && req.user.role === "seeker") {
    next();
  } else {
    res.status(401).json({ message: "Job seeker access only" });
  }
};
export { seekerOnly };
