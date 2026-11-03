import Course from "../models/Course.js";
import User from "../models/User.js";

export async function dashboard(req, res) {
  const [students, instructors, courses, enrollments] = await Promise.all([
    User.countDocuments({ role: "student" }),
    User.countDocuments({ role: "instructor" }),
    Course.countDocuments(),
    User.aggregate([
      { $project: { enrollmentCount: { $size: "$enrollments" } } },
      { $group: { _id: null, total: { $sum: "$enrollmentCount" } } },
    ]),
  ]);
  res.json({
    stats: {
      students,
      instructors,
      courses,
      enrollments: enrollments[0]?.total ?? 0,
    },
  });
}
