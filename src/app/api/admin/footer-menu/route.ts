import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import {
  getFooterMenu,
  initializeFooterMenuIfNotExists,
  updateFooterMenu,
} from '@/libs/builder/FooterMenuRepository';
import type { FooterSocialLink, MenuItem } from '@/libs/builder/Types';

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

const footerSocialLinkSchema: z.ZodType<FooterSocialLink> = z.object({
  id: z.string(),
  platform: z.enum(['x', 'instagram', 'linkedin', 'facebook']),
  label: z.string(),
  href: z.string(),
});

const updateMenuSchema = z.object({
  items: z.array(menuItemSchema),
  settings: z.object({
    logoUrl: z.string(),
    logoAlt: z.string(),
    socialLinks: z.array(footerSocialLinkSchema),
  }),
});

export async function GET() {
  const guard = await requirePermission(PERMISSIONS.builderRead);
  if (guard.error) {
    return guard.error;
  }

  let menu = await getFooterMenu();
  if (!menu) {
    menu = await initializeFooterMenuIfNotExists();
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

  const menu = await updateFooterMenu({
    menuId: 'footer-nav',
    items: parsed.data.items,
    settings: parsed.data.settings,
    updatedAt: new Date(),
  });

  return NextResponse.json({ menu });
}
