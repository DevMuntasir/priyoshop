import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import {
  getBuilderPage,
  publishBuilderPage,
  unpublishBuilderPage,
} from '@/libs/builder/BuilderPageRepository';
import { z } from 'zod';

type Context = { params: Promise<{ id: string }> };

const publishSchema = z.object({
  publish: z.boolean(),
});

export async function POST(request: Request, context: Context) {
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
  const parsed = publishSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { publish } = parsed.data;

  if (publish) {
    // Validate that the page has at least some blocks
    if (existingPage.blocks.length === 0) {
      return NextResponse.json({ error: 'Page must have at least one block to publish' }, { status: 400 });
    }

    const page = await publishBuilderPage(id, guard.actor.user.id);
    return NextResponse.json({ page });
  } else {
    const page = await unpublishBuilderPage(id, guard.actor.user.id);
    return NextResponse.json({ page });
  }
}
