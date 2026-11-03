import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CirclePlay,
  Compass,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard.jsx";
import Loader from "../components/Loader.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";

export default function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);

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
            onCreated={() => setCreated(true)}
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
  return (
    <>
      <div className="stat-grid">
        <div className="stat-card">
          <span>ON YOUR SHELF</span>
          <strong>{progress.length.toString().padStart(2, "0")}</strong>
          <small>courses you’ve joined</small>
          <BookOpen size={18} />
        </div>
        <div className="stat-card stat-card-lavender">
          <span>LITTLE WINS</span>
          <strong>{completed.toString().padStart(2, "0")}</strong>
          <small>courses completed</small>
          <Sparkles size={18} />
        </div>
        <Link className="stat-card stat-card-peach" to="/courses">
          <span>WHAT’S NEXT?</span>
          <strong className="stat-text">
            Find it <ArrowUpRight size={20} />
          </strong>
          <small>There’s something for you</small>
          <Compass size={18} />
        </Link>
      </div>
      <section className="dashboard-section">
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
  return (
    <>
      <div className="stat-grid">
        <div className="stat-card">
          <span>ON YOUR SHELF</span>
          <strong>{courses.length.toString().padStart(2, "0")}</strong>
          <small>courses you’re teaching</small>
          <BookOpen size={18} />
        </div>
        <div className="stat-card stat-card-lavender">
          <span>MAKE SOME SPACE</span>
          <strong className="stat-text">
            Share it <Sparkles size={19} />
          </strong>
          <small>for your next great idea</small>
        </div>
      </div>
      <section className="dashboard-section">
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
        <CourseCreator
          onCreated={async () => {
            const { courses: items } = await api("/courses/mine");
            setCourses(items);
            onCreated();
          }}
        />
        {created && (
          <p className="success-note">
            <Check size={16} /> Your course is live on the shelf.
          </p>
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
    const form = new FormData(event.currentTarget);
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
      event.currentTarget.reset();
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
  return (
    <>
      <div className="stat-grid">
        <div className="stat-card">
          <span>LEARNERS</span>
          <strong>{stats?.students ?? "—"}</strong>
          <small>students finding their way</small>
          <BookOpen size={18} />
        </div>
        <div className="stat-card stat-card-lavender">
          <span>TEACHERS</span>
          <strong>{stats?.instructors ?? "—"}</strong>
          <small>instructors sharing skills</small>
          <Users size={18} />
        </div>
        <div className="stat-card stat-card-peach">
          <span>COURSE SHELF</span>
          <strong>{stats?.courses ?? "—"}</strong>
          <small>courses available</small>
          <Sparkles size={18} />
        </div>
        <div className="stat-card stat-card-mint">
          <span>ENROLLMENTS</span>
          <strong>{stats?.enrollments ?? "—"}</strong>
          <small>learning journeys started</small>
          <Check size={18} />
        </div>
      </div>
      <section className="dashboard-section">
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
