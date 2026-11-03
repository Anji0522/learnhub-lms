# LearnHub

LearnHub is a MERN learning platform for Students, Instructors, and Admins. It includes secure cookie-based JWT authentication, course management and enrollment, lesson progress, quizzes, and an admin overview.

## Requirements

- Node.js 20+
- npm 10+
- MongoDB (local or hosted)

## Start the app

1. Copy `.env.example` to `.env`. Set `JWT_SECRET` to a private random value and configure `MONGODB_URI`.
2. Install dependencies: `npm install`
3. Start the API and React development server together: `npm run dev`
4. Visit <http://localhost:5173>. The API runs at <http://localhost:5000>.

The API exits with an explicit error if MongoDB is unavailable; it never falls back to mock persistence.

## Demo

**Live demo:** Not deployed yet. The [GitHub repository](https://github.com/Anji0522/learnhub-lms) is the source-code link, not a live demo.

To try LearnHub locally, start MongoDB, configure `.env` as described above, and run `npm run dev`.
Deployment configuration is prepared for Vercel and Render. See the [deployment guide](docs/DEPLOYMENT.md) to connect MongoDB Atlas and publish the app. Once deployed, replace this notice with the verified Vercel URL.

## Roles

Public registration creates Student accounts only. To promote an account, update its `role` in MongoDB using an existing account email:

```javascript
db.users.updateOne({ email: "instructor@example.com" }, { $set: { role: "instructor" } })
```

Instructors can manage their own courses; Admins can manage every course and see platform statistics.

## Scripts

- `npm run dev` — run API and Vite frontend
- `npm run build` — build the frontend for production
- `npm test` — run API tests

## Structure

- `frontend/` — React UI, pages, components, API client, and styling
- `backend/` — Express API, MongoDB models, authorization, and tests
- `database/` — MongoDB seed data and setup notes
- `docs/` — API, data model, and architecture references

Configure HTTPS and a strong secret in production. Never commit `.env` or credentials.
