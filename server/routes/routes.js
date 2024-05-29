import express from "express";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";
import postRoutes from "./post.route.js";
import commentRoutes from "./comment.route.js";

const router = express.Router();

const baseURL = "api/v1";

router.use(`/${baseURL}/users`, userRoutes);
router.use(`/${baseURL}/auth`, authRoutes);
router.use(`/${baseURL}/posts`, postRoutes);
router.use(`/${baseURL}/comments`, commentRoutes);

export default router;
