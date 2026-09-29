import type { Collection, ObjectId as ObjectIdType } from 'mongodb';
import { ObjectId } from 'mongodb';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import type { UserCreateInput, UserUpdateInput } from '@/validations/Rbac';
import { auth } from './Auth';

// Stored shape of a user document (subset; Better Auth owns the collection).
export type UserDoc = {
  _id: ObjectIdType;
  email: string;
  name: string;
  roleId?: string;
  banned?: boolean;
  createdAt: Date;
};

// Serializable user shape returned to API/UI callers.
export type AppUser = {
  id: string;
  email: string;
  name: string;
  roleId?: string;
  banned: boolean;
  createdAt: string;
};

const users = (): Collection<UserDoc> => getDb().collection<UserDoc>(COLLECTIONS.user);

const serialize = (doc: UserDoc): AppUser => ({
  id: doc._id.toHexString(),
  email: doc.email,
  name: doc.name,
  roleId: doc.roleId,
  banned: doc.banned ?? false,
  createdAt: doc.createdAt.toISOString(),
});

// Returns all users ordered by creation date (newest first).
export const listUsers = async (): Promise<AppUser[]> => {
  // oxlint-disable-next-line unicorn/no-array-sort -- MongoDB cursor sort, not Array#sort
  const docs = await users().find().sort({ createdAt: -1 }).toArray();
  return docs.map(serialize);
};

// Creates a user with a hashed credential account and assigned role, without
// affecting the caller's session (uses Better Auth's internal adapter directly
// rather than the sign-up endpoint).
export const createUser = async (input: UserCreateInput): Promise<AppUser> => {
  const ctx = await auth.$context;
  const hashedPassword = await ctx.password.hash(input.password);

  const created = await ctx.internalAdapter.createUser({
    email: input.email,
    name: input.name,
    emailVerified: false,
    roleId: input.roleId,
  });

  await ctx.internalAdapter.linkAccount({
    userId: created.id,
    providerId: 'credential',
    accountId: created.id,
    password: hashedPassword,
  });

  return {
    id: created.id,
    email: created.email,
    name: created.name,
    roleId: input.roleId,
    banned: false,
    createdAt: new Date(created.createdAt).toISOString(),
  };
};

// Updates a user's name/role/ban flag. Returns null when the user is missing.
export const updateUser = async (id: string, input: UserUpdateInput): Promise<AppUser | null> => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const update: Partial<UserDoc> = {};
  if (input.name !== undefined) {
    update.name = input.name;
  }
  if (input.roleId !== undefined) {
    update.roleId = input.roleId;
  }
  if (input.banned !== undefined) {
    update.banned = input.banned;
  }

  const doc = await users().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: update },
    { returnDocument: 'after' },
  );

  return doc ? serialize(doc) : null;
};
