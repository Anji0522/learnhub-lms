import assert from "node:assert/strict";
import { test } from "node:test";
import { mernCurriculum } from "../src/data/mernCurriculum.js";

const expectedModules = [
  "html",
  "css",
  "javascript",
  "bootstrap",
  "node",
  "express",
  "react",
  "mongodb",
];

test("curriculum covers web foundations through the complete MERN stack", () => {
  assert.deepEqual(
    mernCurriculum.map((module) => module.id),
    expectedModules,
  );
});

test("each curriculum module has lessons, an example, practice, and learning links", () => {
  for (const module of mernCurriculum) {
    assert.ok(
      module.lessons.length >= 3,
      `${module.id} needs at least 3 lessons`,
    );
    assert.ok(module.videoSearch.startsWith("https://www.youtube.com/results"));
    assert.ok(module.documentation.length > 0);

    for (const lesson of module.lessons) {
      assert.ok(lesson.title);
      assert.ok(lesson.notes);
      assert.ok(lesson.example);
      assert.ok(lesson.practice);
      assert.ok(Number.parseInt(lesson.time, 10) > 0);
    }

    for (const resource of module.documentation) {
      assert.equal(new URL(resource.url).protocol, "https:");
    }
  }
});

test("curriculum has a meaningful start-to-finish set of lessons", () => {
  const lessonCount = mernCurriculum.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );

  assert.ok(lessonCount >= 24);
  assert.match(mernCurriculum[0].lessons[0].title, /first HTML/i);
  assert.match(mernCurriculum.at(-1).lessons.at(-1).title, /MERN app/i);
});
