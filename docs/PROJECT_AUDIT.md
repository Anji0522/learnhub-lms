# LearnHub project audit

## Summary

LearnHub is a JavaScript MERN application: React/Vite, Express, and
MongoDB/Mongoose. It has working code for student registration and login,
course authoring and enrollment, lesson progress, quizzes, and a small
administrator dashboard. This audit describes the repository as it exists;
it does not treat planned or requested features as implemented.

The supplied project brief also asks for MySQL, SQL schema and migrations.
That conflicts with the earlier instruction to use the MERN stack and with
the current application. The repository documentation explicitly specifies
MongoDB. This audit preserves MongoDB and does not introduce a second
database or claim a MySQL implementation.

## Original MySQL requirement differences

| Original requirement                                             | Current implementation                                                                                                                                                                            |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Axios for frontend HTTP requests                                 | The shared API client uses the browser's native `fetch`; Axios is not a dependency.                                                                                                               |
| MySQL as the production and development database                 | MongoDB through Mongoose. No MySQL driver, connection, or server configuration exists.                                                                                                            |
| Relational SQL schema in `database/schema.sql`                   | No SQL schema. User and course documents are declared in `backend/models/User.js` and `backend/models/Course.js`.                                                                                 |
| SQL seed script in `database/seed.sql`                           | No SQL seed file. Optional sample courses are inserted by `backend/database/seed.js` into MongoDB.                                                                                                |
| SQL migrations under `database/migrations/`                      | No SQL migration system or migration files.                                                                                                                                                       |
| Relational tables, foreign keys, joins, and cascades             | Users and courses are MongoDB collections. Enrollments are embedded in user documents; lessons and quiz questions are embedded in course documents and reference validation is application-level. |
| SQL constraints and indexes                                      | Mongoose schema validation is used; email is marked unique. There are no foreign keys or relational constraints. Existing production index creation has not been verified.                        |
| SQL transaction consistency and duplicate-enrollment constraints | No transaction is used. Enrollment is checked in application code. Course deletion and removal of user enrollment references are separate parallel operations.                                    |
| Persist quiz attempts/results and certificates                   | Only the best quiz score is stored on the enrollment. Individual attempts and certificate records are not implemented.                                                                            |
| Jest/Supertest, Vitest/Testing Library, and Playwright coverage  | Backend tests use Node's built-in runner and `fetch`; there is no configured frontend component or browser test framework.                                                                        |
| Managed hosted MySQL in production                               | No production database is provisioned. The deployment guide is prepared for MongoDB Atlas, not MySQL.                                                                                             |
| SQL injection and parameterized-query verification               | No SQL queries exist in this codebase. MongoDB query inputs and Mongoose operations are used instead; SQL injection tests do not apply.                                                           |

## Architecture and data

- `frontend/`: React 18 and Vite application, React Router, shared API client,
  role-aware dashboard, and responsive light/dark theme.
- `backend/`: Express API, Mongoose models, JWT authentication in an HTTP-only
  cookie, role middleware, controllers, and Node's built-in test runner.
- `database/README.md` and `backend/database/seed.js`: MongoDB setup and
  idempotent sample-course seed procedure.
- `docs/`: API, architecture, data model, and deployment documentation.
- Data is in MongoDB collections using Mongoose schemas. There is no MySQL
  connection, SQL schema, or SQL migration system.

## Implemented API surface

| Area                 | Routes                                                                                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Health               | `GET /api/health`                                                                                                                                                           |
| Authentication       | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`                                                                              |
| Courses              | `GET /api/courses`, `GET /api/courses/mine`, `POST /api/courses`, `GET /api/courses/:id`, `PUT /api/courses/:id`, `DELETE /api/courses/:id`, `POST /api/courses/:id/enroll` |
| Lessons              | `GET /api/lessons/:courseId`, `POST /api/lessons/:courseId/:lessonId/complete`                                                                                              |
| Quizzes and progress | `POST /api/quizzes/:courseId/submit`, `GET /api/quizzes/progress`                                                                                                           |
| Administration       | `GET /api/admin/dashboard`                                                                                                                                                  |

Course list responses are capped at 100 records and are not paginated.
Lessons and quizzes are embedded in course documents and edited through the
course update endpoint. Public course responses omit lesson video URLs and
quiz answer keys.

## Requested features not present

The following are not implemented in the inspected code and should not be
presented as available:

- MySQL schema, migrations, or a MySQL connection; see the comparison above.
- Course category management endpoints; categories are course text fields.
- Reviews/ratings, certificates, payment/revenue processing, or notifications.
- File upload support or upload middleware.
- Course approval workflow and pending-approval metrics.
- Admin user management or an instructor-facing student roster/analytics API.
- Password reset, email verification, and self-service role changes.
- Pagination for course lists.
- Automated frontend component tests or database-backed end-to-end tests.

Public registration creates student accounts. Promoting an account to an
instructor or administrator currently requires a trusted direct database
update.

## Original endpoint requirements not implemented

The original MySQL-oriented brief listed additional routes. The implemented
routes are enumerated earlier in this report and in
[API_DOCUMENTATION.md](./API_DOCUMENTATION.md). In particular:

- The requested `GET /api/my-courses` is instead `GET /api/courses/mine`.
- No `POST /api/courses/:id/reviews` route exists.
- No instructor dashboard, student-list, or analytics routes exist.
- No admin user-management or course-management/approval routes exist beyond
  `GET /api/admin/dashboard`.
- Certificate, file-download, and resource-upload routes do not exist.
- No separate `GET /api/quizzes/:courseId` route exists; quiz questions are
  included in course details without answer keys and are submitted to
  `POST /api/quizzes/:courseId/submit`.

## Security and reliability notes

- Authentication passwords are hashed with bcrypt; JWTs are stored in an
  HTTP-only cookie and the server requires a configured signing secret.
- Helmet, a configured CORS origin, request-body size limits, and rate
  limiting on authentication routes are enabled.
- The security review found an unsafe lesson video URL rendering issue. The
  issue is fixed: the Mongoose lesson schema validates HTTPS URLs and the
  frontend validates before rendering lesson links. Details and regression
  coverage are in [SECURITY_AUDIT.md](./SECURITY_AUDIT.md).
- JWT logout clears the browser cookie but does not revoke a copied token;
  stateless tokens can remain valid until their seven-day expiry.
- The database cleanup after course deletion and user enrollment updates are
  separate operations, not a transaction. No transactional behavior is
  claimed.

## Environment and release blockers

- No local `.env`, configured `MONGODB_URI`, or production database connection
  is available in this environment. The backend requires MongoDB and a
  `JWT_SECRET` to start.
- Vercel/Render configuration is preparation only. The API hostname in
  `vercel.json` must be checked against the actual Render-assigned hostname
  before frontend deployment. No verified hosting deployment or live demo URL
  is available.
- The existing test suite does not connect to MongoDB. Full authentication,
  persistence, and deployment smoke tests therefore remain outstanding.
- A GitHub Actions workflow now runs formatting, backend tests, and the
  frontend production build. It does not claim database integration coverage.

## Audit outcome

The current application is suitable for local development with a configured
MongoDB instance, but it is not a verified production release. Resolve the
database/hosting setup and decide which missing features are in scope before
describing the broader roadmap as complete.
