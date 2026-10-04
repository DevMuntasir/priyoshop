import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ContentList } from '@/components/admin/content/ContentList';
import { Button } from '@/components/ui/Button';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listNewsPosts } from '@/libs/news/NewsPostRepository';

export const metadata = { title: 'News' };

export default async function AdminNewsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const guard = await requirePermission(PERMISSIONS.newsRead);
  if (guard.error) {
    redirect('/');
  }

  const entries = await listNewsPosts();

  return (
    <main>
      <AdminPageHeader
        title="News"

        action={
          <div className="flex flex-wrap gap-3">
            <Button href="/admin/news/publications" variant="outlined">
              Manage publications
            </Button>
            <Button href="/admin/news/new" tone="brand">
              New post
            </Button>
          </div>
        }
      />
      <ContentList
        title="News posts"
        description="Search and manage your latest 200 news posts."
        dateHeading="Publish date"
        createHref="/admin/news/new"
        createLabel="New post"
        items={entries.map((entry) => ({
          id: entry.postId,
          title: entry.content.en?.title?.trim() ? entry.content.en.title : entry.slug,
          subtitle: entry.newsLink?.trim() ? entry.newsLink : `/news/${entry.slug}`,
          href: `/admin/news/${entry.postId}`,
          categories: entry.categories,
          status: entry.status,
          date: entry.publishedAt.toISOString(),
          dateLabel: entry.publishedAt.toLocaleDateString('en-GB', {
            timeZone: 'UTC',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          featured: entry.featured,
        }))}
      />
    </main>
  );
}
