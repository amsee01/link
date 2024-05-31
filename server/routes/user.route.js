import express from "express";
import {
  deleteUserController,
  followUserController,
  getUserController,
  getUserFriendsController,
  getUserProfileController,
  unfollowUserController,
  updateProfilePictureController,
  updateUserController,
  updateUserDescController,
  updateUserCityAndFromController,
} from "../controllers/user.controller.js";
import { parser } from "../config/cloudinary.js";

const router = express.Router();

// Update user description
router.put("/:userId/desc", updateUserDescController);

// Update USER
router.put("/:id", updateUserController);

// Update profile Picture
router.put(
  "/:id/profile-picture",
  parser.single("profilePicture"),
  updateProfilePictureController
);

// Delete user
router.delete("/:id", deleteUserController);

// Get a user
router.get("/:id", getUserController);

// Get User Profile
router.get("/", getUserProfileController);

// Follow a user
router.put("/follow/:id", followUserController);

// Unfollow User
router.put("/unfollow/:id", unfollowUserController);

// Get Friends
router.get("/friends/:userId", getUserFriendsController);

router.put("/:id/updateCityAndFrom", updateUserCityAndFromController);

export default router;
