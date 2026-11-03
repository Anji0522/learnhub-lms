import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CirclePlay,
  Clock3,
  LockKeyhole,
  Play,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";

function isSecureVideoUrl(value) {
  if (typeof value !== "string" || !URL.canParse(value)) {
    return false;
  }

  const parsedUrl = new URL(value);
  return parsedUrl.protocol === "https:" && Boolean(parsedUrl.hostname);
}

export default function CourseDetails() {
  const { id } = useParams();
  const { user, refresh } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api(`/courses/${id}`)
      .then(({ course: item }) => {
        setCourse(item);
        if (user) {
          return api("/courses/mine").then(({ courses }) => {
            const entry = courses.find((item) => item.course?._id === id);
            setEnrolled(Boolean(entry));
            setProgress(entry?.completedLessons || []);
          });
        }
      })
      .catch((reason) => setError(reason.message));
  }, [id, user]);

  async function enroll() {
    if (!user)
      return navigate("/login", {
        state: { from: { pathname: `/courses/${id}` } },
      });
    setBusy(true);
    setError("");
    try {
      await api(`/courses/${id}/enroll`, { method: "POST" });
      setEnrolled(true);
      await refresh();
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  }

  async function completeLesson(lessonId) {
    try {
      await api(`/lessons/${id}/${lessonId}/complete`, { method: "POST" });
      setProgress((items) =>
        items.includes(lessonId) ? items : [...items, lessonId],
      );
    } catch (reason) {
      setError(reason.message);
    }
  }

  if (!course && !error) return <Loader label="Opening your course" />;
  if (!course)
    return (
      <div className="detail-error">
        <p>{error}</p>
        <Link to="/courses" className="text-link">
          <ArrowLeft size={15} /> Back to courses
        </Link>
      </div>
    );

  return (
    <article className="course-detail-page">
      <Link className="back-link" to="/courses">
        <ArrowLeft size={15} /> All courses
      </Link>
      <section className="detail-hero">
        <div className="detail-hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> {course.category} / {course.level}
          </span>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="detail-byline">
            <span className="detail-avatar">
              {course.instructor?.name?.slice(0, 1) || "L"}
            </span>
            <span>
              Made with care by{" "}
              <strong>{course.instructor?.name || "Your instructor"}</strong>
            </span>
          </div>
          <div className="detail-actions">
            {enrolled ? (
              <span className="enrolled-badge">
                <Check size={16} /> You’re enrolled
              </span>
            ) : (
              <button
                className="button button-dark"
                disabled={busy}
                onClick={enroll}
              >
                {busy ? "Joining..." : "Join this course"}{" "}
                <ArrowUpRight size={16} />
              </button>
            )}
            <span className="detail-duration">
              <Clock3 size={15} /> {course.lessons?.length || 0} short lessons
            </span>
          </div>
          {error && <p className="inline-error">{error}</p>}
        </div>
        <div
          className="detail-image"
          style={{
            backgroundImage: course.thumbnailUrl
              ? `url("${course.thumbnailUrl}")`
              : undefined,
          }}
        >
          <div className="detail-image-inner">
            <span className="detail-image-icon">
              <Sparkles size={24} />
            </span>
            <span>
              {course.category}
              <br />
              <small>Make it yours.</small>
            </span>
          </div>
        </div>
      </section>
      <section className="lesson-section">
        <div className="lesson-intro">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> YOUR LEARNING PATH
          </span>
          <h2>
            One little step
            <br />
            at a <span className="serif-word">time.</span>
          </h2>
          <p>Every lesson is a small move toward something bigger.</p>
        </div>
        <div className="lesson-list">
          {course.lessons?.length ? (
            course.lessons.map((lesson, index) => {
              const done = progress.some((item) => String(item) === lesson._id);
              return (
                <div className="lesson-row" key={lesson._id}>
                  <span
                    className={
                      done ? "lesson-number lesson-done" : "lesson-number"
                    }
                  >
                    {done ? (
                      <Check size={15} />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <div className="lesson-row-main">
                    <h3>{lesson.title}</h3>
                    <p>
                      {lesson.description ||
                        "A short lesson to help you keep moving."}
                    </p>
                  </div>
                  {enrolled ? (
                    <div className="lesson-row-actions">
                      {isSecureVideoUrl(lesson.videoUrl) && (
                        <a
                          className="lesson-play"
                          href={lesson.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Watch ${lesson.title}`}
                        >
                          <CirclePlay size={19} />
                        </a>
                      )}
                      <button
                        className={done ? "lesson-mark done" : "lesson-mark"}
                        onClick={() => completeLesson(lesson._id)}
                      >
                        {done ? "Completed" : "Mark complete"}
                      </button>
                    </div>
                  ) : (
                    <LockKeyhole className="lesson-lock" size={17} />
                  )}
                </div>
              );
            })
          ) : (
            <div className="empty-note">
              Lessons will appear here when the instructor adds them.
            </div>
          )}
        </div>
      </section>
      {enrolled && course.quiz?.length > 0 && (
        <Quiz courseId={id} questions={course.quiz} />
      )}
    </article>
  );
}

function Quiz({ courseId, questions }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    try {
      const response = await api(`/quizzes/${courseId}/submit`, {
        method: "POST",
        body: {
          answers: questions.map((question) => answers[question._id] ?? -1),
        },
      });
      setResult(response);
      setError("");
    } catch (reason) {
      setError(reason.message);
    }
  }
  return (
    <section className="quiz-section">
      <span className="eyebrow">
        <span className="eyebrow-dot" /> QUICK CHECK-IN
      </span>
      <h2>
        See what <span className="serif-word">stuck.</span>
      </h2>
      <form onSubmit={submit}>
        {questions.map((question, index) => (
          <fieldset className="quiz-question" key={question._id}>
            <legend>
              {String(index + 1).padStart(2, "0")} &nbsp; {question.prompt}
            </legend>
            {question.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={
                  answers[question._id] === optionIndex
                    ? "quiz-option active"
                    : "quiz-option"
                }
              >
                <input
                  type="radio"
                  name={question._id}
                  checked={answers[question._id] === optionIndex}
                  onChange={() =>
                    setAnswers((current) => ({
                      ...current,
                      [question._id]: optionIndex,
                    }))
                  }
                />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>
        ))}
        <button className="button button-dark">
          Check my answers <ArrowUpRight size={16} />
        </button>
      </form>
      {error && <p className="inline-error">{error}</p>}
      {result && (
        <p className="quiz-result">
          <Check size={17} /> You got {result.correct} of {result.total} — a
          lovely {result.score}%.
        </p>
      )}
    </section>
  );
}
