/**
 * Permission catalog (resource.action). A role holds a subset of these keys, or
 * the wildcard {@link WILDCARD_PERMISSION} to grant everything. Pure module —
 * safe to import on the client (e.g. to render the role editor).
 */
export const PERMISSIONS = {
  contentRead: 'content.read',
  contentUpdate: 'content.update',
  seoRead: 'seo.read',
  seoUpdate: 'seo.update',
  builderRead: 'builder.read',
  builderUpdate: 'builder.update',
  blogRead: 'blog.read',
  blogUpdate: 'blog.update',
  newsRead: 'news.read',
  newsUpdate: 'news.update',
  careerRead: 'career.read',
  careerUpdate: 'career.update',
  contactRead: 'contact.read',
  usersRead: 'users.read',
  usersManage: 'users.manage',
  rolesRead: 'roles.read',
  rolesManage: 'roles.manage',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/** Grants every permission. Held by the system `admin` role. */
export const WILDCARD_PERMISSION = '*';

/** Every concrete permission key, for building the role editor and seeding. */
export const ALL_PERMISSIONS: Permission[] = Object.values(PERMISSIONS);

/** Human-readable groupings used by the admin role editor. */
export const PERMISSION_GROUPS: { label: string; permissions: Permission[] }[] = [
  { label: 'Content', permissions: [PERMISSIONS.contentRead, PERMISSIONS.contentUpdate] },
  { label: 'Builder', permissions: [PERMISSIONS.builderRead, PERMISSIONS.builderUpdate] },
  { label: 'Blog', permissions: [PERMISSIONS.blogRead, PERMISSIONS.blogUpdate] },
  { label: 'News', permissions: [PERMISSIONS.newsRead, PERMISSIONS.newsUpdate] },
  { label: 'Career', permissions: [PERMISSIONS.careerRead, PERMISSIONS.careerUpdate] },
  { label: 'Contact', permissions: [PERMISSIONS.contactRead] },
  { label: 'SEO', permissions: [PERMISSIONS.seoRead, PERMISSIONS.seoUpdate] },
  { label: 'Users', permissions: [PERMISSIONS.usersRead, PERMISSIONS.usersManage] },
  { label: 'Roles', permissions: [PERMISSIONS.rolesRead, PERMISSIONS.rolesManage] },
];

/**
 * Checks whether a permission set satisfies a required permission.
 * @param granted The permission keys held by the actor's role.
 * @param required The permission the action needs.
 * @returns True when the wildcard or the exact permission is present.
 */
export const hasPermission = (granted: string[], required: Permission): boolean =>
  granted.includes(WILDCARD_PERMISSION) || granted.includes(required);
