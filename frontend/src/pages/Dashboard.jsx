import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChartNoAxesCombined,
  Check,
  CirclePlay,
  Compass,
  Plus,
  Sparkles,
  UsersRound,
  Users,
} from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard.jsx";
import Loader from "../components/Loader.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";

const ProgressChart = lazy(() => import("../components/ProgressChart.jsx"));

export default function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);

  async function refreshInstructorCourses() {
    const { courses: currentCourses } = await api("/courses/mine");
    setCourses(currentCourses);
    setCreated(true);
  }

  useEffect(() => {
    const request =
      user?.role === "admin"
        ? api("/admin/dashboard").then(({ stats: data }) => setStats(data))
        : user?.role === "instructor"
          ? api("/courses/mine").then(({ courses: data }) => setCourses(data))
          : api("/quizzes/progress").then(({ progress: data }) =>
              setProgress(data),
            );
    request
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <Loader label="Opening your learning space" />;
  const firstName = user?.name?.split(" ")[0] || "friend";
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <header className="dashboard-greeting">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" /> YOUR OWN LITTLE CORNER
            </span>
            <h1>
              Good to have
              <br />
              you, <span className="serif-word">{firstName}.</span>
            </h1>
            <p>A little progress is still progress. Here’s where you are.</p>
          </div>
          <div className="greeting-decoration">✳</div>
        </header>
        {error && <p className="inline-error">{error}</p>}
        {user?.role === "admin" ? (
          <AdminOverview stats={stats} />
        ) : user?.role === "instructor" ? (
          <InstructorOverview
            courses={courses}
            onCreated={refreshInstructorCourses}
            created={created}
          />
        ) : (
          <StudentOverview progress={progress} />
        )}
      </main>
    </div>
  );
}

function StudentOverview({ progress }) {
  const completed = progress.filter((item) => item.percent === 100).length;
  const averageProgress = progress.length
    ? Math.round(
        progress.reduce((total, item) => total + item.percent, 0) /
          progress.length,
      )
    : 0;
  const progressChart = progress.slice(0, 6).map((item) => ({
    name: item.title,
    progress: item.percent,
  }));

  return (
    <>
      <div className="stat-grid student-stat-grid">
        <div className="stat-card">
          <span>ENROLLED COURSES</span>
          <strong>{progress.length}</strong>
          <small>courses in your learning plan</small>
          <BookOpen size={18} />
        </div>
        <div className="stat-card stat-card-lavender">
          <span>COMPLETED COURSES</span>
          <strong>{completed}</strong>
          <small>courses completed</small>
          <Check size={18} />
        </div>
        <div className="stat-card stat-card-teal">
          <span>LEARNING HOURS</span>
          <strong>—</strong>
          <small>lesson timing is not tracked yet</small>
          <ChartNoAxesCombined size={18} />
        </div>
        <div className="stat-card stat-card-success">
          <span>CURRENT PROGRESS</span>
          <strong>{averageProgress}%</strong>
          <small>average across enrolled courses</small>
          <Compass size={18} />
        </div>
      </div>
      <section className="dashboard-section" id="my-learning">
        <div className="dashboard-section-title">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" /> YOUR LEARNING PATH
            </span>
            <h2>
              Keep your <span className="serif-word">rhythm.</span>
            </h2>
          </div>
          <Link to="/courses" className="text-link">
            Find another course <ArrowRight size={14} />
          </Link>
        </div>
        {progressChart.length > 0 && (
          <Suspense fallback={<Loader label="Loading learning analytics" />}>
            <ProgressChart data={progressChart} />
          </Suspense>
        )}
        {progress.length ? (
          <div className="progress-list">
            {progress.map((item) => (
              <Link
                className="progress-row"
                key={item.courseId}
                to={`/courses/${item.courseId}`}
              >
                <span className="progress-course-icon">
                  <BookOpen size={18} />
                </span>
                <span className="progress-name">
                  <strong>{item.title}</strong>
                  <small>
                    {item.completedLessons} of {item.totalLessons} lessons
                  </small>
                </span>
                <span className="progress-bar">
                  <i style={{ width: `${item.percent}%` }} />
                </span>
                <span className="progress-percent">{item.percent}%</span>
                <CirclePlay size={19} className="progress-play" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="dashboard-empty">
            <span className="empty-spark">✳</span>
            <h3>Your next favorite thing is out there.</h3>
            <p>Pick a course and make a little room for something new.</p>
            <Link className="button button-dark" to="/courses">
              Explore courses <ArrowUpRight size={15} />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

function InstructorOverview({ courses, onCreated, created }) {
  const courseChart = courses.slice(0, 6).map((course) => ({
    name: course.title,
    lessons: course.lessons?.length ?? 0,
  }));

  return (
    <>
      <div className="stat-grid instructor-stat-grid">
        <div className="stat-card">
          <span>TOTAL COURSES</span>
          <strong>{courses.length}</strong>
          <small>courses you’re teaching</small>
          <BookOpen size={18} />
        </div>
        <div className="stat-card stat-card-lavender">
          <span>TOTAL STUDENTS</span>
          <strong>—</strong>
          <small>enrollment counts are not provided</small>
          <UsersRound size={18} />
        </div>
        <div className="stat-card stat-card-teal">
          <span>COURSE RATINGS</span>
          <strong>—</strong>
          <small>ratings are not tracked yet</small>
          <Sparkles size={18} />
        </div>
      </div>
      <section className="dashboard-section" id="my-courses">
        <div className="dashboard-section-title">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" /> YOUR STUDIO
            </span>
            <h2>
              Things you’re <span className="serif-word">making.</span>
            </h2>
          </div>
        </div>
        <CourseCreator onCreated={onCreated} />
        {created && (
          <p className="success-note">
            <Check size={16} /> Your course is live on the shelf.
          </p>
        )}
        {courseChart.length > 0 && (
          <Suspense fallback={<Loader label="Loading course analytics" />}>
            <ProgressChart
              data={courseChart.map((course) => ({
                name: course.name,
                progress: course.lessons,
              }))}
              title="Lessons in your courses"
              valueLabel="Lessons"
            />
          </Suspense>
        )}
        {courses.length ? (
          <div className="course-grid">
            {courses.map((item, index) => (
              <CourseCard key={item._id} course={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="dashboard-empty">
            <h3>Your studio is a blank canvas.</h3>
            <p>Add your first course and share what you know.</p>
          </div>
        )}
      </section>
    </>
  );
}

function CourseCreator({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const firstLesson = form.get("lesson").trim();
    try {
      await api("/courses", {
        method: "POST",
        body: {
          title: form.get("title"),
          category: form.get("category"),
          level: form.get("level"),
          description: form.get("description"),
          lessons: firstLesson ? [{ title: firstLesson, order: 0 }] : [],
        },
      });
      formElement.reset();
      setOpen(false);
      onCreated();
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="creator-box">
      <button className="creator-toggle" onClick={() => setOpen(!open)}>
        <span>
          <Plus size={17} /> Create a course
        </span>
        <span>{open ? "Close" : "Start sharing"}</span>
      </button>
      {open && (
        <form className="creator-form" onSubmit={submit}>
          <div className="creator-fields">
            <label>
              Course title
              <input
                name="title"
                required
                maxLength="160"
                placeholder="A skill worth sharing"
              />
            </label>
            <label>
              Category
              <input
                name="category"
                required
                maxLength="80"
                placeholder="Design, writing..."
              />
            </label>
            <label>
              Level
              <select name="level">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
            <label>
              First lesson
              <input name="lesson" maxLength="160" placeholder="Optional" />
            </label>
          </div>
          <label>
            Course description
            <textarea
              name="description"
              rows="3"
              maxLength="5000"
              required
              placeholder="What will learners take away?"
            />
          </label>
          {error && <p className="inline-error">{error}</p>}
          <button className="button button-dark" disabled={busy}>
            {busy ? "Saving..." : "Publish course"} <ArrowUpRight size={15} />
          </button>
        </form>
      )}
    </div>
  );
}

function AdminOverview({ stats }) {
  const chartData = [
    { name: "Students", value: stats?.students ?? 0 },
    { name: "Instructors", value: stats?.instructors ?? 0 },
    { name: "Courses", value: stats?.courses ?? 0 },
    { name: "Enrollments", value: stats?.enrollments ?? 0 },
  ];

  return (
    <>
      <div className="stat-grid admin-stat-grid">
        <div className="stat-card">
          <span>TOTAL USERS</span>
          <strong>—</strong>
          <small>not provided by the current API</small>
          <UsersRound size={18} />
        </div>
        <div className="stat-card">
          <span>TOTAL STUDENTS</span>
          <strong>{stats?.students ?? "—"}</strong>
          <small>registered student accounts</small>
          <BookOpen size={18} />
        </div>
        <div className="stat-card stat-card-lavender">
          <span>TOTAL INSTRUCTORS</span>
          <strong>{stats?.instructors ?? "—"}</strong>
          <small>instructor accounts</small>
          <Users size={18} />
        </div>
        <div className="stat-card stat-card-teal">
          <span>TOTAL COURSES</span>
          <strong>{stats?.courses ?? "—"}</strong>
          <small>courses on the platform</small>
          <BookOpen size={18} />
        </div>
        <div className="stat-card stat-card-success">
          <span>PENDING APPROVALS</span>
          <strong>—</strong>
          <small>approval status is not tracked</small>
          <Check size={18} />
        </div>
      </div>
      <section className="dashboard-section" id="admin-overview">
        <div className="dashboard-section-title">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" /> PLATFORM OVERVIEW
            </span>
            <h2>
              Room to <span className="serif-word">grow.</span>
            </h2>
          </div>
          <Link to="/courses" className="text-link">
            Browse courses <ArrowRight size={14} />
          </Link>
        </div>
        <Suspense fallback={<Loader label="Loading platform analytics" />}>
          <ProgressChart
            data={chartData.map((item) => ({
              name: item.name,
              progress: item.value,
            }))}
            title="Platform activity"
            valueLabel="Count"
          />
        </Suspense>
        <div className="dashboard-empty">
          <h3>Good things are growing here.</h3>
          <p>Check back as more learners and instructors join the community.</p>
          <Link to="/courses" className="button button-dark">
            Visit the course shelf <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
