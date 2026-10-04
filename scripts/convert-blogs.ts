import fs from 'node:fs';
import path from 'node:path';
import { sanitizeBlogHtml } from '@/libs/media/sanitizeBlogHtml';
import { BLOG_CATEGORIES } from '@/libs/media/Categories';

const xmlPath = path.resolve('scripts/blogs.xml');
const content = fs.readFileSync(xmlPath, 'utf-8');

const itemRegex = /<item>([\s\S]*?)<\/item>/g;
const items: string[] = [];
let match;
while ((match = itemRegex.exec(content)) !== null) {
  if (match[1]) items.push(match[1]);
}

const getTagValue = (xml: string, tag: string): string => {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tag}>`, 'i');
  const m = xml.match(regex);
  if (!m) return '';
  return (m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2] : '').trim();
};

const getCategories = (xml: string): string[] => {
  const catRegex = /<category\s+domain="category"[^>]*>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/category>/gi;
  const categories: string[] = [];
  let m;
  while ((m = catRegex.exec(xml)) !== null) {
    const val = (m[1] || m[2] || '').trim();
    if (val && !categories.includes(val)) {
      categories.push(val);
    }
  }
  return categories;
};

const getPostMeta = (xml: string): Record<string, string> => {
  const metaRegex = /<wp:postmeta>[\s\S]*?<wp:meta_key>(?:<!\[CDATA\[(.*?)\]\]>|(.*?))<\/wp:meta_key>[\s\S]*?<wp:meta_value>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?))<\/wp:meta_value>[\s\S]*?<\/wp:postmeta>/gi;
  const meta: Record<string, string> = {};
  let m;
  while ((m = metaRegex.exec(xml)) !== null) {
    const key = (m[1] || m[2] || '').trim();
    const val = (m[3] || m[4] || '').trim();
    if (key) meta[key] = val;
  }
  return meta;
};

const parsedItems = items.map((itemXml) => {
  const meta = getPostMeta(itemXml);
  return {
    title: getTagValue(itemXml, 'title'),
    link: getTagValue(itemXml, 'link'),
    pubDate: getTagValue(itemXml, 'pubDate'),
    creator: getTagValue(itemXml, 'dc:creator'),
    guid: getTagValue(itemXml, 'guid'),
    description: getTagValue(itemXml, 'description'),
    content: getTagValue(itemXml, 'content:encoded'),
    excerpt: getTagValue(itemXml, 'excerpt:encoded'),
    post_id: getTagValue(itemXml, 'wp:post_id'),
    post_date: getTagValue(itemXml, 'wp:post_date'),
    post_name: getTagValue(itemXml, 'wp:post_name'),
    status: getTagValue(itemXml, 'wp:status'),
    post_type: getTagValue(itemXml, 'wp:post_type'),
    categories: getCategories(itemXml),
    thumbnail_id: meta['_thumbnail_id'],
    yoast_title: meta['_yoast_wpseo_title'],
    yoast_desc: meta['_yoast_wpseo_metadesc'],
    attachment_url: getTagValue(itemXml, 'wp:attachment_url'),
    meta,
  };
});

const attachmentsMap = new Map<string, string>();
for (const item of parsedItems) {
  if (item.post_type === 'attachment') {
    attachmentsMap.set(item.post_id, item.attachment_url || item.guid);
  }
}

// Category mapping to system categories
const categoryMap: Record<string, string> = {
  'B2B': 'B2B distribution',
  'MSMEs': 'Retail',
  'Marketplace': 'Distribution',
  'Industry': 'Supply chain',
  'Employee Branding': 'Retail',
  'Blog': 'Retail',
  'Uncategorized': 'Retail',
  'News': 'Retail',
};

const mapCategories = (cats: string[]): string[] => {
  const mapped = new Set<string>();
  for (const c of cats) {
    if (categoryMap[c]) {
      mapped.add(categoryMap[c]);
    } else if ((BLOG_CATEGORIES as readonly string[]).includes(c)) {
      mapped.add(c);
    }
  }
  if (mapped.size === 0) {
    mapped.add('Retail');
  }
  return Array.from(mapped);
};

const cleanHtml = (rawHtml: string): string => {
  let cleaned = rawHtml.replace(/<!--\s*\/?wp:[^>]*-->/gi, '');
  cleaned = sanitizeBlogHtml(cleaned);
  return cleaned.trim();
};

const extractExcerpt = (excerpt: string, html: string, maxLength = 250): string => {
  if (excerpt && excerpt.trim()) {
    return excerpt.trim().replace(/\s+/g, ' ').slice(0, maxLength);
  }
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Filter out junk / empty draft posts
const validPosts = parsedItems.filter((i) => {
  if (i.post_type !== 'post') return false;
  if (!i.title || i.title === 'Test' || i.title.startsWith('Elementor #')) return false;
  if (!i.content && i.status === 'draft') return false;
  return true;
});

// Sort so published posts come first (for slug priority)
validPosts.sort((a, b) => (b.status === 'publish' ? 1 : 0) - (a.status === 'publish' ? 1 : 0));

const seenSlugs = new Set<string>();
const formattedPosts = [];

for (let i = 0; i < validPosts.length; i++) {
  const p = validPosts[i]!;
  let baseSlug = p.post_name ? slugify(p.post_name) : slugify(p.title);
  if (!baseSlug) baseSlug = `post-${p.post_id}`;

  let slug = baseSlug;
  let counter = 1;
  while (seenSlugs.has(slug)) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
  seenSlugs.add(slug);

  const contentHtml = cleanHtml(p.content);
  const excerpt = extractExcerpt(p.excerpt, contentHtml, 300);
  const coverImage = (p.thumbnail_id ? attachmentsMap.get(p.thumbnail_id) : '') || '';
  const status = p.status === 'publish' ? 'published' : 'draft';
  const publishedAt = p.post_date ? new Date(p.post_date).toISOString() : new Date().toISOString();
  const categories = mapCategories(p.categories);
  const cleanTitle = p.title
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&amp;/g, '&')
    .trim();

  formattedPosts.push({
    old_id: p.post_id,
    slug,
    title: cleanTitle,
    excerpt,
    contentHtml,
    categories,
    coverImage,
    coverImageAlt: cleanTitle,
    status,
    featured: i < 4 && status === 'published',
    publishedAt,
    metaTitle: p.yoast_title || '',
    metaDescription: p.yoast_desc || '',
  });
}

// Sort newest first by publishedAt
formattedPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

// Save to JSON
fs.writeFileSync('scripts/formatted_blogs.json', JSON.stringify(formattedPosts, null, 2), 'utf-8');
console.log(`Saved ${formattedPosts.length} clean formatted posts to scripts/formatted_blogs.json`);

// Create CSV format for Excel
const csvHeader = ['old_id', 'slug', 'title', 'excerpt', 'categories', 'coverImage', 'status', 'featured', 'publishedAt', 'metaTitle', 'metaDescription', 'contentHtml'];
const csvEscape = (val: unknown) => {
  const str = String(val ?? '').replace(/"/g, '""');
  return `"${str}"`;
};

const csvRows = [
  csvHeader.join(','),
  ...formattedPosts.map(p => [
    csvEscape(p.old_id),
    csvEscape(p.slug),
    csvEscape(p.title),
    csvEscape(p.excerpt),
    csvEscape(p.categories.join('; ')),
    csvEscape(p.coverImage),
    csvEscape(p.status),
    csvEscape(p.featured),
    csvEscape(p.publishedAt),
    csvEscape(p.metaTitle),
    csvEscape(p.metaDescription),
    csvEscape(p.contentHtml),
  ].join(','))
];

fs.writeFileSync('scripts/formatted_blogs.csv', csvRows.join('\n'), 'utf-8');
console.log(`Saved Excel-ready CSV to scripts/formatted_blogs.csv`);
