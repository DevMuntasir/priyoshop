import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { createUser, listUsers } from '@/libs/auth/Users';
import { userCreateSchema } from '@/validations/Rbac';

export async function GET() {
  const guard = await requirePermission(PERMISSIONS.usersRead);
  if (guard.error) {
    return guard.error;
  }
  return NextResponse.json({ users: await listUsers() });
}

export async function POST(request: Request) {
  const guard = await requirePermission(PERMISSIONS.usersManage);
  if (guard.error) {
    return guard.error;
  }

  const body = await request.json().catch(() => null);
  const parsed = userCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  return NextResponse.json({ user: await createUser(parsed.data) }, { status: 201 });
}
