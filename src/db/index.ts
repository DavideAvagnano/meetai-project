import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '@/env';

const isDev = env.NODE_ENV !== 'production';

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

const pool =
  global.__pgPool ??
  new Pool({
    connectionString: env.DATABASE_URL,
  });

if (isDev) global.__pgPool = pool;

const dbDev = drizzlePg(pool);
const dbProd = drizzleHttp(env.DATABASE_URL);

export const db = isDev ? dbDev : dbProd;
export type Db = typeof db;

/**
 * Setup:
 * - Development: PostgreSQL in Docker (node-postgres driver)
 * - Production: Neon (neon-http driver)
 *
 * - Eventually VPS for hosting the app (e.g., DigitalOcean, AWS EC2)
 */
