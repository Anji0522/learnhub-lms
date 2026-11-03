import assert from "node:assert/strict";
import { test } from "node:test";
import { requireRole } from "../middleware/roleMiddleware.js";

test("role middleware rejects unauthenticated requests", () => {
  const middleware = requireRole("admin");
  let status;
  let body;
  middleware(
    {},
    {
      status(code) {
        status = code;
        return this;
      },
      json(value) {
        body = value;
      },
    },
    () => {
      assert.fail("next should not be called");
    },
  );
  assert.equal(status, 403);
  assert.match(body.message, /permission/);
});

test("role middleware permits a matching role", () => {
  let continued = false;
  requireRole("instructor")({ user: { role: "instructor" } }, {}, () => {
    continued = true;
  });
  assert.equal(continued, true);
});
