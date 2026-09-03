import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import {
  createNewsPublication,
  isNewsPublicationSlugTaken,
  listNewsPublications,
} from '@/libs/news/NewsPublicationRepository';
import { validateNewsSlug } from '@/libs/news/newsSlug';
import { createNewsPublicationSchema } from '@/libs/news/newsPublicationValidation';

export async function GET() {
  const guard = await requirePermission(PERMISSIONS.newsRead);
  if (guard.error) {
    return guard.error;
  }

  const publications = await listNewsPublications();
  return NextResponse.json({ publications });
}

export async function POST(request: Request) {
  const guard = await requirePermission(PERMISSIONS.newsUpdate);
  if (guard.error) {
    return guard.error;
  }

  const body = await request.json().catch(() => null);
  const parsed = createNewsPublicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
  }

  const slugError = validateNewsSlug(parsed.data.slug);
  if (slugError) {
    return NextResponse.json({ error: slugError }, { status: 400 });
  }

  if (await isNewsPublicationSlugTaken(parsed.data.slug)) {
    return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
  }

  const publication = await createNewsPublication(
    {
      name: parsed.data.name,
      slug: parsed.data.slug,
      logo: parsed.data.logo,
      logoAlt: parsed.data.logoAlt,
      websiteUrl: parsed.data.websiteUrl || undefined,
    },
    guard.actor.user.id,
  );

  return NextResponse.json({ publication }, { status: 201 });
}
