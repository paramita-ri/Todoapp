import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todos.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins in development
  }),
);
app.use(express.json());

// MongoDB Connection
const MONGODB_URI =
  "mongodb+srv://paramita:punn123456789@cluster0.k4yenop.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Connection error:", err));

// Routes
app.use("/api/todos", todoRoutes);

// Important: Listen on 0.0.0.0 instead of localhost
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
