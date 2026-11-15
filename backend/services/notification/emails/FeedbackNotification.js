
const escapeHTML = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  
  const feedbackNotification = ({
    feedbackId,
    message,
    email,
    userId,
    anonymous,
    createdAt,
    feedbackType,
  }) => {
    const safeId = escapeHTML(feedbackId);
    const safeMessage = escapeHTML(message);
    const safeEmail = escapeHTML(email || "Not provided");
    const safeUserId = escapeHTML(userId || "Unavailable");
    const safeType = escapeHTML(feedbackType || "General feedback");
  
    const formattedDate = createdAt
      ? new Date(createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Asia/Kolkata",
        })
      : "Unavailable";
  
    const safeDate = escapeHTML(formattedDate);
  
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.55; }
      }
  
      .pulse {
        animation: pulse 2s ease-in-out infinite;
      }
  
      @media (prefers-reduced-motion: reduce) {
        .pulse {
          animation: none !important;
        }
      }
    </style>
  </head>
  
  <body style="
    margin:0;
    padding:40px 16px;
    background:#080808;
    font-family:Arial,Helvetica,sans-serif;
    color:#FAFAFA;
  ">
  
    <div style="
      max-width:600px;
      margin:0 auto;
      background:#101010;
      border:1px solid #262626;
      border-radius:16px;
      overflow:hidden;
    ">
  
      <!-- Accent -->
      <div style="
        height:3px;
        background:linear-gradient(90deg,#1D4ED8,#60A5FA,#3B82F6);
      "></div>
  
      <div style="padding:34px 30px;">
  
        <!-- Header -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="
                font-size:22px;
                font-weight:800;
                letter-spacing:3px;
                color:#FFFFFF;
              ">FLUX</span>
            </td>
  
            <td align="right">
              <span style="
                color:#60A5FA;
                border:1px solid #24477D;
                background:#101D32;
                border-radius:20px;
                padding:7px 11px;
                font-size:10px;
                letter-spacing:1px;
              ">
                ADMIN NOTIFICATION
              </span>
            </td>
          </tr>
        </table>
  
        <!-- Main heading -->
        <div style="margin-top:42px;">
  
          <div class="pulse" style="
            width:48px;
            height:48px;
            line-height:48px;
            text-align:center;
            border-radius:13px;
            background:#142746;
            border:1px solid #2456A0;
            color:#60A5FA;
            font-size:23px;
          ">
            ↗
          </div>
  
          <p style="
            margin:26px 0 10px;
            color:#60A5FA;
            font-size:10px;
            font-weight:bold;
            letter-spacing:2px;
          ">
            NEW SUBMISSION
          </p>
  
          <h1 style="
            margin:0;
            color:#FFFFFF;
            font-size:29px;
            letter-spacing:-0.8px;
            line-height:1.3;
          ">
            New feedback<br />
            received.
          </h1>
  
          <p style="
            margin:15px 0 0;
            color:#929292;
            font-size:13px;
            line-height:1.8;
          ">
            Someone from the Flux community has shared
            feedback. Here are the submission details.
          </p>
  
        </div>
  
        <!-- Feedback type -->
        <div style="
          margin-top:30px;
          padding:18px;
          background:#142033;
          border:1px solid #24477D;
          border-radius:10px;
        ">
          <p style="
            margin:0;
            color:#779BCB;
            font-size:10px;
            letter-spacing:1.5px;
          ">
            FEEDBACK CATEGORY
          </p>
  
          <p style="
            margin:9px 0 0;
            color:#93C5FD;
            font-size:17px;
            font-weight:bold;
          ">
            ${safeType}
          </p>
        </div>
  
        <!-- Message -->
        <div style="margin-top:30px;">
  
          <p style="
            margin:0 0 12px;
            color:#777777;
            font-size:10px;
            letter-spacing:1.5px;
          ">
            USER MESSAGE
          </p>
  
          <div style="
            padding:22px;
            background:#171717;
            border:1px solid #292929;
            border-radius:10px;
          ">
            <p style="
              margin:0;
              color:#E5E5E5;
              font-size:14px;
              line-height:1.9;
              white-space:pre-wrap;
              word-break:break-word;
            ">${safeMessage}</p>
          </div>
  
        </div>
  
        <!-- User details -->
        <div style="margin-top:30px;">
  
          <p style="
            margin:0 0 15px;
            color:#777777;
            font-size:10px;
            letter-spacing:1.5px;
          ">
            SUBMISSION DETAILS
          </p>
  
          <table width="100%" cellpadding="0" cellspacing="0"
            style="
              background:#141414;
              border:1px solid #292929;
              border-radius:10px;
            ">
  
            <tr>
              <td style="padding:15px 17px;color:#777777;font-size:12px;">
                Contact email
              </td>
              <td align="right" style="
                padding:15px 17px;
                color:#D4D4D4;
                font-size:12px;
                word-break:break-all;
              ">
                ${safeEmail}
              </td>
            </tr>
  
            <tr>
              <td colspan="2" style="padding:0 17px;">
                <div style="height:1px;background:#292929;"></div>
              </td>
            </tr>
  
            <tr>
              <td style="padding:15px 17px;color:#777777;font-size:12px;">
                User ID
              </td>
              <td align="right" style="
                padding:15px 17px;
                color:#D4D4D4;
                font-family:monospace;
                font-size:11px;
                word-break:break-all;
              ">
                ${safeUserId}
              </td>
            </tr>
  
            <tr>
              <td colspan="2" style="padding:0 17px;">
                <div style="height:1px;background:#292929;"></div>
              </td>
            </tr>
  
            <tr>
              <td style="padding:15px 17px;color:#777777;font-size:12px;">
                Submission type
              </td>
              <td align="right" style="
                padding:15px 17px;
                color:#D4D4D4;
                font-size:12px;
              ">
                ${anonymous ? "Anonymous" : "Identified"}
              </td>
            </tr>
  
            <tr>
              <td colspan="2" style="padding:0 17px;">
                <div style="height:1px;background:#292929;"></div>
              </td>
            </tr>
  
            <tr>
              <td style="padding:15px 17px;color:#777777;font-size:12px;">
                Submitted at
              </td>
              <td align="right" style="
                padding:15px 17px;
                color:#D4D4D4;
                font-size:12px;
              ">
                ${safeDate}
              </td>
            </tr>
  
          </table>
  
        </div>
  
        <!-- Reference -->
        <div style="
          margin-top:25px;
          padding:17px;
          background:#0C1420;
          border:1px solid #1E3A5F;
          border-radius:10px;
        ">
          <p style="
            margin:0;
            color:#779BCB;
            font-size:10px;
            letter-spacing:1.5px;
          ">
            FEEDBACK REFERENCE
          </p>
  
          <p style="
            margin:10px 0 0;
            color:#93C5FD;
            font-family:monospace;
            font-size:12px;
            word-break:break-all;
          ">
            ${safeId}
          </p>
        </div>
  
        <!-- Footer -->
        <div style="
          margin-top:32px;
          padding-top:22px;
          border-top:1px solid #262626;
        ">
          <p style="
            margin:0;
            color:#A3A3A3;
            font-size:12px;
            line-height:1.8;
          ">
            Review this submission and use it to make
            the Flux development experience better.
          </p>
  
          <p style="
            margin:20px 0 0;
            color:#FFFFFF;
            font-size:13px;
            font-weight:bold;
          ">
            Flux Admin System
          </p>
        </div>
  
      </div>
  
      <div style="
        padding:19px 25px;
        background:#0C0C0C;
        border-top:1px solid #262626;
        text-align:center;
      ">
        <p style="
          margin:0;
          color:#666666;
          font-size:10px;
          line-height:1.8;
        ">
          FLUX · CODE IN MOTION
          <br />
          © ${new Date().getFullYear()} Flux. Internal notification.
        </p>
      </div>
  
    </div>
  
  </body>
  </html>
  `;
  };
  
  export default feedbackNotification;
  