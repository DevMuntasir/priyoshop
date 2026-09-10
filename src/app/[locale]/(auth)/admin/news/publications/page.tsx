import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listNewsPublications } from '@/libs/news/NewsPublicationRepository';

export const metadata = {
  title: 'News Publications',
};

export default async function AdminNewsPublicationsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const guard = await requirePermission(PERMISSIONS.newsRead);
  if (guard.error) {
    redirect('/');
  }

  const publications = await listNewsPublications();

  return (
    <main className="space-y-6">
      <AdminPageHeader
        title="News publications"
        description="Manage the publication logos and names used on featured news cards and publication landing pages."
      />

      <div className="px-8 space-y-4">
        <div>
          <Link href="/admin/news/publications/new">
            <Button>New publication</Button>
          </Link>
        </div>

        {publications.length === 0 ? (
          <Card padding="lg">
            <Text size="body" className="text-ps-ink-600">
              No publications yet. Create one to assign it to news posts.
            </Text>
          </Card>
        ) : (
          <div className="grid gap-4">
            {publications.map((publication) => (
              <Link key={publication.publicationId} href={`/admin/news/publications/${publication.publicationId}`}>
                <Card padding="md" border className="cursor-pointer transition-shadow hover:shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="rounded-ps-md bg-white p-3 ring-1 ring-ps-grey-200 ring-inset">
                        {/* oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns */}
                        <img
                          src={publication.logo}
                          alt={publication.logoAlt ?? publication.name}
                          className="h-8 w-auto max-w-24 object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <Text size="body" weight="semibold">
                          {publication.name}
                        </Text>
                        <Text size="sm" className="text-ps-ink-600">
                          /news/publications/{publication.slug}
                        </Text>
                      </div>
                    </div>
                    {publication.websiteUrl && (
                      <Text size="xs" className="truncate text-ps-ink-600">
                        {publication.websiteUrl}
                      </Text>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
