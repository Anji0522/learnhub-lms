import { ArrowRight, BookOpen, Clock3, Star } from "lucide-react";
import { Link } from "react-router-dom";

const palettes = ["lavender", "peach", "mint", "blue"];
const covers = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
];

export default function CourseCard({ course, index = 0 }) {
  const palette = palettes[index % palettes.length];
  const lessonCount = course.lessonCount ?? course.lessons?.length ?? 0;
  const rating =
    typeof course.rating === "number" ? course.rating.toFixed(1) : null;
  const learnerCount = course.enrollmentCount ?? course.studentCount;
  const durationMinutes = course.durationMinutes;

  return (
    <Link className="course-card" to={`/courses/${course._id}`}>
      <div
        className={`course-cover ${palette}`}
        style={
          course.thumbnailUrl
            ? { backgroundImage: `url("${course.thumbnailUrl}")` }
            : { backgroundImage: `url("${covers[index % covers.length]}")` }
        }
      >
        <span className="cover-tag">{course.category || "Course"}</span>
      </div>
      <div className="course-card-content">
        <div className="course-meta">
          <span className="course-level">{course.level || "All levels"}</span>
          {rating && (
            <span className="course-rating">
              <Star size={14} fill="currentColor" />
              {rating}
            </span>
          )}
          {typeof durationMinutes === "number" && (
            <span className="course-duration">
              <Clock3 size={13} />
              {durationMinutes} min
            </span>
          )}
        </div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="course-card-bottom">
          <span className="instructor">
            {typeof course.instructor === "object"
              ? course.instructor?.name
              : "LearnHub instructor"}
          </span>
          <span className="course-card-stats">
            <span>
              <BookOpen size={14} />
              {lessonCount} lessons
            </span>
            {typeof learnerCount === "number" && (
              <span>{learnerCount} learners</span>
            )}
          </span>
        </div>
        <span className="course-card-cta">
          View course <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}
