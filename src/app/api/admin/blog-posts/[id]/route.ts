import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { deleteBlogPost, getBlogPost, isBlogSlugTaken, updateBlogPost } from '@/libs/media/BlogPostRepository';
import { validateBlogSlug } from '@/libs/media/blogSlug';
import { updateBlogPostSchema } from '@/libs/media/blogValidation';
import { sanitizeBlogHtml } from '@/libs/media/sanitizeBlogHtml';
import type { BlogPostDoc, BlogPostLocaleContent } from '@/libs/media/Types';

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.blogRead);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const post = await getBlogPost(id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PATCH(request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.blogUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = updateBlogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { slug, content, publishedAt, ...rest } = parsed.data;

  const updates: Partial<BlogPostDoc> = { ...rest };

  if (slug !== undefined) {
    const slugError = validateBlogSlug(slug);
    if (slugError) {
      return NextResponse.json({ error: slugError }, { status: 400 });
    }
    if (await isBlogSlugTaken(slug, id)) {
      return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
    }
    updates.slug = slug;
  }

  if (content !== undefined) {
    // Sanitize every locale's rich text on write; rendering trusts the DB.
    const sanitized: Record<string, BlogPostLocaleContent> = {
      en: { ...content.en, contentHtml: sanitizeBlogHtml(content.en.contentHtml) },
    };
    if (content.bn) {
      sanitized.bn = {
        title: content.bn.title ?? '',
        excerpt: content.bn.excerpt ?? '',
        contentHtml: sanitizeBlogHtml(content.bn.contentHtml ?? ''),
        metaTitle: content.bn.metaTitle,
        metaDescription: content.bn.metaDescription,
      };
    }
    updates.content = sanitized;
  }

  if (publishedAt !== undefined) {
    updates.publishedAt = new Date(publishedAt);
  }

  const post = await updateBlogPost(id, updates, guard.actor.user.id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.blogUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const deleted = await deleteBlogPost(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
