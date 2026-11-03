# LearnHub - Online Learning Management System

## Live Demo and Repository

- **Full-stack live demo:** Not deployed. Render and MongoDB Atlas are not
  provisioned for this project yet.
- **Static curriculum preview (pending activation):**
  [https://anji0522.github.io/learnhub-lms/](https://anji0522.github.io/learnhub-lms/)
  is not live yet because GitHub Pages has not been enabled in repository
  settings. This preview will not include API-backed authentication, courses,
  or student data.
- **GitHub:** [Anji0522/learnhub-lms](https://github.com/Anji0522/learnhub-lms)

## Project Overview

LearnHub is a JavaScript learning platform with a React client and an Express
API. It currently supports student registration and login, instructor course
management, enrollment, lesson progress, quizzes, and a basic admin dashboard.
It uses MongoDB through Mongoose. It does not currently use MySQL.

## Current Technology Stack

- React 18, JavaScript, Vite, React Router, Context API
- Node.js, Express 4, JavaScript
- MongoDB and Mongoose
- JWT in an HTTP-only cookie and bcrypt password hashing
- Recharts, Lucide React, and CSS
- Node.js built-in test runner, Prettier, and GitHub Actions

## Current Features

- Student registration, login, logout, and current-user session lookup
- Role-protected instructor and administrator actions
- Public course browsing and search
- Instructor course creation, editing, and deletion
- Student course enrollment
- Restricted lesson details and lesson progress tracking
- Server-scored quizzes and per-course best quiz score
- Admin platform counts
- Responsive dashboard UI, light/dark theme preference, and analytics charts
  for available data
- An original beginner MERN curriculum covering HTML, CSS, JavaScript,
  Bootstrap, Node.js, Express, React, and MongoDB, with notes, examples,
  official docs, YouTube tutorial searches, and an isolated browser practice
  preview

Public registration creates student accounts. Promoting an account to an
instructor or administrator currently requires a trusted direct MongoDB update.

## Database and Original MySQL Requirements

The current data store is MongoDB/Mongoose. The original brief requested
MySQL, relational tables, `schema.sql`, `seed.sql`, migrations, foreign keys,
and SQL-specific database tests. Those are not present. The later instruction
to retain the existing MongoDB implementation takes precedence; no database
migration has been made. See the [project audit](docs/PROJECT_AUDIT.md) for a
detailed requirements comparison.

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- A running MongoDB instance, local or hosted

## Local Setup

1. Install dependencies from the repository root:

   ```sh
   npm ci
   ```

2. Copy `.env.example` to `.env` in the repository root. Replace the example
   `JWT_SECRET` with a private random value of at least 32 characters and set
   `MONGODB_URI` to your MongoDB connection string.
3. Start MongoDB.
4. Start the API and frontend:

   ```sh
   npm run dev
   ```

5. Open <http://localhost:5173>. The API listens on port 5000 by default.

The API exits with an explicit error if MongoDB or the required JWT secret is
not configured; it does not switch to mock persistence.

## Course Search and Sample Courses

Search and topic filters only use published courses returned by the API; the
frontend does not include sample or mock courses. Topic filters are derived
from the categories of available courses. A new or empty MongoDB database
therefore has no search results until published courses are created.

To insert the optional sample courses after the API and MongoDB are configured,
follow the role promotion and seed instructions in
[database/README.md](database/README.md). The seed examples include Design,
Technology, and Writing courses.

## Troubleshooting API Connection

If the frontend reports that it cannot reach the API:

1. Confirm the root `.env` file has a reachable `MONGODB_URI` and a private
   `JWT_SECRET` of at least 32 characters. Do not share either value in chat.
2. Start the MongoDB service or verify the Atlas connection and network access.
3. Restart `npm run dev`; the API must connect to MongoDB before it listens on
   port 5000. Check the backend terminal for startup errors.
4. Verify <http://localhost:5000/api/health>, then reload the course catalog.

The development environment used for this check has no `.env`, no configured
`MONGODB_URI`/`JWT_SECRET`, no MongoDB service or executable, and no listener
on port 5000. As a result, the frontend can load but course requests cannot
reach an API. Configure a database locally or in Atlas before expecting search
topics or courses to appear.

## Environment Variables

| Variable        | Required            | Purpose                                                                                      |
| --------------- | ------------------- | -------------------------------------------------------------------------------------------- |
| `MONGODB_URI`   | Yes                 | MongoDB connection URI used by the Express API                                               |
| `JWT_SECRET`    | Yes                 | Private JWT signing secret; at least 32 characters                                           |
| `CLIENT_ORIGIN` | Production required | Exact frontend origin allowed by API CORS                                                    |
| `PORT`          | No                  | API listen port; defaults to `5000`                                                          |
| `NODE_ENV`      | No                  | Set to `production` on the hosted API for secure cookies                                     |
| `VITE_API_URL`  | No                  | Optional frontend API base URL; leave unset when using the Vercel same-origin `/api` rewrite |

Never commit `.env` or put backend secrets in Vite environment variables.
Vite-exposed variables are included in browser code.

## Tests and Checks

Run from the repository root:

```sh
npm test
npm run format:check
npm run build
```

`npm test` runs the backend's Node.js test suite. The current tests do not
connect to MongoDB, so passing unit/API tests do not verify database-backed
registration, course workflows, or deployment behavior. See the
[testing report](docs/TESTING_REPORT.md) for executed cases and coverage gaps.

The MERN starter path is available at `/learn/mern` and doesn't require Atlas.
Completion marks are kept only in the current page session; they are not saved
to the learner account. The inline practice runner executes HTML/CSS/JavaScript
inside a sandboxed iframe. Node.js and MongoDB exercises link to external
practice sites. Explore also displays the static HTML-to-MERN learning modules
when the API is unavailable or no published courses exist, so learners can
still browse and search the curriculum.

## Deployment Status

The static curriculum preview is configured to deploy from GitHub Actions to
GitHub Pages. The workflow build and tests pass, but GitHub rejected the
deployment because Pages is not enabled for this repository. Enable GitHub
Pages with **Settings → Pages → Build and deployment → Source: GitHub Actions**
to publish the pending preview URL above. It only demonstrates the frontend
curriculum; API-backed authentication, course management, and saved student
data require the full-stack deployment.

The full-stack app is not deployed. A MongoDB Atlas URI, Render and Vercel
provider settings, assigned hosting URLs, and live API smoke tests are still
required. See the [deployment guide](docs/DEPLOYMENT.md); do not treat the
static preview as a complete full-stack demo.

## Known Limitations

- No MySQL schema, SQL seed files, or SQL migrations.
- No course approval workflow, category-management API, reviews/ratings,
  certificates, payments, notifications, or file uploads.
- No admin user-management or course-approval endpoints.
- No instructor student-list or dedicated instructor analytics endpoints.
- No pagination for course browsing; the API caps its list at 100.
- No password reset, email verification, or self-service role changes.
- No database-backed integration suite, automated frontend test suite, or
  deployed end-to-end tests.
- No hosting provider or production database is configured; production release
  is blocked pending provisioning and verification.

## Documentation

- [Project audit](docs/PROJECT_AUDIT.md)
- [Security audit](docs/SECURITY_AUDIT.md)
- [Testing report](docs/TESTING_REPORT.md)
- [Final release report](docs/FINAL_RELEASE_REPORT.md)
- [API documentation](docs/API_DOCUMENTATION.md)
- [Database design](docs/DATABASE_DESIGN.md)
- [Project architecture](docs/PROJECT_ARCHITECTURE.md)
- [Deployment guide](docs/DEPLOYMENT.md)
