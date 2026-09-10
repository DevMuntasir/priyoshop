import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { getNewsPublication } from '@/libs/news/NewsPublicationRepository';
import type { NewsPostDoc, NewsPostLocaleContent } from '@/libs/news/Types';
import { deleteNewsPost, getNewsPost, isNewsSlugTaken, updateNewsPost } from '@/libs/news/NewsPostRepository';
import { validateNewsSlug } from '@/libs/news/newsSlug';
import { updateNewsPostSchema } from '@/libs/news/newsValidation';
import { sanitizeNewsHtml } from '@/libs/news/sanitizeNewsHtml';

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.newsRead);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const post = await getNewsPost(id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PATCH(request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.newsUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = updateNewsPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const {
    slug,
    content,
    publishedAt,
    publicationId,
    ...rest
  } = parsed.data;

  const updates: Omit<Partial<NewsPostDoc>, 'publicationId'> & {
    publicationId?: string | null;
  } = { ...rest };

  if (slug !== undefined) {
    const slugError = validateNewsSlug(slug);
    if (slugError) {
      return NextResponse.json({ error: slugError }, { status: 400 });
    }
    if (await isNewsSlugTaken(slug, id)) {
      return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
    }
    updates.slug = slug;
  }

  if (content !== undefined) {
    // Sanitize every locale's rich text on write; rendering trusts the DB.
    const sanitized: Record<string, NewsPostLocaleContent> = {
      en: { ...content.en, contentHtml: sanitizeNewsHtml(content.en.contentHtml) },
    };
    if (content.bn) {
      sanitized.bn = {
        title: content.bn.title ?? '',
        excerpt: content.bn.excerpt ?? '',
        contentHtml: sanitizeNewsHtml(content.bn.contentHtml ?? ''),
        metaTitle: content.bn.metaTitle,
        metaDescription: content.bn.metaDescription,
      };
    }
    updates.content = sanitized;
  }

  if (publishedAt !== undefined) {
    updates.publishedAt = new Date(publishedAt);
  }

  if (publicationId !== undefined) {
    if (publicationId) {
      const publication = await getNewsPublication(publicationId);
      if (!publication) {
        return NextResponse.json({ error: 'Publication not found' }, { status: 400 });
      }
      updates.publicationId = publicationId;
    } else {
      updates.publicationId = null;
    }
  }

  const post = await updateNewsPost(id, updates, guard.actor.user.id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.newsUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const deleted = await deleteNewsPost(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
