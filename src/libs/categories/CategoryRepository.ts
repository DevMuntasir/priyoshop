import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import { BLOG_CATEGORIES } from '@/libs/media/Categories';
import { NEWS_CATEGORIES } from '@/libs/news/Categories';
import type { CategoryScope } from './CategoryValidation';

type CategoryDoc = { _id: string; scope: CategoryScope; name: string };
const collection = () => getDb().collection<CategoryDoc>(COLLECTIONS.contentCategory);

export async function listCategories(scope: CategoryScope) {
  const [saved, used] = await Promise.all([
    collection().find({ scope }).toArray(),
    getDb()
      .collection<{ categories: string[] }>(
        scope === 'blog' ? COLLECTIONS.blogPost : COLLECTIONS.newsPost,
      )
      .distinct('categories'),
  ]);
  const defaults = scope === 'blog' ? BLOG_CATEGORIES : NEWS_CATEGORIES;
  return [...new Set([...defaults, ...used, ...saved.map((category) => category.name)])].toSorted();
}

export async function createCategory(props: { scope: CategoryScope; name: string }) {
  const categories = await listCategories(props.scope);
  const existing = categories.find((name) => name.toLowerCase() === props.name.toLowerCase());
  if (existing) {
    return existing;
  }
  // The built-in unique _id index makes concurrent requests reuse one category.
  const category = await collection().findOneAndUpdate(
    { _id: `${props.scope}:${props.name.toLowerCase()}` },
    { $setOnInsert: { scope: props.scope, name: props.name } },
    { upsert: true, returnDocument: 'after' },
  );
  return category?.name ?? props.name;
}
