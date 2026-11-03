# LearnHub testing report

## Automated checks

The repository's available checks are:

| Check                     | Command                | Result                                             |
| ------------------------- | ---------------------- | -------------------------------------------------- |
| Backend tests             | `npm test`             | 7 passed, 0 failed                                 |
| Formatting                | `npm run format:check` | Passed after formatting the new audit and CI files |
| Frontend production build | `npm run build`        | Passed                                             |

The backend currently uses Node's built-in test runner. Its tests exercise the
health and unknown-route responses, public course response filtering, unsafe
lesson URL validation, and role middleware allow/deny behavior.

## Coverage limits

- The test suite does not connect to MongoDB or test persisted registration,
  login, enrollment, progress, quiz submissions, course CRUD, or admin counts.
- There is no automated frontend component-test script or browser test suite
  in the repository.
- A build verifies compilation and bundling; it is not a substitute for
  browser interaction or end-to-end API testing.
- The environment has no configured MongoDB URI or local `.env`, so the API
  server cannot be run against a real database here.
- No test against a deployed API or frontend was possible because no verified
  deployment exists.

Do not interpret unexecuted integration or deployment checks as passing.

## Continuous integration

`.github/workflows/ci.yml` runs `npm ci`, the formatting check, backend tests,
and frontend build on pushes and pull requests targeting `main`. It does not
provide a MongoDB service or increase integration-test coverage.
