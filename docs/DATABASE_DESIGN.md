# Data model

LearnHub uses MongoDB documents and Mongoose validation.

- **User** — name, normalized unique email, password hash (excluded from query results), role (`student`, `instructor`, `admin`), and course enrollments.
- **Enrollment** — referenced course, completed lesson IDs, best quiz score, and enrollment date. Embedded in the learner's user document so a learner's progress can be updated together.
- **Course** — title, description, category, level, instructor reference, publication status, ordered lessons, and quiz questions.
- **Lesson** — title, description, optional video URL, and order. Lesson access is checked through enrollment or instructor/admin ownership.
- **Quiz question** — prompt, answer options, and correct option index. Public course responses omit correct indexes; the server computes submitted scores.

Authentication and access checks happen in Express middleware/controllers. MongoDB secrets and JWT signing keys are configured in environment variables.
