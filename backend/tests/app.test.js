import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import app from "../app.js";
import Course from "../models/Course.js";

let server;
let origin;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
});

test("health endpoint reports API readiness without a database connection", async () => {
  const response = await fetch(`${origin}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: "ok",
    service: "LearnHub API",
  });
});

test("unknown API endpoints return a clear not-found response", async () => {
  const response = await fetch(`${origin}/api/not-a-route`);
  assert.equal(response.status, 404);
  assert.match((await response.json()).message, /Route not found/);
});

test("course list does not expose quiz answer keys or video URLs", async () => {
  const originalFind = Course.find;
  Course.find = () => ({
    populate() {
      return this;
    },
    sort() {
      return this;
    },
    limit: async () => [
      {
        toObject: () => ({
          title: "Test course",
          lessons: [
            { title: "Lesson", videoUrl: "https://example.test/video" },
          ],
          quiz: [{ prompt: "Question", correctIndex: 0 }],
        }),
      },
    ],
  });
  try {
    const response = await fetch(`${origin}/api/courses`);
    assert.equal(response.status, 200);
    const [{ title, lessons, lessonCount, quiz }] = (await response.json())
      .courses;
    assert.equal(title, "Test course");
    assert.equal(lessonCount, 1);
    assert.equal("videoUrl" in lessons[0], false);
    assert.equal(quiz, undefined);
  } finally {
    Course.find = originalFind;
  }
});

test("public course details hide quiz answers and lesson video URLs", async () => {
  const originalFindById = Course.findById;
  Course.findById = () => ({
    populate: async () => ({
      published: true,
      instructor: { _id: "instructor-id", name: "Instructor" },
      lessons: [
        {
          _id: "lesson-id",
          title: "Lesson",
          description: "",
          videoUrl: "https://example.test/video",
          order: 0,
        },
      ],
      quiz: [
        {
          _id: "question-id",
          prompt: "Question",
          options: ["A", "B"],
          correctIndex: 1,
        },
      ],
      toObject() {
        return {
          published: this.published,
          instructor: this.instructor,
          lessons: this.lessons,
          quiz: this.quiz,
        };
      },
    }),
  });
  try {
    const response = await fetch(`${origin}/api/courses/course-id`);
    assert.equal(response.status, 200);
    const { course } = await response.json();
    assert.equal("videoUrl" in course.lessons[0], false);
    assert.equal("correctIndex" in course.quiz[0], false);
  } finally {
    Course.findById = originalFindById;
  }
});
