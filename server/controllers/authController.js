import { UserDatabase } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import cookie from "cookie-parser";
import { sendOTPEmail } from "../utils/sendEmail.js";

export async function Registercontroller(req, res) {
  console.log(req.body);

  try {
    const { fullname, email, Password, confirmpassword, checkbox } = req.body;

    if (!fullname || !email || !Password || !confirmpassword || !checkbox) {
      console.log("Fields Are Empty");

      return res.json({
        success: false,
        message: "All Field are Required",
      });
    }

    if (Password !== confirmpassword) {
      console.log("User Password dosnt match");

      res.json({
        success: false,
        message: "Password Doesn't match",
      });
    }
    if (!checkbox) {
      console.log("User Not allowed terms and Condition");

      res.json({
        success: false,
        message: "Terms & Condition Must accept ",
      });
    }

    const user = await UserDatabase.findOne({ email });

    console.log(user, "kkk");

    if (user) {
      console.log("Already Registerd user Attempt to Login");

      return res.json({
        success: false,
        message: "This Email Already Registerd",
      });
    }

    const salt = 10;

    const hashedPassword = await bcrypt.hash(Password, salt);

    console.log(
      hashedPassword,
      "your password Is Hashed for security purpose ",
    );

    const NewUser = UserDatabase.insertOne({
      fullname,
      email,
      Password: hashedPassword,
      checkbox,
    });

    if (NewUser) {
      console.log("New User Created");

      res.json({
        success: true,
        message: "User Registerd Successfully",
        data: NewUser,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function UserLogin(req, res) {
  try {
    console.log(req.body, "data req body il verunnund");

    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required..!",
      });
    }

    const TrimedEmail = email.trim();

    const user = await UserDatabase.findOne({ email: TrimedEmail });

    console.log(user);

    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found . Register First",
      });
    }

    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Password is Incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.Id,
        user: user,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    return res.json({
      success: true,
      message: "Login Successful ",
      user: {
        id: user.Id,
        data: user,
        token: token,
      },
    });
  } catch (error) {
    console.log(error, "something went Wrong");
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

    console.log("token Und");

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decode);

    const CurrentUserData = decode.user;

    res.json({
      success: true,
      CurrentUserData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


 export async function logout(req,res) {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

      return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
    
  } catch (error) {
    
    console.log(error);

    res.json({
       success:false,
       message:"Logout Failed"
    })
    
  }
}

export async function SendForgottPasswordOTP(req,res) {
  try {

    const {email} = req.body;

    if (!email) {
      res.json({
        success:false,
        message:"Email is Required !"
      })
    }

    const TrimmedEmail = email.trim();

    const user = await UserDatabase.findOne({
      email:TrimmedEmail
    });

    if (!user) {
      res.json({
        success:false,
        message:'OTP has been sent'
      })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await sendOTPEmail(TrimmedEmail, otp);

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
    
  } catch (error) {
    console.log(error);
      return res.json({
      success: false,
      message: "Failed to send OTP",
    });
  }
}


export async function verifyForgotPasswordOTP(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await UserDatabase.findOne({
      email: email.trim(),
    });

    if (!user || !user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check expiry
    if (new Date() > user.otpExpiry) {
      user.otp = null;
      user.otpExpiry = null;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Compare entered OTP with hashed OTP
    const isValidOTP = await bcrypt.compare(
      otp.toString(),
      user.otp
    );

    if (!isValidOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP successfully verified
    user.otp = null;
    user.otpExpiry = null;

    // Generate temporary reset token
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

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      resetToken,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
}


export async function resetPassword(req, res) {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;

    if (!resetToken || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters",
      });
    }

    const decoded = jwt.verify(
      resetToken,
      process.env.JWT_SECRET
    );

    if (decoded.purpose !== "password-reset") {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token",
      });
    }

    const user = await UserDatabase.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.Password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        success: false,
        message: "Reset session expired. Please request OTP again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
}