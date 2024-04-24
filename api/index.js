import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
import authRouter from "./routes/auth.route.js";


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

// const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL,"https://food-client-kbkq.vercel.app","http://localhost:5173"];

// // Configure CORS
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       // Origin is allowed or it's a same-origin request
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // Allow sending cookies
//   optionsSuccessStatus: 200,
// };

app.use(cors({
  origin: true,
  credentials: true,
}));app.use(cookieParser()); 

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
  console.log(process.env.FRONTEND_URL)
  console.log(process.env.ADMIN_URL)

});

export const verifiedToken = (req, res, next) => {
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

app.use("/api/auth", authRouter);
app.get('/', (req, res) => {
  // Log the value of the 'access_token' cookie
  console.log('access_token cookie value:', req.cookies.access_token);

  // You can also log the entire cookies object
  console.log('All cookies:', req.cookies.access_token);

  // Your route handler logic...
  res.send(req.cookies.access_token);
});