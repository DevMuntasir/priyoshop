import * as z from 'zod';
import { ALL_PERMISSIONS, WILDCARD_PERMISSION } from '@/libs/auth/Permissions';

const permissionKey = z.enum([WILDCARD_PERMISSION, ...ALL_PERMISSIONS]);

export const roleCreateSchema = z.object({
  name: z.string().min(2).max(50),
  permissions: z.array(permissionKey).default([]),
});

export const roleUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  permissions: z.array(permissionKey).optional(),
});

export const userCreateSchema = z.object({
  name: z.string().min(1).max(80),
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  email: z.string().email('Invalid email address'),
  password: z.string().min(8).max(128),
  roleId: z.string().min(1),
});

export const userUpdateSchema = z.object({
  name: z.string().min(1).max(80).optional(),
  roleId: z.string().min(1).optional(),
  banned: z.boolean().optional(),
});

export type RoleCreateInput = z.infer<typeof roleCreateSchema>;
export type RoleUpdateInput = z.infer<typeof roleUpdateSchema>;
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
