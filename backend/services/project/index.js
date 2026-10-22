
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/project.route.js";

dotenv.config();

const port = process.env.PORT || 5005;
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.json("hello from services/project");
});

app.use("/", router);

const startServer = async () => {
  try {
    await connectDb();

    app.listen(port, () => {
      console.log(`Project service running on port ${port}`);
    });
  } catch (error) {
    console.error("Project service startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
