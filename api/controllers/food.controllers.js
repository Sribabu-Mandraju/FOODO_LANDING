import Food from "../models/food.models.js";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";






const app = express();

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));


export const DonateFood = async (req, res) => {
    try {
      const {
        foodname,
        email,
        phonenumber,
        quantity,
        address,
        mealType,
        categoryType,
        district,
      } = req.body;
      console.log(req.body)
  
      const food = await Food.create({
        foodname,
        email,
        phonenumber,
        quantity,
        address,
        mealType,
        categoryType,
        district,
      });
      console.log(food)
  
      return res.status(200).json({
        success: true,
        message: "Food added successfully",
        data: food,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  export const GetALlDonations = async (req, res) => {
    try {
      const token = req.cookies.access_token;
      const food = await Food.find();
      res.status(200).json({
        success: true,
        data: food,
        token:token
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
  // export const GetALlDonations = (req, res, next) => {
  //   const token = req.cookies.access_token;

  
  //   if (!token) {
  //     return res.status(401).json({ success: false, message: "Unauthorized" });
  //   }
  
  //   jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
  //     if (err) {
  //       return res.status(403).json({ success: false, message: "Forbidden" });
  //     }
  //     if (user) {
  //       try {
  //         const food = await Food.find();
  //         res.status(200).json({
  //           success: true,
  //           data: food,
  //           token:token
  //         });
  //       } catch (error) {
  //         res.status(500).json({
  //           success: false,
  //           message: "Internal server error",
  //         });
  //       }
  //     }
  //   });
  // };


  export const UpdateDonationByID = async (req, res) => {
    try {
      const { id } = req.params;
      const updateFields = req.body; 
  
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({
          success: false,
          message: "No fields provided for update",
        });

      }
  
      const updatedFood = await Food.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
  
      if (!updatedFood) {
        return res.status(404).json({
          success: false,
          message: "Food donation not found",
        });
      }

  
      return res.status(200).json({
        success: true,
        message: "Food donation updated successfully",
        data: updatedFood,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message:error.message,
      });
    }
  }
  // export const UpdateDonationByID = async (req, res) => {
  //   const token = req.cookies.access_token;
  
  //   if (!token) {
  //     return res.status(401).json({ success: false, message: "Unauthorized" });
  //   }
  
  //   jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
  //     if (err) {
  //       return res.status(403).json({ success: false, message: "Forbidden" });
  //     }
  //     if (user) {
  //       try {
  //         const { id } = req.params;
  //         const updateFields = req.body; 
  
  //         if (Object.keys(updateFields).length === 0) {
  //           return res.status(400).json({
  //             success: false,
  //             message: "No fields provided for update",
  //           });
  //         }
  
  //         const updatedFood = await Food.findByIdAndUpdate(id, updateFields, {
  //           new: true,
  //         });
  
  //         if (!updatedFood) {
  //           return res.status(404).json({
  //             success: false,
  //             message: "Food donation not found",
  //           });
  //         }
  
  //         return res.status(200).json({
  //           success: true,
  //           message: "Food donation updated successfully",
  //           data: updatedFood,
  //         });
  //       } catch (error) {
  //         console.error(error);
  //         return res.status(500).json({
  //           success: false,
  //           message: error.message,
  //         });
  //       }
  //     }
  //   });
  // };

  export const DeleteDonation =  async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the food donation exists
      const existingFood = await Food.findById(id);
      if (!existingFood) {
        return res.status(404).json({
          success: false,
          message: "Food donation not found",
        });
      }
  
      // Delete the food donation
      const deletedFood = await Food.findByIdAndDelete(id);
  
      // Check if the food donation was successfully deleted
      if (!deletedFood) {
        return res.status(404).json({
          success: false,
          message: "Failed to delete food donation",
        });
      }
  
      // If successfully deleted, return success response
      return res.status(200).json({
        success: true,
        message: "Food donation deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }