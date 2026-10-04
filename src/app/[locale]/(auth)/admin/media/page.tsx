import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ContentList } from '@/components/admin/content/ContentList';
import { Button } from '@/components/ui/Button';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listBlogPosts } from '@/libs/media/BlogPostRepository';

export const metadata = { title: 'Blogs' };

export default async function AdminMediaPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const guard = await requirePermission(PERMISSIONS.blogRead);
  if (guard.error) {
    redirect('/');
  }

  const entries = await listBlogPosts();

  return (
    <main>
      <AdminPageHeader
        title="Blogs"
        description="Create, organize and publish stories for your website."
        action={
          <div className="flex flex-wrap gap-3">
            <Button href="/admin/media/new" tone="brand">
              New post
            </Button>
          </div>
        }
      />
      <ContentList
        title="Blog posts"
        description="Search and manage your latest 200 blog posts."
        dateHeading="Publish date"
        createHref="/admin/media/new"
        createLabel="New post"
        items={entries.map((entry) => ({
          id: entry.postId,
          title: entry.content.en?.title?.trim() ? entry.content.en.title : entry.slug,
          subtitle: `/media/${entry.slug}`,
          href: `/admin/media/${entry.postId}`,
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
