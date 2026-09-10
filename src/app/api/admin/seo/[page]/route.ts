import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { getPageDef, isPageKey } from '@/libs/cms/Pages';
import { getAdminSeoOverride, updateSeoOverride } from '@/libs/seo/SeoOverrideRepository';
import { seoOverrideUpdateSchema } from '@/validations/Seo';

type Context = { params: Promise<{ page: string }> };

export async function GET(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.seoRead);
  if (guard.error) {
    return guard.error;
  }

  const { page } = await context.params;
  if (!isPageKey(page)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const def = getPageDef(page);
  return NextResponse.json({ page: def, seo: await getAdminSeoOverride(def.path) });
}

export async function PUT(request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.seoUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { page } = await context.params;
  if (!isPageKey(page)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = seoOverrideUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  await updateSeoOverride(getPageDef(page).path, parsed.data, guard.actor.user.id);
  return NextResponse.json({ ok: true });
}
