# API documentation

Base URL: `http://localhost:5000/api`. Authentication uses an HTTP-only `learnhub_token` cookie. Send requests with credentials enabled. JSON request bodies are limited to 100 KB.

## Authentication

- `POST /auth/register` — `{ "name", "email", "password" }`; creates a student
- `POST /auth/login` — `{ "email", "password" }`
- `POST /auth/logout` — clear current session
- `GET /auth/me` — current signed-in user

Passwords must contain 8–128 characters. Registration cannot set an elevated role.

## Courses and learning

- `GET /courses?search=&category=` — published course list; contains no quiz answers or video links
- `GET /courses/:id` — course overview and lesson names; video links are returned only to enrolled learners and the instructor/admin
- `GET /courses/mine` — current user's enrollments or instructor/admin-owned courses
- `POST /courses` — create a course (instructor/admin)
- `PUT /courses/:id` — update an owned course (instructor) or any course (admin)
- `DELETE /courses/:id` — remove an owned course (instructor) or any course (admin)
- `POST /courses/:id/enroll` — enroll current student
- `GET /lessons/:courseId` — lesson details for enrolled learners and course owner/admin
- `POST /lessons/:courseId/:lessonId/complete` — record lesson progress
- `POST /quizzes/:courseId/submit` — submit `{ "answers": [0, 1] }`; scores are computed on the server
- `GET /quizzes/progress` — current learner's course progress summary

## Administration

- `GET /admin/dashboard` — platform counts (admin only)

Errors use JSON `{ "message": "..." }`. Protected routes return 401 when unauthenticated and 403 when the role or course access is not allowed.
