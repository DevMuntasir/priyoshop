import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import {
  getBuilderPage,
  updateBuilderPage,
  deleteBuilderPage,
  isSlugTaken,
} from '@/libs/builder/BuilderPageRepository';
import { validateSlug } from '@/libs/builder/slugValidation';
import { z } from 'zod';
import type { Block } from '@/libs/builder/Types';

type Context = { params: Promise<{ id: string }> };

const updatePageSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  blocks: z.array(z.any()).optional(),
  seo: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    })
    .optional(),
});

export async function GET(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.builderRead);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const page = await getBuilderPage(id);

  if (!page) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ page });
}

export async function PATCH(request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.builderUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const existingPage = await getBuilderPage(id);

  if (!existingPage) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = updatePageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { slug, title, blocks, seo } = parsed.data;

  // If slug is being changed, validate it
  if (slug && slug !== existingPage.slug) {
    const slugError = validateSlug(slug);
    if (slugError) {
      return NextResponse.json({ error: slugError }, { status: 400 });
    }

    const taken = await isSlugTaken(slug, id);
    if (taken) {
      return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
    }
  }

  const updates: Parameters<typeof updateBuilderPage>[1] = {};
  if (title !== undefined) updates.title = title;
  if (slug !== undefined) updates.slug = slug;
  if (blocks !== undefined) updates.blocks = blocks as Block[];
  if (seo !== undefined) updates.seo = seo;

  const updated = await updateBuilderPage(id, updates, guard.actor.user.id);
  return NextResponse.json({ page: updated });
}

export async function DELETE(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.builderUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const success = await deleteBuilderPage(id);

  if (!success) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
