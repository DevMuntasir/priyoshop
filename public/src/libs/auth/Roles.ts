import type { Collection, ObjectId as ObjectIdType } from 'mongodb';
import { ObjectId } from 'mongodb';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import type { RoleCreateInput, RoleUpdateInput } from '@/validations/Rbac';

// Stored shape of a role document.
export type RoleDoc = {
  _id: ObjectIdType;
  slug: string;
  name: string;
  permissions: string[];
  // System roles (e.g. `admin`) cannot be deleted.
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Serializable role shape returned to API/UI callers.
export type Role = {
  id: string;
  slug: string;
  name: string;
  permissions: string[];
  isSystem: boolean;
};

const roles = (): Collection<RoleDoc> => getDb().collection<RoleDoc>(COLLECTIONS.role);

const toSlug = (name: string): string =>
  name
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9]+/gu, '-')
    .replaceAll(/(^-|-$)/gu, '');

const serialize = (doc: RoleDoc): Role => ({
  id: doc._id.toHexString(),
  slug: doc.slug,
  name: doc.name,
  permissions: doc.permissions,
  isSystem: doc.isSystem,
});

// Returns all roles ordered by name.
export const listRoles = async (): Promise<Role[]> => {
  // oxlint-disable-next-line unicorn/no-array-sort -- MongoDB cursor sort, not Array#sort
  const docs = await roles().find().sort({ name: 1 }).toArray();
  return docs.map(serialize);
};

// Resolves a role document by its hex id, or null when not found/invalid.
export const getRoleDoc = async (id: string): Promise<RoleDoc | null> => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const doc = await roles().findOne({ _id: new ObjectId(id) });
  return doc;
};

// Returns the permission keys granted by a role, or an empty list.
export const getRolePermissions = async (id: string): Promise<string[]> => {
  const doc = await getRoleDoc(id);
  return doc?.permissions ?? [];
};

// Creates a role with a unique slug derived from its name.
export const createRole = async (input: RoleCreateInput): Promise<Role> => {
  const now = new Date();
  const docWithoutId = {
    slug: toSlug(input.name),
    name: input.name,
    permissions: input.permissions,
    isSystem: false,
    createdAt: now,
    updatedAt: now,
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  const result = await roles().insertOne(docWithoutId as unknown as RoleDoc);
  const doc = Object.assign(docWithoutId, { _id: result.insertedId });
  return serialize(doc as RoleDoc);
};

// Updates a role's name/permissions. Returns null when the role is missing.
export const updateRole = async (id: string, input: RoleUpdateInput): Promise<Role | null> => {
  const doc = await getRoleDoc(id);
  if (!doc) {
    return null;
  }

  const update: Partial<RoleDoc> = { updatedAt: new Date() };
  if (input.name !== undefined) {
    update.name = input.name;
    update.slug = toSlug(input.name);
  }
  // The system admin role always keeps full access; ignore permission edits on it.
  if (input.permissions !== undefined && !doc.isSystem) {
    update.permissions = input.permissions;
  }

  await roles().updateOne({ _id: doc._id }, { $set: update });
  return serialize({ ...doc, ...update });
};

// Deletes a non-system role. Returns false for system or missing roles.
export const deleteRole = async (id: string): Promise<boolean> => {
  const doc = await getRoleDoc(id);
  if (!doc || doc.isSystem) {
    return false;
  }
  await roles().deleteOne({ _id: doc._id });
  return true;
};
