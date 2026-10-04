/**
 * Seeds RBAC defaults and the first admin account.
 *
 * Run with: `npm run seed` (loads `.env.local`/`.env` automatically).
 * Requires `MONGODB_URI`, `BETTER_AUTH_SECRET`, `SEED_ADMIN_EMAIL`,
 * `SEED_ADMIN_PASSWORD` to be set. Safe to re-run — it is idempotent.
 */
import { existsSync, readFileSync } from 'node:fs';

// Minimal .env loader so the standalone script works without dotenv.
const loadEnvFile = (path: string) => {
  if (!existsSync(path)) {
    return;
  }
  for (const line of readFileSync(path, 'utf-8').split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/u);
    if (!match) {
      continue;
    }
    const key = match[1] ?? '';
    if (!key) {
      continue;
    }
    const value = match[2] ?? '';
    process.env[key] ??= value.replaceAll(/^["']|["']$/gu, '');
  }
};

loadEnvFile('.env.local');
loadEnvFile('.env');

const run = async () => {
  // Dynamic imports so env vars are loaded before validated modules initialise.
  const { getDb, COLLECTIONS } = await import('@/libs/db/Mongodb');
  const { mongoClient } = await import('@/libs/db/Mongodb');
  const { auth } = await import('@/libs/auth/Auth');
  const { ALL_PERMISSIONS, PERMISSIONS, WILDCARD_PERMISSION } =
    await import('@/libs/auth/Permissions');

  const db = getDb();
  const roles = db.collection(COLLECTIONS.role);
  const usersCol = db.collection(COLLECTIONS.user);

  await roles.createIndex({ slug: 1 }, { unique: true });

  const blogPosts = db.collection(COLLECTIONS.blogPost);
  await blogPosts.createIndex({ slug: 1 }, { unique: true });
  await blogPosts.createIndex({ status: 1, publishedAt: -1 });
  await blogPosts.createIndex({ status: 1, featured: 1, publishedAt: -1 });

  const newsPosts = db.collection(COLLECTIONS.newsPost);
  await newsPosts.createIndex({ slug: 1 }, { unique: true });
  await newsPosts.createIndex({ status: 1, publishedAt: -1 });
  await newsPosts.createIndex({ status: 1, featured: 1, publishedAt: -1 });

  const now = new Date();
  const defaults = [
    { slug: 'admin', name: 'Admin', permissions: [WILDCARD_PERMISSION], isSystem: true },
    {
      slug: 'manager',
      name: 'Account Manager',
      permissions: [
        PERMISSIONS.contentRead,
        PERMISSIONS.contentUpdate,
        PERMISSIONS.seoRead,
        PERMISSIONS.seoUpdate,
        PERMISSIONS.usersRead,
      ],
      isSystem: false,
    },
    {
      slug: 'editor',
      name: 'Editor',
      permissions: [PERMISSIONS.contentRead, PERMISSIONS.contentUpdate, PERMISSIONS.seoRead],
      isSystem: false,
    },
    { slug: 'staff', name: 'Staff', permissions: [PERMISSIONS.contentRead], isSystem: false },
  ];

  for (const role of defaults) {
    await roles.updateOne(
      { slug: role.slug },
      { $setOnInsert: { ...role, createdAt: now, updatedAt: now } },
      { upsert: true },
    );
  }
  // Keep the admin role's full access in sync on every run.
  await roles.updateOne(
    { slug: 'admin' },
    { $set: { permissions: [WILDCARD_PERMISSION], updatedAt: now } },
  );
  console.log(`Seeded ${defaults.length} roles (${ALL_PERMISSIONS.length} permissions available).`);

  const adminRole = await roles.findOne({ slug: 'admin' });
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!(email && password)) {
    console.log('SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD not set — skipping admin user.');
    await mongoClient.close();
    return;
  }

  const existing = await usersCol.findOne({ email: email.toLowerCase() });
  if (existing) {
    await usersCol.updateOne(
      { _id: existing._id },
      { $set: { roleId: adminRole?._id.toString() } },
    );
    console.log(`Admin user ${email} already exists — ensured admin role.`);
    await mongoClient.close();
    return;
  }

  const ctx = await auth.$context;
  const hashedPassword = await ctx.password.hash(password);
  const created = await ctx.internalAdapter.createUser({
    email,
    name: 'Admin',
    emailVerified: true,
    roleId: adminRole?._id.toString(),
  });
  await ctx.internalAdapter.linkAccount({
    userId: created.id,
    providerId: 'credential',
    accountId: created.id,
    password: hashedPassword,
  });

  console.log(`Created admin user ${email}.`);
  await mongoClient.close();
};

try {
  await run();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
