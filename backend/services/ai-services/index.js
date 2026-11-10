
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/ai.routes.js";

dotenv.config();

const port = process.env.PORT || 5007;
const app = express();

app.use(express.json());
app.use("/", router)


app.use((req, res, next) => {
  console.log("AI SERVICE RECEIVED:", req.method, req.url);
  next();
});



app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.json("hello from services/ai");
});



const startServer = async () => {
  try {
    await connectDb();

    app.listen(port, () => {
      console.log(`ai service running on port ${port}`);
    });
  } catch (error) {
    console.error("ai service startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
