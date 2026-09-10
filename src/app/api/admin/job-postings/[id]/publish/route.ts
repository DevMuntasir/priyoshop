import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { updateJobPosting } from '@/libs/career/CareerRepository';

const publishSchema = z.object({
  publish: z.boolean(),
});

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.careerUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = publishSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const job = await updateJobPosting(
    id,
    { status: parsed.data.publish ? 'published' : 'draft' },
    guard.actor.user.id,
  );
  if (!job) {
    return NextResponse.json({ error: 'Job posting not found' }, { status: 404 });
  }

  return NextResponse.json({ job });
}
