import { UserDatabase } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "../utils/sendEmail.js";

export async function Registercontroller(req, res) {
  console.log(req.body);

  try {
    const {
      fullname,
      email,
      Password,
      confirmpassword,
      checkbox,
    } = req.body;

    if (
      !fullname ||
      !email ||
      !Password ||
      !confirmpassword ||
      !checkbox
    ) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    if (Password !== confirmpassword) {
      return res.json({
        success: false,
        message: "Passwords don't match",
      });
    }

    if (!checkbox) {
      return res.json({
        success: false,
        message: "Terms & Conditions must be accepted",
      });
    }

    const TrimmedEmail = email.trim().toLowerCase();

    const user = await UserDatabase.findOne({
      email: TrimmedEmail,
    });

    if (user) {
      return res.json({
        success: false,
        message: "This email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(
      Password,
      10
    );

    const NewUser = await UserDatabase.create({
      fullname,
      email: TrimmedEmail,
      Password: hashedPassword,
      checkbox,
    });

    return res.json({
      success: true,
      message: "User registered successfully",
      data: NewUser,
    });

  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
}


export async function UserLogin(req, res) {
  try {
    console.log(
      req.body,
      "data req body il verunnund"
    );

    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required..!",
      });
    }

    const TrimmedEmail = email
      .trim()
      .toLowerCase();

    const user = await UserDatabase.findOne({
      email: TrimmedEmail,
    });

    console.log(user);

    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found. Register First",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.Password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Password is Incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        user: user,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login Successful",
      user: {
        id: user._id,
        data: user,
        token: token,
      },
    });

  } catch (error) {
    console.error(
      error,
      "Something went wrong"
    );

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
}


export async function getCurrentUser(req, res) {
  try {
    console.log(req.cookies, "All Cookies");

    const token = req.cookies.token;

    if (!token) {
      return res.json({
        success: false,
        message: "Token Not Found",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const CurrentUserData = decoded.user;

    return res.json({
      success: true,
      CurrentUserData,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


export async function logout(req, res) {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Logout Failed",
    });
  }
}


export async function SendForgottPasswordOTP(req, res) {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const TrimmedEmail = email
      .trim()
      .toLowerCase();

    const user = await UserDatabase.findOne({
      email: TrimmedEmail,
    });

    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If this email is registered, an OTP has been sent",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const hashedOTP = await bcrypt.hash(
      otp,
      10
    );

    user.otp = hashedOTP;

    user.otpExpiry = new Date(
      Date.now() + 5 * 60 * 1000
    );

    await user.save();

    await sendOTPEmail(
      TrimmedEmail,
      otp
    );

    console.log(
      `OTP sent successfully to ${TrimmedEmail}`
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.error(
      "Send OTP Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
}


export async function verifyForgotPasswordOTP(
  req,
  res
) {
  try {

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message:
          "Email and OTP are required",
      });
    }

    const TrimmedEmail = email
      .trim()
      .toLowerCase();

    const user = await UserDatabase.findOne({
      email: TrimmedEmail,
    });

    if (
      !user ||
      !user.otp ||
      !user.otpExpiry
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (
      new Date() > user.otpExpiry
    ) {

      user.otp = null;
      user.otpExpiry = null;

      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    const isValidOTP =
      await bcrypt.compare(
        otp.toString(),
        user.otp
      );

    if (!isValidOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    const resetToken = jwt.sign(
      {
        userId: user._id.toString(),
        purpose: "password-reset",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "OTP verified successfully",
      resetToken,
    });

  } catch (error) {

    console.error(
      "Verify OTP Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "OTP verification failed",
    });
  }
}


export async function resetPassword(
  req,
  res
) {
  try {

    const {
      resetToken,
      newPassword,
      confirmPassword,
    } = req.body;

    if (
      !resetToken ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    if (
      newPassword !== confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Passwords do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 6 characters",
      });
    }

    const decoded = jwt.verify(
      resetToken,
      process.env.JWT_SECRET
    );

    if (
      decoded.purpose !==
      "password-reset"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid reset token",
      });
    }

    const user =
      await UserDatabase.findById(
        decoded.userId
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.Password =
      hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successfully",
    });

  } catch (error) {

    console.error(
      "Reset Password Error:",
      error
    );

    if (
      error.name ===
      "TokenExpiredError"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Reset session expired. Please request OTP again.",
      });
    }

    if (
      error.name ===
      "JsonWebTokenError"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid reset token",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to reset password",
    });
  }
}