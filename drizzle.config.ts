import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

if (typeof process.env.XATA_DATABASE_URL !== "string") {
  throw new Error("Please set your XATA_DATABASE_URL");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.XATA_DATABASE_URL,
  },
});
