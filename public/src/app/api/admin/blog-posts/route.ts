import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { createBlogPost, isBlogSlugTaken, listBlogPosts } from '@/libs/media/BlogPostRepository';
import { validateBlogSlug } from '@/libs/media/blogSlug';
import { createBlogPostSchema } from '@/libs/media/blogValidation';

export async function GET() {
  const guard = await requirePermission(PERMISSIONS.blogRead);
  if (guard.error) {
    return guard.error;
  }

  const posts = await listBlogPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const guard = await requirePermission(PERMISSIONS.blogUpdate);
  if (guard.error) {
    return guard.error;
  }

  const body = await request.json().catch(() => null);
  const parsed = createBlogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { slug, title } = parsed.data;

  const slugError = validateBlogSlug(slug);
  if (slugError) {
    return NextResponse.json({ error: slugError }, { status: 400 });
  }

  const taken = await isBlogSlugTaken(slug);
  if (taken) {
    return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
  }

  const post = await createBlogPost({ slug, title }, guard.actor.user.id);
  return NextResponse.json({ post }, { status: 201 });
}
