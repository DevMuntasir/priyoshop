import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { createRole, listRoles } from '@/libs/auth/Roles';
import { roleCreateSchema } from '@/validations/Rbac';

export async function GET() {
  const guard = await requirePermission(PERMISSIONS.rolesRead);
  if (guard.error) {
    return guard.error;
  }
  return NextResponse.json({ roles: await listRoles() });
}

export async function POST(request: Request) {
  const guard = await requirePermission(PERMISSIONS.rolesManage);
  if (guard.error) {
    return guard.error;
  }

  const body = await request.json().catch(() => null);
  const parsed = roleCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  return NextResponse.json({ role: await createRole(parsed.data) }, { status: 201 });
}
