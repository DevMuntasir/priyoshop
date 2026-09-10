import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listBuilderPages, createBuilderPage, isSlugTaken } from '@/libs/builder/BuilderPageRepository';
import { validateSlug } from '@/libs/builder/slugValidation';
import { z } from 'zod';

const createPageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
});

export async function GET() {
  const guard = await requirePermission(PERMISSIONS.builderRead);
  if (guard.error) {
    return guard.error;
  }

  const pages = await listBuilderPages();
  return NextResponse.json({ pages });
}

export async function POST(request: Request) {
  const guard = await requirePermission(PERMISSIONS.builderUpdate);
  if (guard.error) {
    return guard.error;
  }

  const body = await request.json().catch(() => null);
  const parsed = createPageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { slug, title } = parsed.data;

  // Validate slug
  const slugError = validateSlug(slug);
  if (slugError) {
    return NextResponse.json({ error: slugError }, { status: 400 });
  }

  // Check if slug is already taken
  const taken = await isSlugTaken(slug);
  if (taken) {
    return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
  }

  const page = await createBuilderPage(slug, title, guard.actor.user.id);
  return NextResponse.json({ page }, { status: 201 });
}
