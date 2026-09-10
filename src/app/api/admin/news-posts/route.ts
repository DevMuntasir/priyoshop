import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { createNewsPost, isNewsSlugTaken, listNewsPosts } from '@/libs/news/NewsPostRepository';
import { createNewsPostSchema } from '@/libs/news/newsValidation';
import { validateNewsSlug } from '@/libs/news/newsSlug';

export async function GET() {
  const guard = await requirePermission(PERMISSIONS.newsRead);
  if (guard.error) {
    return guard.error;
  }

  const posts = await listNewsPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const guard = await requirePermission(PERMISSIONS.newsUpdate);
  if (guard.error) {
    return guard.error;
  }

  const body = await request.json().catch(() => null);
  const parsed = createNewsPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { slug, title } = parsed.data;

  const slugError = validateNewsSlug(slug);
  if (slugError) {
    return NextResponse.json({ error: slugError }, { status: 400 });
  }

  const taken = await isNewsSlugTaken(slug);
  if (taken) {
    return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
  }

  const post = await createNewsPost({ slug, title }, guard.actor.user.id);
  return NextResponse.json({ post }, { status: 201 });
}
