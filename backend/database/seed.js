import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "../config/db.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

const instructorEmail = process.env.SEED_INSTRUCTOR_EMAIL?.trim().toLowerCase();

if (!instructorEmail) {
  throw new Error("Set SEED_INSTRUCTOR_EMAIL to an existing instructor account before seeding.");
}

try {
  await connectDatabase();
  const instructor = await User.findOne({ email: instructorEmail, role: { $in: ["instructor", "admin"] } });
  if (!instructor) {
    throw new Error(`No instructor/admin account found for ${instructorEmail}. Register, promote the account, then retry.`);
  }

  const examples = [
    {
      title: "Design a brand with a point of view",
      description: "Find the story behind a brand and turn it into a visual identity that feels clear, considered, and unmistakably yours.",
      category: "Design",
      level: "Beginner",
      lessons: [
        { title: "Start with the why", description: "Find the feeling and idea at the heart of a brand.", order: 0 },
        { title: "Gather visual references", description: "Build a moodboard that tells a coherent story.", order: 1 },
        { title: "Make the identity", description: "Bring color, type, and marks together.", order: 2 }
      ],
      quiz: [
        { prompt: "What should guide a visual identity first?", options: ["The story and audience", "The latest trend", "The longest font"], correctIndex: 0 },
        { prompt: "What helps a moodboard work well?", options: ["A clear visual direction", "As many images as possible", "Only one color"], correctIndex: 0 }
      ]
    },
    {
      title: "A gentler introduction to web development",
      description: "Learn how the web fits together, then build a small, responsive page you can make your own.",
      category: "Technology",
      level: "Beginner",
      lessons: [
        { title: "How a web page comes together", description: "Meet HTML, CSS, and JavaScript.", order: 0 },
        { title: "Give your page some shape", description: "Use HTML to structure meaningful content.", order: 1 },
        { title: "Make it feel like yours", description: "Add styles and a small interaction.", order: 2 }
      ],
      quiz: [
        { prompt: "Which language gives a page its structure?", options: ["HTML", "CSS", "MongoDB"], correctIndex: 0 },
        { prompt: "What is CSS mainly used for?", options: ["Presentation and layout", "Database storage", "User authentication"], correctIndex: 0 }
      ]
    },
    {
      title: "Write clearly, say more",
      description: "Turn a fuzzy thought into writing that feels human, useful, and easy to understand.",
      category: "Writing",
      level: "Intermediate",
      lessons: [
        { title: "Find the one thing to say", description: "Make a clear promise to your reader.", order: 0 },
        { title: "Put the reader first", description: "Use concrete, welcoming language.", order: 1 },
        { title: "Edit with a light touch", description: "Make each sentence earn its place.", order: 2 }
      ],
      quiz: [
        { prompt: "What is a useful first step when writing?", options: ["Clarify the main idea", "Choose a decorative font", "Add more adjectives"], correctIndex: 0 },
        { prompt: "What makes writing easier to follow?", options: ["Concrete language", "Longer sentences", "More jargon"], correctIndex: 0 }
      ]
    }
  ];

  let created = 0;
  for (const example of examples) {
    const result = await Course.updateOne(
      { title: example.title, instructor: instructor._id },
      { $setOnInsert: { ...example, instructor: instructor._id, published: true } },
      { upsert: true }
    );
    if (result.upsertedCount) created += 1;
  }
  console.log(`Seed complete: ${created} new courses added; existing examples were left unchanged.`);
} finally {
  await mongoose.disconnect();
}
