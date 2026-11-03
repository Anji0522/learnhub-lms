import Course from "../models/Course.js";
import User from "../models/User.js";

export async function listCourses(req, res) {
  const filter = { published: true };
  if (req.query.category) filter.category = String(req.query.category).slice(0, 80);
  if (req.query.search) {
    const search = String(req.query.search).slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
  }
  const courses = await Course.find(filter).populate("instructor", "name").sort({ createdAt: -1 }).limit(100);
  res.json({ courses: courses.map((course) => {
    const data = course.toObject();
    data.lessonCount = data.lessons.length;
    data.lessons = data.lessons.map(({ _id, title, description, order }) => ({ _id, title, description, order }));
    delete data.quiz;
    return data;
  }) });
}

export async function getCourse(req, res) {
  const course = await Course.findById(req.params.id).populate("instructor", "name");
  if (!course || (!course.published && req.user?.role !== "admin")) {
    return res.status(404).json({ message: "Course not found." });
  }
  const data = course.toObject();
  data.quiz = data.quiz.map(({ _id, prompt, options }) => ({ _id, prompt, options }));
  const enrollment = req.user?.enrollments?.some((item) => String(item.course) === course.id);
  const ownsCourse = req.user?.role === "admin" || String(course.instructor?._id ?? course.instructor) === req.user?.id;
  if (!enrollment && !ownsCourse) {
    data.lessons = data.lessons.map(({ _id, title, description, order }) => ({ _id, title, description, order }));
  }
  res.json({ course: data });
}

export async function createCourse(req, res) {
  const course = await Course.create({ ...req.body, instructor: req.user.id });
  res.status(201).json({ course });
}

export async function updateCourse(req, res) {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found." });
  if (req.user.role !== "admin" && String(course.instructor) !== req.user.id) {
    return res.status(403).json({ message: "You can only edit your own courses." });
  }
  const allowed = ["title", "description", "category", "level", "thumbnailUrl", "published", "lessons", "quiz"];
  for (const key of allowed) {
    if (req.body[key] !== undefined) course[key] = req.body[key];
  }
  await course.save();
  res.json({ course });
}

export async function deleteCourse(req, res) {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found." });
  if (req.user.role !== "admin" && String(course.instructor) !== req.user.id) {
    return res.status(403).json({ message: "You can only remove your own courses." });
  }
  await Promise.all([
    course.deleteOne(),
    User.updateMany({}, { $pull: { enrollments: { course: course._id } } })
  ]);
  res.json({ message: "Course deleted." });
}

export async function enroll(req, res) {
  const course = await Course.findOne({ _id: req.params.id, published: true }).select("_id");
  if (!course) return res.status(404).json({ message: "Course not found." });
  const existing = req.user.enrollments.some((item) => String(item.course) === course.id);
  if (!existing) {
    req.user.enrollments.push({ course: course._id });
    await req.user.save();
  }
  res.status(existing ? 200 : 201).json({ message: existing ? "Already enrolled." : "Enrollment successful." });
}

export async function myCourses(req, res) {
  if (req.user.role === "instructor" || req.user.role === "admin") {
    const filter = req.user.role === "admin" ? {} : { instructor: req.user.id };
    const courses = await Course.find(filter).populate("instructor", "name").sort({ createdAt: -1 });
    return res.json({ courses });
  }
  const user = await User.findById(req.user.id).populate({
    path: "enrollments.course",
    populate: { path: "instructor", select: "name" }
  });
  res.json({ courses: user.enrollments.map(({ course, completedLessons, bestQuizScore, enrolledAt }) => ({
    course,
    completedLessons,
    bestQuizScore,
    enrolledAt
  })) });
}
