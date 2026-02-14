import { drizzle } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '@/env';

const isDev = env.NODE_ENV === 'development';

const devPoolConfig = {
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  port: env.DB_PORT,
  ssl: false,
} as const;

const devPool = new Pool(devPoolConfig);

const dbDev = drizzlePg(devPool);
const dbProd = drizzle(env.DB_URL!);

export const db = isDev ? dbDev : dbProd;

export type Db = typeof db;

/**
 * Setup:
 * - Development: PostgreSQL in Docker (node-postgres driver)
 * - Production: Neon (neon-http driver)
 *
 * - Eventually VPS for hosting the app (e.g., DigitalOcean, AWS EC2)
 */
