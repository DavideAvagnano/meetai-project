import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';

const folderPath = './src/db';

export default defineConfig({
  out: `${folderPath}/migrations`,
  schema: `${folderPath}/schema.ts`,
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});

/**
 * Drizzle Config
 *
 * Development & Production Workflow
 *
 * ================================
 * Local Development (Docker)
 * ----------------------------
 * 1. Start the local database:
 *      docker compose up -d
 *
 * 2. Run the app in development mode:
 *      bun run dev
 *
 * 3. Update the schema in `schema.ts` or add new entities.
 *
 * 4. Generate a new migration based on the updated schema:
 *      bun run db:generate
 *
 * 5. Apply the migrations to the local database:
 *      bun run db:migrate
 *
 * All changes remain local to the Docker container.
 *
 * ================================
 * Syncing with Neon (Production)
 * ----------------------------
 * To synchronize **only the schema** on Neon without touching the data:
 *      bunx dotenv -e .env.production -- bun run db:migrate
 *
 * Drizzle will apply only migrations **not yet recorded** in the
 * `__drizzle_migrations` table on Neon, ensuring the schema is up-to-date
 * without affecting existing data.
 *
 * Test the production database locally (optional):
 *      bunx dotenv -e .env.production -- bun run build
 *      bunx dotenv -e .env.production -- bun run start
 *
 * ================================
 * Notes
 * ----------------------------
 * - Do not manually modify migrations already applied on Neon.
 * - Migrations are tracked via hashes in the `__drizzle_migrations` table.
 * - Daily development happens on Docker; Neon is updated only when
 *   you explicitly want to sync the schema.
 */
