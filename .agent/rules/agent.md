# LearnHub project rules

LearnHub is a learning platform built with React, Node.js, Express, and MongoDB. It supports Student, Instructor, and Admin roles, course management, video lessons, quizzes, student progress tracking, and an admin dashboard.

## Project conventions

- Inspect the existing project structure and follow its established patterns before making changes. Do not introduce a new framework, dependency, or architectural layer without a clear need.
- Keep frontend and backend responsibilities separate. Use the existing API and data-access patterns rather than duplicating business logic in React components.
- Prefer small, focused components, routes, services, and models. Keep interfaces and validation aligned across the client and server.
- Add or update tests for behavior changes, especially authentication, authorization, course access, quiz submissions, and progress tracking.

## Authentication and authorization

- Enforce authentication and role-based authorization on the server for every protected operation; hiding UI controls is not authorization.
- Check resource ownership and course enrollment where relevant, in addition to the user's role.
- Hash passwords with an established password-hashing library. Never store or log plaintext passwords, JWTs, or secrets.
- Load signing keys and other secrets from environment configuration; never hard-code credentials.
- Follow the repository's existing token-storage design. If none exists, ask before choosing one, and use secure cookie settings if cookies are selected.
- Validate and normalize untrusted input at API boundaries. Use safe database query patterns and return only fields the caller is allowed to see.

## Learning-platform behavior

- Keep course, lesson, quiz, and progress access consistent with the user's role, enrollment, and ownership.
- Validate quiz submissions on the server and derive progress from trusted server-side results rather than client claims.
- Treat video URLs and uploaded media as untrusted input; follow the existing storage and access-control design.
- Make changes to role or course rules explicit and cover their allowed and denied cases with tests.

## Verification

- Use the scripts and test commands defined by the project manifests; do not assume commands or dependencies that are not present.
- Report checks that could not be run and any configuration required to run them.
