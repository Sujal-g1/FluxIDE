import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 5000,
    },

    email: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
    },

    // ID received from the authenticated Gateway
    userId: {
      type: String,
      default: null,
      index: true,
    },

    anonymous: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["received", "reviewed", "resolved"],
      default: "received",
    },

    adminEmailStatus: {
      type: String,
      enum: ["pending", "accepted", "failed"],
      default: "pending",
    },

    adminEmailId: {
      type: String,
      default: null,
    },

    confirmationEmailStatus: {
      type: String,
      enum: ["not_requested", "pending", "accepted", "failed"],
      default: "not_requested",
    },

    confirmationEmailId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;