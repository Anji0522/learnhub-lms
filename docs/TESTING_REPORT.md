# LearnHub testing report

## Executed checks

| Check                       | Command                                         | Actual result              |
| --------------------------- | ----------------------------------------------- | -------------------------- |
| Backend/API unit tests      | `npm test`                                      | 7 passed, 0 failed         |
| Formatting                  | `npm run format:check`                          | Passed                     |
| Frontend production build   | `npm run build`                                 | Passed                     |
| Backend syntax              | `node --check` for each backend JavaScript file | 23 files passed            |
| Dependency advisories       | `npm audit --audit-level=high`                  | 0 vulnerabilities reported |
| Vercel configuration syntax | Parse `vercel.json` as JSON                     | Passed                     |

The test cases below are the seven tests in the existing Node.js test suite.
The tests use the in-process Express app and test doubles where noted; none
requires MongoDB.

## Executed test cases

| ID         | Test                                              | Expected result                                                  | Actual result                                                 | Status |
| ---------- | ------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------- | ------ |
| API-001    | Health endpoint                                   | `GET /api/health` returns 200 with the service status            | Returned 200 with `{ status: "ok", service: "LearnHub API" }` | PASS   |
| API-002    | Unknown API route                                 | Unknown route returns 404 and a route-not-found message          | Returned 404 with the expected message                        | PASS   |
| COURSE-001 | Public course list filtering                      | List omits lesson video URLs and quiz answer keys                | Test double returned a course without video URL or quiz data  | PASS   |
| COURSE-002 | Public course detail filtering                    | Public detail omits lesson video URLs and correct answer indexes | Test double response omitted both fields                      | PASS   |
| SEC-001    | Lesson video URL model validation                 | `javascript:` URL is rejected and valid HTTPS URL is accepted    | Unsafe URL validation failed as expected; HTTPS URL validated | PASS   |
| AUTHZ-001  | Role middleware denies a non-matching/absent role | Return 403 and do not continue                                   | Returned 403 with permission error                            | PASS   |
| AUTHZ-002  | Role middleware allows a matching role            | Continue to the next handler                                     | `next()` was called                                           | PASS   |

## Failed tests and defects

- Failed tests in the executed suite: **0**.
- `npm audit --audit-level=high` reported 0 dependency vulnerabilities. This
  registry-based audit does not replace a penetration test or prove that
  runtime configuration is secure.
- The prior review identified a medium-risk unsafe lesson URL issue. It was
  fixed in the backend schema and frontend link rendering, with regression
  coverage in `SEC-001`.
- No critical or high-priority defect was identified in the reviewed paths.
  This is not a claim that a complete penetration test or exhaustive
  application audit has been performed.

## Not executed / not covered

The following are untested, not passing tests. MongoDB, provider credentials,
and deployed URLs are not configured in this environment.

| Area                           | Requested behavior                                                                                             | Result / reason                                                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Authentication integration     | Register, login, invalid credentials, duplicate registration, logout, expired/invalid JWT with persisted users | Not run; requires MongoDB-backed API tests                              |
| Authorization integration      | Student/instructor/admin route matrix, course ownership, enrollment checks                                     | Only the role middleware's isolated allow/deny behavior was tested      |
| Course workflows               | Persisted create/edit/delete, search/filter against database, pagination                                       | Not run; no MongoDB integration suite; pagination is not implemented    |
| Enrollment and learning        | Persisted enrollment, lesson access/completion, progress calculations                                          | Not run; requires MongoDB                                               |
| Quiz workflows                 | Load/submit against persisted course, persisted scores, invalid submissions                                    | Not run; requires MongoDB                                               |
| Instructor/admin features      | Student roster, instructor analytics, user management, course approvals                                        | Not implemented in the current API                                      |
| Reviews, certificates, uploads | Create/view reviews, issue/download certificates, validate uploaded files                                      | Not implemented                                                         |
| Frontend behavior              | Component tests, accessibility checks, browser workflows, responsive behavior automation                       | No frontend test runner or browser suite is configured                  |
| Production connectivity        | API health, Vercel-to-Render proxy, cookies, database access, registration/login                               | Blocked; hosting providers and database are not provisioned             |
| SQL-specific checks            | Schema, migrations, constraints, parameterized SQL                                                             | Not applicable to current MongoDB implementation; no SQL has been added |
| Lint and coverage              | ESLint, coverage thresholds                                                                                    | No ESLint/test coverage scripts or configuration are present            |

## Continuous integration

The GitHub Actions workflow at `.github/workflows/ci.yml` runs `npm ci`,
`npm run format:check`, `npm test`, and `npm run build` on pushes and pull
requests targeting `main`. The last recorded CI run for commit `d3f379d`
completed successfully. That workflow does not provide MongoDB or test
production integration.
