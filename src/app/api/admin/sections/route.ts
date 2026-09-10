import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listAdminSections, listPageLayout } from '@/libs/cms/ContentRepository';
import { reorderSections } from '@/libs/cms/ContentService';
import { isLayoutKey } from '@/libs/cms/Layout';
import { isPageKey } from '@/libs/cms/Pages';
import { sectionReorderSchema } from '@/validations/Section';

export async function GET(request: Request) {
  const guard = await requirePermission(PERMISSIONS.contentRead);
  if (guard.error) {
    return guard.error;
  }

  const page = new URL(request.url).searchParams.get('page');
  if (page !== null) {
    if (!isPageKey(page)) {
      return NextResponse.json({ error: 'Unknown page' }, { status: 400 });
    }
    return NextResponse.json({ sections: await listPageLayout(page) });
  }

  return NextResponse.json({ sections: await listAdminSections() });
}

export async function PATCH(request: Request) {
  const guard = await requirePermission(PERMISSIONS.contentUpdate);
  if (guard.error) {
    return guard.error;
  }

  const body = await request.json().catch(() => null);
  const parsed = sectionReorderSchema.safeParse(body);
  if (!parsed.success || !isPageKey(parsed.data.page)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { page, keys } = parsed.data;
  if (!keys.every((key) => isLayoutKey(page, key))) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  await reorderSections(keys, guard.actor.user.id);
  return NextResponse.json({ ok: true });
}
