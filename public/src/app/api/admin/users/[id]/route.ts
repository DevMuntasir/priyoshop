import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { updateUser } from '@/libs/auth/Users';
import { userUpdateSchema } from '@/validations/Rbac';

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.usersManage);
  if (guard.error) {
    return guard.error;
  }

  const body = await request.json().catch(() => null);
  const parsed = userUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { id } = await context.params;
  const user = await updateUser(id, parsed.data);
  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ user });
}
