import express from "express";
import helmet from "helmet";

import connectDB from "./config/database.js";
import feedbackRoutes from "./routes/feedback.routes.js";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "notification-service",
  });
});

app.use("/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5010;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Notification Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();