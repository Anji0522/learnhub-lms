# LearnHub final release report

## Release status: not deployed

The source is prepared for deployment, but there is no verified public
frontend or API URL. The Vercel and Render configuration files do not create
provider accounts or supply MongoDB credentials. The README therefore
continues to say that the live demo is not deployed; no unverified URL is
published as a demo.

## Verification

The checks run for this release attempt are recorded in
[TESTING_REPORT.md](./TESTING_REPORT.md). They cover formatting, the existing
backend unit tests, and the frontend production build. They do not establish
database-backed or deployed behavior.

## Outstanding release requirements

1. Provide/configure a MongoDB Atlas database URI and a strong production
   `JWT_SECRET` in the hosting provider's secret settings.
2. Connect the repository to Vercel and Render, set the exact client origin,
   and confirm the API rewrite points to the assigned Render hostname.
3. Verify both deployed services, then test registration, login, course
   creation/enrollment, lesson progress, quizzes, and role restrictions
   against the live database.
4. Add the actual verified frontend deployment URL to the README.
5. Decide whether the unimplemented features in
   [PROJECT_AUDIT.md](./PROJECT_AUDIT.md) are release requirements.

The current database remains MongoDB to honor the existing MERN application.
No MySQL migration or deployment is included in this release attempt.
