import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { getNavMenu, updateNavMenu, initializeNavMenuIfNotExists } from '@/libs/builder/NavMenuRepository';
import { z } from 'zod';
import type { MenuItem } from '@/libs/builder/Types';

const menuItemSchema: z.ZodType<MenuItem> = z.lazy(() =>
  z.object({
    id: z.string(),
    label: z.string(),
    href: z.string().optional(),
    pageId: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    children: z.array(menuItemSchema).optional(),
  })
);

const updateMenuSchema = z.object({
  items: z.array(menuItemSchema),
});

export async function GET() {
  const guard = await requirePermission(PERMISSIONS.builderRead);
  if (guard.error) {
    return guard.error;
  }

  let menu = await getNavMenu();
  if (!menu) {
    menu = await initializeNavMenuIfNotExists();
  }

  return NextResponse.json({ menu });
}

export async function PATCH(request: Request) {
  const guard = await requirePermission(PERMISSIONS.builderUpdate);
  if (guard.error) {
    return guard.error;
  }

  const body = await request.json().catch(() => null);
  const parsed = updateMenuSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { items } = parsed.data;

  const menu = await updateNavMenu({
    menuId: 'main-nav',
    items,
    updatedAt: new Date(),
  });

  return NextResponse.json({ menu });
}
