import { Router } from "express";
import {
  completeLesson,
  lessonDetails,
} from "../controllers/lessonController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
router.get("/:courseId", requireAuth, asyncHandler(lessonDetails));
router.post(
  "/:courseId/:lessonId/complete",
  requireAuth,
  asyncHandler(completeLesson),
);
export default router;
