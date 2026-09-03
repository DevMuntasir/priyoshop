import { redirect } from 'next/navigation';
import { requirePermission } from '@/libs/auth/Rbac';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { listBuilderPages } from '@/libs/builder/BuilderPageRepository';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Stack } from '@/components/ui/Grid';
import Link from 'next/link';

export const metadata = {
  title: 'Page Builder',
};

export default async function PageBuilderListPage() {
  const guard = await requirePermission(PERMISSIONS.builderRead);
  if (guard.error) {
    redirect('/');
  }

  const pages = await listBuilderPages();

  return (
    <main className="space-y-6">
      <AdminPageHeader
        title="Page Builder"
        description="Create and manage custom pages with drag-and-drop blocks"
      />

      <div>
        <Link href="/admin/page-builder/new">
          <Button>Create New Page</Button>
        </Link>
      </div>

      {pages.length === 0 ? (
        <Card padding="lg">
          <Text size="body" className="text-ps-ink-600">
            No pages yet. Create one to get started.
          </Text>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pages.map((page) => (
            <Link key={page.pageId} href={`/admin/page-builder/${page.pageId}`}>
              <Card padding="md" border className="hover:shadow-md transition-shadow cursor-pointer">
                <Stack gap="sm">
                  <Stack direction="row" align="center" gap="md">
                    <div className="flex-1">
                      <Text size="body" weight="semibold">
                        {page.title}
                      </Text>
                      <Text size="sm" className="text-ps-ink-600">
                        /{page.slug}
                      </Text>
                    </div>
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-ps-sm text-ps-xs font-semibold ${
                          page.status === 'published'
                            ? 'bg-ps-green-tint text-ps-black'
                            : 'bg-ps-grey-100 text-ps-ink-600'
                        }`}
                      >
                        {page.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </Stack>
                  <Text size="xs" className="text-ps-ink-600">
                    {page.blocks.length} blocks
                  </Text>
                </Stack>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
