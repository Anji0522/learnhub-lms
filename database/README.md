# MongoDB setup

LearnHub stores users, course content, quizzes, and student progress in MongoDB through Mongoose. There is intentionally no SQL schema or MySQL connection.

1. Start a local MongoDB server, or create a hosted MongoDB database.
2. Set `MONGODB_URI` in the root `.env` file.
3. Register an account through the app. Public registration creates a student.
4. If you want sample courses, promote an existing account to `instructor` in MongoDB, set `SEED_INSTRUCTOR_EMAIL` in `.env`, then run `npm run seed --workspace backend`.

The seed command is idempotent and only creates its example courses once per instructor.
