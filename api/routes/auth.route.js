import express from "express";
import { signOut, signin, signup } from "../controllers/auth.controllers.js";
import { verifiedToken } from "../index.js";
import {
  DonateFood,
  GetALlDonations,
  UpdateDonationByID,
  DeleteDonation,
} from "../controllers/food.controllers.js";
import { verifyToken } from "../utils/verifyToken.js";
import {
  PostContact,
  GetALlContacts,
  DeleteContact,
} from "../controllers/contact.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signOut);

//food routes
router.post("/donatefood", DonateFood);
router.get("/getdonations",verifyToken, GetALlDonations);
router.patch("/updatedonation/:id",verifyToken, UpdateDonationByID);
router.delete("/deletedonation/:id", verifyToken, DeleteDonation);

//contact routes
router.post("/contact", PostContact);
router.get("/allContacts", verifyToken, GetALlContacts);
router.delete("/deleteContact/:id", verifyToken, DeleteContact);

export default router;
