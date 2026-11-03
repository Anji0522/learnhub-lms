# LearnHub - Online Learning Management System

## Live Demo and Repository

- **Live demo:** Not deployed. Vercel, Render, and MongoDB Atlas are not
  provisioned for this project yet. No demo URL is available.
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

## Deployment Status

Vercel and Render configuration is prepared but not deployed. A MongoDB Atlas
URI, provider environment settings, assigned hosting URLs, and live smoke tests
are still required. Do not treat the repository or deployment configuration as
a live demo. See the [deployment guide](docs/DEPLOYMENT.md); add a demo URL here
only after deployment and end-to-end verification succeed.

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
