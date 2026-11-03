# LearnHub security audit

## Scope and limitations

This review covers the current application source, API routes, authentication
and role middleware, Mongoose models, and the lesson-link rendering path. It
is a code review, not a penetration test. No production service, database, or
deployment credentials were available, so deployed configuration and live
authorization behavior could not be tested.

## Finding

| #   | Severity  | File                                   | Lines | Vulnerability                                                                                               | Confidence | Status                        |
| --- | --------- | -------------------------------------- | ----- | ----------------------------------------------------------------------------------------------------------- | ---------- | ----------------------------- |
| 1   | 🟡 MEDIUM | `frontend/src/pages/CourseDetails.jsx` | 191   | An instructor-supplied lesson video URL could use a `javascript:` scheme and be rendered as an active link. | 9/10       | Fixed in the current worktree |

### Remediation

The frontend now renders the lesson link only when the URL parses as an HTTPS
URL with a hostname. The backend Mongoose lesson schema also rejects any
non-empty video URL that is not HTTPS, preventing invalid values from being
saved through course creation or updates. A regression test verifies that a
`javascript:` URL fails validation and a valid HTTPS URL passes.

### Verification

The backend regression test, full backend test command, Prettier check, and
frontend production build are listed in [TESTING_REPORT.md](./TESTING_REPORT.md).

## Security controls observed

- Password hashes are excluded from normal user queries and passwords are
  hashed with bcrypt.
- User registration always assigns the student role; role-protected routes
  enforce instructor/admin permissions.
- Session cookies are HTTP-only, use `SameSite=Lax`, and are marked `Secure`
  in production.
- Helmet, exact-origin CORS configuration, JSON body limits, and
  authentication-route rate limiting are configured.
- Public course payloads omit quiz answer keys and lesson video URLs.

## Residual limitations

- No live database or deployment was available for end-to-end security
  verification.
- No dynamic scanner, dependency audit beyond the checks documented in the
  testing report, or penetration test was run as part of this review.
- Deployment security still depends on setting a strong `JWT_SECRET`, using
  HTTPS, and configuring the exact production client origin and restricted
  MongoDB credentials.
