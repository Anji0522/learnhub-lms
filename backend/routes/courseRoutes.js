import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  enroll,
  getCourse,
  listCourses,
  myCourses,
  updateCourse,
} from "../controllers/courseController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";
import { optionalAuth } from "../middleware/optionalAuthMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
router.get("/", asyncHandler(listCourses));
router.get("/mine", requireAuth, asyncHandler(myCourses));
router.post(
  "/",
  requireAuth,
  requireRole("instructor", "admin"),
  asyncHandler(createCourse),
);
router.post(
  "/:id/enroll",
  requireAuth,
  requireRole("student"),
  asyncHandler(enroll),
);
router.get("/:id", optionalAuth, asyncHandler(getCourse));
router.put(
  "/:id",
  requireAuth,
  requireRole("instructor", "admin"),
  asyncHandler(updateCourse),
);
router.delete(
  "/:id",
  requireAuth,
  requireRole("instructor", "admin"),
  asyncHandler(deleteCourse),
);
export default router;
