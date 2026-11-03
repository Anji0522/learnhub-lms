# Local run and deployment notes

For local development, use Node.js 20+, MongoDB, and `npm install`, then start with `npm run dev`. Configure `.env` from `.env.example`.

For production, build the React app with `npm run build`, run the backend with `npm start --workspace backend`, and serve the frontend `frontend/dist` bundle from a static host or web server. Configure `MONGODB_URI`, a private 32+ character `JWT_SECRET`, `CLIENT_ORIGIN`, and `NODE_ENV=production`. Use HTTPS so secure cookies work. No live deployment is configured by this repository.
