import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { deleteRole, updateRole } from '@/libs/auth/Roles';
import { roleUpdateSchema } from '@/validations/Rbac';

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.rolesManage);
  if (guard.error) {
    return guard.error;
  }

  const body = await request.json().catch(() => null);
  const parsed = roleUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { id } = await context.params;
  const role = await updateRole(id, parsed.data);
  if (!role) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ role });
}

export async function DELETE(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.rolesManage);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const deleted = await deleteRole(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Cannot delete this role' }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
