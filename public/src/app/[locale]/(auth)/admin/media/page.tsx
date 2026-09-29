import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Stack } from '@/components/ui/Grid';
import { Text } from '@/components/ui/Text';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listBlogPosts } from '@/libs/media/BlogPostRepository';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Blog & Media',
};

export default async function AdminMediaPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const guard = await requirePermission(PERMISSIONS.blogRead);
  if (guard.error) {
    redirect('/');
  }

  const posts = await listBlogPosts();

  return (
    <main className="space-y-6 ">
      <AdminPageHeader
        title="Blog & Media"
        description="Write, publish and manage the blog posts shown on the public Media page."
      />

      <div className="px-8  space-y-4">
        <div>
          <Link href="/admin/media/new">
            <Button>New post</Button>
          </Link>
        </div>

        {posts.length === 0 ? (
          <Card padding="lg">
            <Text size="body" className="text-ps-ink-600">
              No posts yet. Create one to get started.
            </Text>
          </Card>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <Link key={post.postId} href={`/admin/media/${post.postId}`}>
                <Card padding="md" border className="cursor-pointer transition-shadow hover:shadow-md">
                  <Stack gap="sm">
                    <Stack direction="row" align="center" gap="md" className='flex w-full justify-between'>
                      <div className="flex-1">
                        <Text size="body" weight="semibold">
                          {post.content.en?.title || post.slug}
                        </Text>
                        <Text size="sm" className="text-ps-ink-600">
                          /media/{post.slug}
                        </Text>
                      </div>
                      <div className="flex gap-2">
                        {post.featured && (
                          <span className="inline-block rounded-ps-sm bg-ps-cream-yellow px-3 py-1 text-ps-xs font-semibold text-ps-gold-ink">
                            Featured
                          </span>
                        )}
                        <span
                          className={`inline-block rounded-ps-sm px-3 py-1 text-ps-xs font-semibold ${post.status === 'published'
                            ? 'bg-ps-green-tint text-ps-black'
                            : 'bg-ps-grey-100 text-ps-ink-600'
                            }`}
                        >
                          {post.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </Stack>
                    <Text size="xs" className="text-ps-ink-600">
                      {post.categories.join(', ') || 'No categories'} ·{' '}
                      {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Text>
                  </Stack>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
