
import rateLimit from "express-rate-limit";

const feedbackRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many feedback submissions. Try again later.",
  },
});

export default feedbackRateLimit;