import Course from "../models/Course.js";
import User from "../models/User.js";

export async function submitQuiz(req, res) {
  const course = await Course.findById(req.params.courseId).select("quiz");
  if (!course) return res.status(404).json({ message: "Course not found." });
  const enrollment = req.user.enrollments.find(
    (entry) => String(entry.course) === course.id,
  );
  if (!enrollment && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Enroll in this course to take its quiz." });
  }
  if (
    !Array.isArray(req.body.answers) ||
    req.body.answers.length !== course.quiz.length
  ) {
    return res
      .status(400)
      .json({ message: "Submit one answer for every quiz question." });
  }
  if (
    req.body.answers.some(
      (answer, index) =>
        !Number.isInteger(answer) ||
        answer < 0 ||
        answer >= course.quiz[index].options.length,
    )
  ) {
    return res
      .status(400)
      .json({ message: "Choose a valid option for every quiz question." });
  }
  let correct = 0;
  course.quiz.forEach((question, index) => {
    const selected = req.body.answers[index];
    if (selected === question.correctIndex) correct += 1;
  });
  const score = course.quiz.length
    ? Math.round((correct / course.quiz.length) * 100)
    : 0;
  if (enrollment) {
    enrollment.bestQuizScore = Math.max(enrollment.bestQuizScore ?? 0, score);
    await req.user.save();
  }
  res.json({ score, correct, total: course.quiz.length });
}

export async function progressSummary(req, res) {
  const user = await User.findById(req.user.id).populate(
    "enrollments.course",
    "title lessons",
  );
  const progress = user.enrollments.map((entry) => {
    const lessonCount = entry.course?.lessons.length ?? 0;
    const completed = Math.min(entry.completedLessons.length, lessonCount);
    return {
      courseId: entry.course?._id,
      title: entry.course?.title,
      completedLessons: completed,
      totalLessons: lessonCount,
      percent: lessonCount ? Math.round((completed / lessonCount) * 100) : 0,
      bestQuizScore: entry.bestQuizScore ?? null,
    };
  });
  res.json({ progress });
}
