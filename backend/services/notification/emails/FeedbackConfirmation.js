const feedbackConfirmation = (feedbackId) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
  
        <body style="margin:0;background:#0A0A0A;font-family:Arial,sans-serif;color:#FAFAFA;padding:40px 16px;">
  
          <div style="max-width:560px;margin:auto;background:#141414;border:1px solid #262626;border-radius:12px;padding:32px;">
  
            <h2 style="color:#FAFAFA;">FLUX</h2>
  
            <h1 style="font-size:25px;">
              Thanks for your feedback.
            </h1>
  
            <p style="color:#A3A3A3;line-height:1.7;">
              We've successfully received your feedback.
              Your thoughts help us improve the Flux development experience.
            </p>
  
            <div style="background:#1C1C1C;padding:16px;border-radius:8px;margin:24px 0;">
              <p style="color:#8B8B8B;font-size:12px;">
                FEEDBACK REFERENCE
              </p>
  
              <p style="color:#FFFFFF;font-size:13px;word-break:break-all;">
                ${feedbackId}
              </p>
            </div>
  
            <p style="color:#A3A3A3;">— The Flux Team</p>
  
          </div>
  
        </body>
      </html>
    `;
  };
  
  export default feedbackConfirmation;