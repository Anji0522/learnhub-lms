import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CourseCard from "../components/CourseCard.jsx";
import Loader from "../components/Loader.jsx";
import { api } from "../services/api.js";

const categories = [
  "All topics",
  "Design",
  "Technology",
  "Business",
  "Wellness",
  "Photography",
  "Writing",
];

export default function Courses() {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All topics");
  const [query, setQuery] = useState(() => searchParams.get("search") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/courses")
      .then(({ courses: items }) => setCourses(items))
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      courses.filter((course) => {
        const matchesCategory =
          category === "All topics" ||
          course.category?.toLowerCase() === category.toLowerCase();
        const search = query.trim().toLowerCase();
        return (
          matchesCategory &&
          (!search ||
            `${course.title} ${course.description} ${course.category}`
              .toLowerCase()
              .includes(search))
        );
      }),
    [courses, category, query],
  );

  return (
    <section className="catalog-page">
      <div className="catalog-hero">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> THE COURSE SHELF
        </span>
        <h1>
          A good place
          <br />
          to <span className="serif-word">begin.</span>
        </h1>
        <p>
          Little sparks, big ideas, useful things you’ll actually use. Find one
          that feels like yours.
        </p>
        <div className="catalog-doodle">✳</div>
      </div>
      <div className="catalog-toolbar">
        <div className="catalog-filter-label">
          <SlidersHorizontal size={15} />
          <span>Find your kind of thing</span>
        </div>
        <div className="catalog-search">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses..."
            aria-label="Search courses"
          />
        </div>
      </div>
      <div className="category-pills">
        {categories.map((item) => (
          <button
            key={item}
            className={
              category === item ? "category-pill selected" : "category-pill"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {loading ? (
        <Loader label="Finding your next course" />
      ) : error ? (
        <div className="empty-note">
          {error}. Please check the API and database connection.
        </div>
      ) : filtered.length ? (
        <>
          <div className="catalog-result-row">
            <span>
              {filtered.length}{" "}
              {filtered.length === 1 ? "good place" : "good places"} to start
            </span>
            <span>
              TAKE YOUR PICK <ArrowRight size={13} />
            </span>
          </div>
          <div className="course-grid catalog-grid">
            {filtered.map((course, index) => (
              <CourseCard key={course._id} course={course} index={index} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-note">
          Nothing on this shelf just yet. Try another search or topic.
        </div>
      )}
    </section>
  );
}
