import Course from "../models/Course.js";
import User from "../models/User.js";

function enrollmentFor(user, courseId) {
  return user.enrollments.find((item) => String(item.course) === courseId);
}

export async function completeLesson(req, res) {
  const course = await Course.findById(req.params.courseId).select("lessons");
  if (!course) return res.status(404).json({ message: "Course not found." });
  const lesson = course.lessons.id(req.params.lessonId);
  if (!lesson) return res.status(404).json({ message: "Lesson not found." });
  const enrollment = enrollmentFor(req.user, course.id);
  if (!enrollment && req.user.role !== "admin") {
    return res.status(403).json({ message: "Enroll in this course to track lesson progress." });
  }
  if (enrollment && !enrollment.completedLessons.some((id) => String(id) === lesson.id)) {
    enrollment.completedLessons.push(lesson._id);
    await req.user.save();
  }
  res.json({ completed: true, completedLessons: enrollment?.completedLessons ?? [] });
}

export async function lessonDetails(req, res) {
  const course = await Course.findById(req.params.courseId);
  if (!course) return res.status(404).json({ message: "Course not found." });
  const enrollment = enrollmentFor(req.user, course.id);
  const ownsCourse = req.user.role === "admin" || String(course.instructor) === req.user.id;
  if (!enrollment && !ownsCourse) {
    return res.status(403).json({ message: "Enroll in this course to view its lessons." });
  }
  res.json({ lessons: course.lessons });
}

export async function adminProgress(req, res) {
  const users = await User.find({ "enrollments.course": req.params.courseId }).select("name email enrollments");
  const enrollmentRows = users.flatMap((user) => user.enrollments
    .filter((entry) => String(entry.course) === req.params.courseId)
    .map((entry) => ({
      student: { id: user.id, name: user.name, email: user.email },
      completedLessons: entry.completedLessons.length,
      bestQuizScore: entry.bestQuizScore ?? null,
      enrolledAt: entry.enrolledAt
    })));
  res.json({ students: enrollmentRows });
}
