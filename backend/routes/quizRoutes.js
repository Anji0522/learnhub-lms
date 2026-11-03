import { Router } from "express";
import { progressSummary, submitQuiz } from "../controllers/quizController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
router.get("/progress", requireAuth, asyncHandler(progressSummary));
router.post("/:courseId/submit", requireAuth, asyncHandler(submitQuiz));
export default router;
