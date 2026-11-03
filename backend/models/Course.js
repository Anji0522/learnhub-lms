import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, trim: true, maxlength: 2000, default: "" },
  videoUrl: { type: String, trim: true, maxlength: 2048, default: "" },
  order: { type: Number, min: 0, default: 0 },
});

const questionSchema = new mongoose.Schema({
  prompt: { type: String, required: true, trim: true, maxlength: 1000 },
  options: {
    type: [{ type: String, trim: true, maxlength: 500 }],
    validate: {
      validator: (options) => options.length >= 2 && options.length <= 6,
      message: "Each quiz question must have between 2 and 6 options.",
    },
  },
  correctIndex: { type: Number, required: true, min: 0 },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    category: { type: String, required: true, trim: true, maxlength: 80 },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    thumbnailUrl: { type: String, trim: true, maxlength: 2048, default: "" },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    published: { type: Boolean, default: true },
    lessons: { type: [lessonSchema], default: [] },
    quiz: { type: [questionSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("Course", courseSchema);
