import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string().min(1) : z.string().url()
    ),
    // Next Auth GitHub Provider
    GITHUB_ID: z.string().min(1),
    GITHUB_SECRET: z.string().min(1),
    // Next Auth Google Provider
    GOOGLE_CLIENT_ID:z.string().min(1),
    GOOGLE_CLIENT_SECRET:z.string().min(1),

    FIREBASE_DATABASE_URL:z.string().min(1),
    FIREBASE_CLIENT_EMAIL:z.string().min(1),
    FIREBASE_PRIVATE_KEY:z.string().min(1),

    EMAIL_SERVER_HOST:z.string().min(1),
    EMAIL_SERVER_PORT:z.string().min(1),
    EMAIL_SERVER_USER:z.string().min(1),
    EMAIL_SERVER_PASSWORD:z.string().min(1),
    EMAIL_FROM:z.string().min(1),
    
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_API_KEY:z.string().min(1),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:z.string().min(1),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:z.string().min(1),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:z.string().min(1),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:z.string().min(1),
    NEXT_PUBLIC_FIREBASE_APP_ID:z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    EMAIL_SERVER_HOST:process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT:process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER:process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD:process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_FROM:process.env.EMAIL_FROM,
    NEXT_PUBLIC_FIREBASE_API_KEY:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

    FIREBASE_DATABASE_URL:process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    FIREBASE_CLIENT_EMAIL:process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY:process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
