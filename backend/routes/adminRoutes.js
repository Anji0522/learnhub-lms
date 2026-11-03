import { Router } from "express";
import { dashboard } from "../controllers/adminController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
router.get("/dashboard", requireAuth, requireRole("admin"), asyncHandler(dashboard));
export default router;
