import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import {
  deleteNewsPublication,
  getNewsPublication,
  isNewsPublicationSlugTaken,
  updateNewsPublication,
} from '@/libs/news/NewsPublicationRepository';
import { validateNewsSlug } from '@/libs/news/newsSlug';
import { updateNewsPublicationSchema } from '@/libs/news/newsPublicationValidation';

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.newsRead);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const publication = await getNewsPublication(id);
  if (!publication) {
    return NextResponse.json({ error: 'Publication not found' }, { status: 404 });
  }

  return NextResponse.json({ publication });
}

export async function PATCH(request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.newsUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = updateNewsPublicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
  }

  if (parsed.data.slug !== undefined) {
    const slugError = validateNewsSlug(parsed.data.slug);
    if (slugError) {
      return NextResponse.json({ error: slugError }, { status: 400 });
    }

    if (await isNewsPublicationSlugTaken(parsed.data.slug, id)) {
      return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
    }
  }

  const publication = await updateNewsPublication(
    id,
    {
      name: parsed.data.name,
      slug: parsed.data.slug,
      logo: parsed.data.logo,
      logoAlt: parsed.data.logoAlt,
      websiteUrl: parsed.data.websiteUrl || undefined,
    },
    guard.actor.user.id,
  );

  if (!publication) {
    return NextResponse.json({ error: 'Publication not found' }, { status: 404 });
  }

  return NextResponse.json({ publication });
}

export async function DELETE(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.newsUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const deleted = await deleteNewsPublication(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Publication not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
