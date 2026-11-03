import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
    bestQuizScore: { type: Number, min: 0, max: 100 },
    enrolledAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 254 },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
    enrollments: { type: [enrollmentSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
