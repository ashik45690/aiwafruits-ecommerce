import { UserDatabase } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import cookie from "cookie-parser";

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