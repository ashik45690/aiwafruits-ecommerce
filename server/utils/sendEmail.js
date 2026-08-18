import nodemailer from 'nodemailer';


const transpoter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
})

export async function sendOTPEmail(email , otp) {
    await transpoter.sendMail({
        from:`Aiwa Fruits <${process.env.EMAIL_USER}>`,
        to:email,
        subject:`Aiwa fruits - Password Reset Otp`,
         html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
        <h2>Aiwa Fruits</h2>

        <p>You requested to reset your password.</p>

        <p>Your OTP is:</p>

        <div style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          margin: 20px 0;
        ">
          ${otp}
        </div>

        <p>This OTP will expire in <strong>5 minutes</strong>.</p>

        <p>If you did not request a password reset, please ignore this email.</p>
      </div>
    `,
    })
}