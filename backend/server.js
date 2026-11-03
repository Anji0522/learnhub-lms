import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";

const port = Number(process.env.PORT) || 5000;

try {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters.");
  }
  await connectDatabase();
  app.listen(port, () => console.log(`LearnHub API listening on http://localhost:${port}`));
} catch (error) {
  console.error(`LearnHub API could not start: ${error.message}`);
  process.exitCode = 1;
}
