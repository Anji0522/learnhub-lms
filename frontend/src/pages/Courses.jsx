import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CourseCard from "../components/CourseCard.jsx";
import Loader from "../components/Loader.jsx";
import { mernCurriculum } from "../data/mernCurriculum.js";
import { api } from "../services/api.js";

export default function Courses() {
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All topics");
  const [query, setQuery] = useState(searchParam);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);

  const showLearningPath = Boolean(error) || (!loading && courses.length === 0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    api("/courses")
      .then(({ courses: items }) => {
        if (active) {
          setCourses(items);
        }
      })
      .catch((reason) => {
        if (active) {
          setError(reason.message);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [reloadCount]);

  useEffect(() => {
    setQuery(searchParam);
  }, [searchParam]);

  const categories = useMemo(
    () => [
      "All topics",
      ...(showLearningPath
        ? mernCurriculum.map((module) => module.title.split(":")[0])
        : [
            ...new Set(
              courses
                .map((course) => course.category?.trim())
                .filter(Boolean)
                .sort((first, second) => first.localeCompare(second)),
            ),
          ]),
    ],
    [courses, showLearningPath],
  );

  useEffect(() => {
    if (!categories.includes(category)) {
      setCategory("All topics");
    }
  }, [categories, category]);

  const filteredModules = useMemo(() => {
    const search = query.trim().toLowerCase();

    return mernCurriculum.filter((module) => {
      const topic = module.title.split(":")[0];
      const matchesCategory =
        category === "All topics" ||
        topic.toLowerCase() === category.toLowerCase();
      const searchableContent = [
        module.title,
        module.summary,
        ...module.lessons.flatMap((lesson) => [
          lesson.title,
          lesson.notes,
          lesson.practice,
        ]),
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!search || searchableContent.includes(search));
    });
  }, [category, query]);

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
            placeholder={
              showLearningPath
                ? "Search skills and lessons..."
                : "Search courses..."
            }
            aria-label={
              showLearningPath ? "Search skills and lessons" : "Search courses"
            }
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
      ) : showLearningPath ? (
        <section
          aria-labelledby="learning-catalog-title"
          className="learning-catalog"
        >
          <div className="learning-catalog-heading">
            <div>
              <span className="eyebrow">
                <GraduationCap aria-hidden="true" size={15} />
                BEGINNER-FRIENDLY LEARNING PATH
              </span>
              <h2 id="learning-catalog-title">
                Learn web development from the ground up.
              </h2>
              <p>
                Explore {mernCurriculum.length} skill areas and{" "}
                {mernCurriculum.reduce(
                  (total, module) => total + module.lessons.length,
                  0,
                )}{" "}
                guided lessons, from HTML and CSS through the MERN stack. Each
                topic includes simple notes, examples, practice, and learning
                resources.
              </p>
            </div>
            {error && (
              <button
                className="button button-outline"
                onClick={() => setReloadCount((count) => count + 1)}
                type="button"
              >
                Refresh catalog
              </button>
            )}
          </div>

          {filteredModules.length > 0 ? (
            <div className="learning-module-grid">
              {filteredModules.map((module) => {
                const moduleIndex = mernCurriculum.indexOf(module);
                const topic = module.title.split(":")[0];

                return (
                  <article className="learning-module-card" key={module.id}>
                    <div className="learning-module-card-heading">
                      <span className="learning-module-number">
                        {String(moduleIndex + 1).padStart(2, "0")}
                      </span>
                      <span>{topic}</span>
                    </div>
                    <h3>{module.title.split(":").slice(1).join(":").trim()}</h3>
                    <p>{module.summary}</p>
                    <ul>
                      {module.lessons.map((lesson) => (
                        <li key={lesson.title}>
                          <BookOpen aria-hidden="true" size={14} />
                          {lesson.title}
                        </li>
                      ))}
                    </ul>
                    <div className="learning-module-card-footer">
                      <span>{module.lessons.length} guided lessons</span>
                      <Link to={`/learn/mern?module=${module.id}`}>
                        Start learning{" "}
                        <ArrowRight aria-hidden="true" size={15} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-note">
              No skills or lessons match your search.
            </div>
          )}
        </section>
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
          {courses.length === 0
            ? "No published courses are available yet."
            : "No courses match your search or selected topic."}
        </div>
      )}
    </section>
  );
}
