import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const folderPath = "/.src/db";

export default defineConfig({
  out: `${folderPath}/migrations`,
  schema: `${folderPath}/schema.ts`,
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
