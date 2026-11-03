import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CirclePlay,
  ExternalLink,
  GraduationCap,
  Terminal,
} from "lucide-react";
import CodePlayground from "../components/CodePlayground.jsx";
import { mernCurriculum } from "../data/mernCurriculum.js";
import "../styles/learning-path.css";

export default function LearningPath() {
  const [activeModuleId, setActiveModuleId] = useState(mernCurriculum[0].id);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(() => new Set());

  const activeModule = useMemo(
    () => mernCurriculum.find((module) => module.id === activeModuleId),
    [activeModuleId],
  );
  const activeLesson = activeModule.lessons[activeLessonIndex];
  const totalLessons = mernCurriculum.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );
  const progressPercent = Math.round(
    (completedLessons.size / totalLessons) * 100,
  );

  function selectLesson(moduleId, lessonIndex) {
    setActiveModuleId(moduleId);
    setActiveLessonIndex(lessonIndex);
  }

  function markLessonComplete() {
    const lessonKey = `${activeModuleId}-${activeLessonIndex}`;
    setCompletedLessons((current) => {
      const updated = new Set(current);
      updated.add(lessonKey);
      return updated;
    });
  }

  const currentLessonKey = `${activeModuleId}-${activeLessonIndex}`;
  const currentLessonCompleted = completedLessons.has(currentLessonKey);

  return (
    <div className="learning-path-page">
      <section className="learning-path-hero">
        <span className="eyebrow">
          <GraduationCap aria-hidden="true" size={15} />
          YOUR BEGINNER-FRIENDLY ROADMAP
        </span>
        <h1>
          From first tag
          <br />
          to <span className="serif-word">full stack.</span>
        </h1>
        <p>
          Learn the web one small step at a time: HTML, CSS, JavaScript,
          Bootstrap, Node.js, Express, React, and MongoDB.
        </p>
        <div className="learning-path-progress">
          <span>
            {completedLessons.size} of {totalLessons} lessons marked complete
          </span>
          <div
            aria-label={`${progressPercent}% of lessons marked complete`}
            className="learning-progress-track"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </section>

      <div className="learning-path-layout">
        <aside
          aria-label="MERN learning curriculum"
          className="curriculum-rail"
        >
          <div className="curriculum-rail-heading">
            <BookOpen size={17} />
            <span>THE LEARNING PATH</span>
          </div>
          {mernCurriculum.map((module, moduleIndex) => {
            const isActive = module.id === activeModuleId;
            const isModuleComplete = module.lessons.every((_, lessonIndex) =>
              completedLessons.has(`${module.id}-${lessonIndex}`),
            );

            return (
              <section className="curriculum-module" key={module.id}>
                <button
                  aria-expanded={isActive}
                  className={
                    isActive
                      ? "curriculum-module-button active"
                      : "curriculum-module-button"
                  }
                  onClick={() => selectLesson(module.id, 0)}
                  type="button"
                >
                  <span className="curriculum-module-number">
                    {isModuleComplete ? <Check size={14} /> : moduleIndex + 1}
                  </span>
                  <span>{module.title.split(":")[0]}</span>
                  <ChevronDown size={15} />
                </button>
                {isActive && (
                  <div className="curriculum-lesson-list">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const lessonKey = `${module.id}-${lessonIndex}`;
                      const selected = lessonIndex === activeLessonIndex;

                      return (
                        <button
                          aria-current={selected ? "step" : undefined}
                          className={
                            selected
                              ? "curriculum-lesson active"
                              : "curriculum-lesson"
                          }
                          key={lesson.title}
                          onClick={() => selectLesson(module.id, lessonIndex)}
                          type="button"
                        >
                          <span className="curriculum-lesson-status">
                            {completedLessons.has(lessonKey) ? (
                              <Check size={13} />
                            ) : (
                              <CirclePlay size={13} />
                            )}
                          </span>
                          <span>{lesson.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </aside>

        <main className="learning-lesson">
          <div className="lesson-breadcrumb">
            <span>{activeModule.title}</span>
            <span aria-hidden="true">/</span>
            <span>{activeLesson.time}</span>
          </div>
          <h2>{activeLesson.title}</h2>
          <p className="lesson-notes">{activeLesson.notes}</p>

          <section className="lesson-example">
            <div className="lesson-example-heading">
              <span>SMALL EXAMPLE</span>
              <span>Read it, then try changing it below</span>
            </div>
            <pre>
              <code>{activeLesson.example}</code>
            </pre>
          </section>

          <div className="learning-resource-row">
            <a
              className="learning-resource-card"
              href={activeModule.videoSearch}
              rel="noreferrer"
              target="_blank"
            >
              <span className="learning-resource-icon">
                <CirclePlay size={19} />
              </span>
              <span>
                <strong>Watch video lessons</strong>
                <small>Open beginner tutorials on YouTube</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
            {activeModule.documentation.map((resource) => (
              <a
                className="learning-resource-card"
                href={resource.url}
                key={resource.url}
                rel="noreferrer"
                target="_blank"
              >
                <span className="learning-resource-icon">
                  <ExternalLink size={17} />
                </span>
                <span>
                  <strong>{resource.label}</strong>
                  <small>Official learning resource</small>
                </span>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>

          <CodePlayground practicePrompt={activeLesson.practice} />

          <section
            aria-labelledby="server-practice-title"
            className="practice-links"
          >
            <div>
              <span className="learning-resource-icon">
                <Terminal size={18} />
              </span>
              <span>
                <strong id="server-practice-title">
                  Ready for server-side practice?
                </strong>
                <small>
                  Use these external tools for Node.js and database exercises.
                </small>
              </span>
            </div>
            <a href="https://stackblitz.com/" rel="noreferrer" target="_blank">
              Open StackBlitz <ArrowUpRight size={14} />
            </a>
            <a
              href="https://mongoplayground.net/"
              rel="noreferrer"
              target="_blank"
            >
              Open MongoDB Playground <ArrowUpRight size={14} />
            </a>
          </section>

          <div className="lesson-complete-row">
            <p>
              {currentLessonCompleted
                ? "Nice work. This lesson is marked complete."
                : "Finished the lesson? Mark it complete to track your progress on this page."}
            </p>
            <button
              className="button button-dark"
              disabled={currentLessonCompleted}
              onClick={markLessonComplete}
              type="button"
            >
              <Check size={16} />
              {currentLessonCompleted ? "Completed" : "Mark complete"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
