import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';
import { getDb } from '@/libs/db/Mongodb';
import { Env } from '@/libs/Env';

/**
 * Better Auth server instance: self-hosted email/password authentication backed
 * by MongoDB. Authorization (roles/permissions) is handled separately in
 * `@/libs/auth/Rbac` — Better Auth owns identity and sessions only.
 */
export const auth = betterAuth({
  appName: 'PriyoShop',
  baseURL: Env.BETTER_AUTH_URL ?? Env.NEXT_PUBLIC_APP_URL,
  secret: Env.BETTER_AUTH_SECRET,
  trustedOrigins: Env.BETTER_AUTH_TRUSTED_ORIGINS?.split(',').map(origin => origin.trim()),
  database: mongodbAdapter(getDb()),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      // Reference to a document in the `role` collection. Assigned by admins,
      // never set during self-service sign-up.
      roleId: { type: 'string', required: false, input: false },
    },
  },
  plugins: [nextCookies()],
});
