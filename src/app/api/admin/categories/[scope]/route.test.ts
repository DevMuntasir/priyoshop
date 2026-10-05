import { NextResponse } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { requirePermission } from '@/libs/auth/Rbac';
import { createCategory } from '@/libs/categories/CategoryRepository';
import { POST } from './route';

vi.mock(import('@/libs/auth/Rbac'), () => ({
  requirePermission: vi.fn<typeof requirePermission>(),
}));
vi.mock(import('@/libs/categories/CategoryRepository'), () => ({
  createCategory: vi.fn<typeof createCategory>(),
}));

function request(name: string) {
  return new Request('http://localhost/api/admin/categories/blog', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

describe('Category creation route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requirePermission).mockResolvedValue({
      actor: {
        user: { id: 'admin', name: 'Admin', email: 'admin@example.com' },
        permissions: ['*'],
      },
    });
    vi.mocked(createCategory).mockResolvedValue('Supply chain');
  });

  it('Rejects writes without category update permission', async () => {
    vi.mocked(requirePermission).mockResolvedValue({
      error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    });
    const response = await POST(request('Supply chain'), {
      params: Promise.resolve({ scope: 'blog' }),
    });
    expect(response.status).toBe(403);
    expect(createCategory).not.toHaveBeenCalled();
  });

  it('Uses the matching permission and scope for each catalog', async () => {
    for (const scope of ['blog', 'news']) {
      const response = await POST(request('  Supply   chain '), {
        params: Promise.resolve({ scope }),
      });
      expect(requirePermission).toHaveBeenLastCalledWith(`${scope}.update`);
      expect(createCategory).toHaveBeenLastCalledWith({ scope, name: 'Supply chain' });
      await expect(response.json()).resolves.toStrictEqual({ category: 'Supply chain' });
    }
  });

  it('Rejects unknown catalogs before writing', async () => {
    const response = await POST(request('Supply chain'), {
      params: Promise.resolve({ scope: 'users' }),
    });
    expect(response.status).toBe(400);
    expect(createCategory).not.toHaveBeenCalled();
  });

  it('Rejects blank category names before writing', async () => {
    const response = await POST(request('  '), { params: Promise.resolve({ scope: 'news' }) });
    expect(response.status).toBe(400);
    expect(createCategory).not.toHaveBeenCalled();
  });
});
