# Local run and Vercel + Render deployment

For local development, use Node.js 20+, MongoDB, and `npm install`, then start with `npm run dev`. Configure `.env` from `.env.example`.

The repo includes a Render Blueprint (`render.yaml`) for the Express API and a Vercel config (`vercel.json`) for the React app and same-origin `/api` proxy. These files prepare deployment; they do not create hosting accounts, database credentials, or a live deployment by themselves.

## Publish the full-stack demo

1. **Create MongoDB Atlas credentials.** Create a database and a dedicated database user. Configure Atlas Network Access for Render's outbound connections. Render Free does not provide fixed outbound IPs; if using Atlas's `0.0.0.0/0` allowlist, use a unique strong database password and restrict the database user's permissions.
2. **Create the API service on Render.** In Render, create a new Blueprint from `Anji0522/learnhub-lms` and apply `render.yaml`. Set the prompted `MONGODB_URI` to the Atlas connection string. Render generates `JWT_SECRET`.
3. **Create the frontend project on Vercel.** Import the same GitHub repository, use the repository root as the project root, and deploy using the checked-in `vercel.json`.
4. **Set the API's client origin.** In the Render service's environment settings, set `CLIENT_ORIGIN` to the exact production Vercel origin (for example, `https://your-project.vercel.app`, with no path or trailing slash), then redeploy the API.
5. **Verify the API and app.** The API health check is `https://learnhub-lms-api.onrender.com/api/health`. Open the actual Vercel deployment, register a student, then verify sign-in and course browsing. If Render assigns a different service hostname, update the API rewrite destination in `vercel.json` to that hostname and push the change.
6. After the Vercel URL works, replace the “Live demo: Not deployed yet” notice in the README with that verified URL.

The Vercel rewrite proxies `/api` through the frontend origin, allowing the app's HTTP-only secure session cookie to work without exposing it to browser JavaScript. Keep `MONGODB_URI` and `JWT_SECRET` in hosting-provider environment settings; never commit them to GitHub. Render's free service may sleep when idle, so the first request can take longer while it wakes.
