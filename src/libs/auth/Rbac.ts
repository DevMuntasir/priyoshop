import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { auth } from './Auth';
import type { Permission } from './Permissions';
import { hasPermission } from './Permissions';
import { getRolePermissions } from './Roles';

/** The authenticated user plus the permissions granted by their role. */
export type Actor = {
  user: { id: string; email: string; name: string; roleId?: string };
  permissions: string[];
};

/** Result of a guard: the actor on success, or a ready-to-return error response. */
export type Guard =
  | { actor: Actor; error?: undefined }
  | { actor?: undefined; error: NextResponse };

// Resolves the current actor from the session cookie, loading their role
// permissions. Returns null when there is no valid session.
export const getActor = async (): Promise<Actor | null> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return null;
  }

  const roleId = session.user.roleId ?? undefined;
  const permissions = roleId ? await getRolePermissions(roleId) : [];

  return {
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      roleId,
    },
    permissions,
  };
};

// Requires an authenticated session; yields a 401 error response otherwise.
export const requireSession = async (): Promise<Guard> => {
  const actor = await getActor();
  if (!actor) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  return { actor };
};

// Requires a session whose role grants `permission`; yields 401 (no session) or
// 403 (missing permission). Route handlers check `if (guard.error) return guard.error`.
export const requirePermission = async (permission: Permission): Promise<Guard> => {
  const guard = await requireSession();
  if (guard.error) {
    return guard;
  }
  if (!hasPermission(guard.actor.permissions, permission)) {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }
  return guard;
};
