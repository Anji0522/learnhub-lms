# Local run and Vercel + Render deployment

For local development, use Node.js 20+, MongoDB, and `npm install`, then start with `npm run dev`. Configure `.env` from `.env.example`.

The repo includes a Render Blueprint (`render.yaml`) for the Express API and a Vercel config (`vercel.json`) for the React app and same-origin `/api` proxy. These files prepare deployment; they do not create hosting accounts, database credentials, or a live deployment by themselves.

## Static curriculum preview on GitHub Pages

The `Deploy curriculum preview` GitHub Actions workflow builds the frontend
with the repository base path and publishes a static curriculum preview.
Before it can deploy, enable **Repository Settings → Pages → Build and
deployment → Source: GitHub Actions**. The first deployment workflow currently
fails at its publish step because Pages is not enabled. Once enabled, rerun the
“Deploy curriculum preview” workflow from the Actions tab, then verify the
published URL before treating it as live. The workflow is manually triggered
while Pages is not configured to avoid repeated failed deployment attempts.
This preview has no backend, database, authentication, or persisted student
data.

## Publish the full-stack demo

1. **Create MongoDB Atlas credentials.** Create a database and a dedicated database user. Configure Atlas Network Access for Render's outbound connections. Render Free does not provide fixed outbound IPs; if using Atlas's `0.0.0.0/0` allowlist, use a unique strong database password and restrict the database user's permissions.
2. **Create the API service on Render.** In Render, create a new Blueprint from `Anji0522/learnhub-lms` and apply `render.yaml`. Set the prompted `MONGODB_URI` to the Atlas connection string. Render generates `JWT_SECRET`. Record the actual service URL assigned by Render.
3. **Configure the Vercel API rewrite before deploying the frontend.** Replace the destination host in `vercel.json` with the actual Render service hostname, keeping the `/api/:path*` path. The current checked-in host is only a deployment placeholder derived from the Render service name; it has not been provisioned or verified.
4. **Create the frontend project on Vercel.** Import the same GitHub repository, use the repository root as the project root, and deploy using the checked-in `vercel.json`. The frontend uses same-origin `/api` requests through the Vercel rewrite so the HTTP-only session cookie stays on the frontend origin.
5. **Set the API's client origin.** In the Render service's environment settings, set `CLIENT_ORIGIN` to the exact production Vercel origin (no path or trailing slash), then redeploy the API.
6. **Verify the API and app.** Check `https://<assigned-render-host>/api/health`. Open the actual Vercel deployment, register a student, then verify sign-in and course browsing. Test the other supported workflows and role restrictions against the production database before calling the release complete.
7. After the Vercel URL works, replace the “Not deployed” notice in the README with that verified URL.

The Vercel rewrite proxies `/api` through the frontend origin, allowing the app's HTTP-only secure session cookie to work without exposing it to browser JavaScript. Keep `MONGODB_URI` and `JWT_SECRET` in hosting-provider environment settings; never commit them to GitHub. Render's free service may sleep when idle, so the first request can take longer while it wakes. No provider has been provisioned for this project, and this guide does not represent a completed deployment.
