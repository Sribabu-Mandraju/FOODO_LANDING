import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();

// Add the cookie-parser middleware
app.use(cookieParser());

// Your verifyToken middleware function
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    if (user) {
      req.user = user;
      next();
    }
  });
};

export default app;
