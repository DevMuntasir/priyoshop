import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { createCategory } from '@/libs/categories/CategoryRepository';
import { categoryScopeSchema, createCategorySchema } from '@/libs/categories/CategoryValidation';

export async function POST(request: Request, context: { params: Promise<{ scope: string }> }) {
  const params = await context.params;
  const scope = categoryScopeSchema.safeParse(params.scope);
  if (!scope.success) {
    return NextResponse.json({ error: 'Unknown category type.' }, { status: 400 });
  }
  const guard = await requirePermission(
    scope.data === 'blog' ? PERMISSIONS.blogUpdate : PERMISSIONS.newsUpdate,
  );
  if (guard.error) {
    return guard.error;
  }
  const parsed = createCategorySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Enter a category name between 1 and 40 characters.' },
      { status: 400 },
    );
  }
  const category = await createCategory({ scope: scope.data, name: parsed.data.name });
  return NextResponse.json({ category });
}
