
import Feedback from "../models/Feedback.js";
import resend from "../config/resend.js";

import feedbackConfirmation from "../emails/FeedbackConfirmation.js";
import feedbackNotification from "../emails/FeedbackNotification.js";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const submitFeedback = async (req, res) => {
  try {
    const { message, email, anonymous = false } = req.body;

    const userId = req.headers["x-user-id"] || null;

    const cleanMessage =
      typeof message === "string" ? message.trim() : "";

    const cleanEmail =
      typeof email === "string"
        ? email.trim().toLowerCase()
        : "";

    if (cleanMessage.length < 5 || cleanMessage.length > 5000) {
      return res.status(400).json({
        success: false,
        message: "Feedback must be between 5 and 5000 characters.",
      });
    }

    if (cleanEmail && !isValidEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    if (typeof anonymous !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Invalid anonymous value.",
      });
    }

    if (anonymous && cleanEmail) {
      return res.status(400).json({
        success: false,
        message: "Anonymous feedback cannot include a contact email.",
      });
    }

    const feedback = await Feedback.create({
      message: cleanMessage,
      email: cleanEmail || null,
      userId: userId,
      anonymous,
      confirmationEmailStatus: cleanEmail
        ? "pending"
        : "not_requested",
    });

    // Admin notification
    try {
      const { data, error } = await resend.emails.send({
        from: `Flux <${process.env.RESEND_FROM_EMAIL}>`,
        to: ["ppython722@gmail.com"],
        subject: "New feedback received — Flux",

        html: feedbackNotification({
          feedbackId: feedback._id.toString(),
          message: cleanMessage,
          email: cleanEmail,
          userId,
          anonymous,
          createdAt: feedback.createdAt,
        }),
      });

      if (error) throw error;

      feedback.adminEmailStatus = "accepted";
      feedback.adminEmailId = data?.id || null;

    } catch (error) {
      console.error("Admin email failed:", error);
      feedback.adminEmailStatus = "failed";
    }

    // User confirmation
    if (cleanEmail && !anonymous) {
      try {
        const { data, error } = await resend.emails.send({
          from: `Flux <${process.env.RESEND_FROM_EMAIL}>`,
          to: [cleanEmail],
          subject: "We received your feedback — Flux",
          html: feedbackConfirmation(feedback._id.toString()),
        });

        if (error) throw error;

        feedback.confirmationEmailStatus = "accepted";
        feedback.confirmationEmailId = data?.id || null;

      } catch (error) {
        console.error("Confirmation email failed:", error);
        feedback.confirmationEmailStatus = "failed";
      }
    }

    await feedback.save();

    return res.status(201).json({
      success: true,
      message: "Your feedback has been received.",
      feedback: {
        id: feedback._id,
        status: feedback.status,
        adminEmailStatus: feedback.adminEmailStatus,
        confirmationEmailStatus: feedback.confirmationEmailStatus,
        createdAt: feedback.createdAt,
      },
    });

  } catch (error) {
    console.error("Submit feedback error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit feedback.",
    });
  }
};
