import bcryptjs from "bcryptjs";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const { password: pass, ...rest } = newUser._doc;

    return res.status(201).json({
      success: true,
      data: rest,
      message: "User Created Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)

    const validUser = await User.findOne({ email });
    if (!validUser)
      return res
        .status(401)
        .json({ success: false, message: "User Not Found!" });

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials!" });

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    console.log(token)
    const {
      password: pass,
      _id: id,
      createdAt: created,
      updatedAt: updated,
      ...rest
    } = validUser._doc;
    return res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      user: rest,
      message: "User Logged in Successfully!",

    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const signOut = async (req, res, next) => {
  try {
    // res.clearCookie("access_token");
    res.status(200).clearCookie("access_token").json({
      success:true,
      message:"user has been logged out"
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
