import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.routes.js";
import { connectDB } from "./lib/db.js";
import jobsRouter from "./routes/jobs.routes.js";
import adminRouter from "./routes/admin.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();
app.use("/api/auth", userRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/applications", applicationRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
