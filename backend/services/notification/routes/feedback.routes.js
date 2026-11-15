import express from "express";

import { submitFeedback } from "../controllers/feedback.controller.js";
import feedbackRateLimit from "../middleware/feedbackRateLimit.js";

const router = express.Router();

router.post("/", feedbackRateLimit, submitFeedback);

export default router;