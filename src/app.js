import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js"; // ⬅ UPDATED NAME

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Root route (API status)
app.get("/", (req, res) => {
  res.json({
    name: "Task Manager API",
    status: "running",
    version: "1.0.0",
    endpoints: {
      tasks: "/api/tasks"
    }
  });
});
// Routes (API Base URL)
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error("❌ MongoDB connection error:", error));