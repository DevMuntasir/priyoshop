import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { updateBlogPost } from '@/libs/media/BlogPostRepository';

const publishSchema = z.object({
  publish: z.boolean(),
});

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.blogUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = publishSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const post = await updateBlogPost(
    id,
    { status: parsed.data.publish ? 'published' : 'draft' },
    guard.actor.user.id,
  );
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ post });
}
