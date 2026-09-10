import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { getAdminSection } from '@/libs/cms/ContentRepository';
import { updateSection } from '@/libs/cms/ContentService';
import { isSectionKey } from '@/libs/cms/Sections';
import { sectionUpdateSchema } from '@/validations/Section';

type Context = { params: Promise<{ key: string }> };

export async function GET(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.contentRead);
  if (guard.error) {
    return guard.error;
  }

  const { key } = await context.params;
  if (!isSectionKey(key)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ section: await getAdminSection(key) });
}

export async function PUT(request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.contentUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { key } = await context.params;
  if (!isSectionKey(key)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = sectionUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  await updateSection(key, parsed.data, guard.actor.user.id);
  return NextResponse.json({ ok: true });
}
