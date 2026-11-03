import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  const token = req.cookies?.learnhub_token;
  if (!token) {
    return res.status(401).json({ message: "Sign in to continue." });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured.");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select(
      "_id name email role enrollments",
    );
    if (!user) {
      return res
        .status(401)
        .json({ message: "Your session is no longer valid." });
    }
    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res
        .status(401)
        .json({ message: "Your session has expired. Sign in again." });
    }
    next(error);
  }
}
