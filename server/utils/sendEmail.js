export async function sendOTPEmail(email, otp) {
  const response = await fetch(
    "https://api.brevo.com/v3/smtp/email",
    {
      method: "POST",

      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },

      body: JSON.stringify({
        sender: {
          name: "Aiwa Fruits",
          email: process.env.BREVO_SENDER_EMAIL,
        },

        to: [
          {
            email,
          },
        ],

        subject:
          "Aiwa Fruits - Password Reset OTP",

        htmlContent: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: 40px auto;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
          ">

            <h2 style="color: #047857;">
              Aiwa Fruits
            </h2>

            <p>
              You requested to reset your password.
            </p>

            <p>
              Your password reset OTP is:
            </p>

            <div style="
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              margin: 25px 0;
              color: #047857;
            ">
              ${otp}
            </div>

            <p>
              This OTP will expire in
              <strong>5 minutes</strong>.
            </p>

            <p style="color: #6b7280;">
              If you did not request a password reset,
              please ignore this email.
            </p>

            <hr />

            <p style="
              font-size: 12px;
              color: #9ca3af;
            ">
              © ${new Date().getFullYear()} Aiwa Fruits
            </p>

          </div>
        `,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "Brevo Email Error:",
      data
    );

    throw new Error(
      data?.message ||
      "Failed to send email"
    );
  }

  console.log(
    "OTP Email sent successfully:",
    data
  );

  return data;
}