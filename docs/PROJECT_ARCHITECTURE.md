# Project architecture

LearnHub is a JavaScript-only MERN workspace: React/Vite client, Express API, and MongoDB/Mongoose persistence. The root npm workspace provides concurrent local development.

- `frontend/src/pages/` contains route-level screens.
- `frontend/src/components/` contains shared navigation, course, loading, and protected-route UI.
- `frontend/src/context/` restores the current cookie-authenticated user.
- `frontend/src/services/api.js` is the single JSON API client.
- `backend/routes/` maps HTTP routes to controllers.
- `backend/controllers/` implements auth, course, lesson, quiz, and admin behaviors.
- `backend/middleware/` handles authentication, roles, and consistent errors.
- `backend/models/` defines MongoDB user and course documents.

The API starts only after MongoDB is available and the JWT secret is configured. The Vite development server proxies `/api` to the Express API.
