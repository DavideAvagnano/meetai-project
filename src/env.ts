import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Server-side environment variables
   * Never exposed to the browser
   */
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    // Database
    DATABASE_URL: z.string().min(1),

    // Better Auth
    BETTER_AUTH_SECRET: z.string().min(32, 'Secret must be at least 32 characters'),
    BETTER_AUTH_URL: z.url(),

    // OAuth - GitHub
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),

    // OAuth - Google
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  },

  /**
   * Client-side environment variables
   * Exposed to the browser (must start with NEXT_PUBLIC_)
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
  },

  /**
   * Runtime environment variables
   * Effective mapping of process.env variables
   */
  runtimeEnv: {
    // Server
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    // Client
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  /**
   * Skip validation durante il build di Next.js
   * (env vars are often different between build and runtime)
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it impossible to have empty strings in the environment variables
   */
  emptyStringAsUndefined: true,
});
