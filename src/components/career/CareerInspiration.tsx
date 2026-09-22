import { Badge } from '@/components/ui/Badge';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';
import { InspiringStories, type InspiringStory } from './InspiringStories';

const DEFAULT_STORIES: InspiringStory[] = [
  {
    id: 'sharmin-akter',
    image: '/career/1.png',
    name: 'Sharmin Akter',
    description:
      'Sharmin consistently cultivates a positive and supportive office culture by organizing wellness programs and encouraging open communication. She creates a caring environment where every team member feels valued, motivated, and empowered to contribute their best work.',
  },
  {
    id: 'arafat-shimanto',
    image: '/career/2.png',
    name: 'Arafat Shimanto',
    description:
      'Arafat turns ambitious ideas into thoughtful solutions through curiosity, collaboration, and a willingness to keep learning. His energy helps the team approach every challenge with confidence.',
  },
  {
    id: 'amlan-saha',
    image: '/career/3.png',
    name: 'Amlan Saha',
    description:
      'Amlan brings clarity and ownership to every project while making space for the people around him to grow. His collaborative approach helps the team achieve meaningful results together.',
  },
];

/** Displays employee stories in an interactive card row with CMS section content. */
export function CareerInspiration(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const heading = props.data.heading;

  const stories: InspiringStory[] =
    props.data.items.length > 0
      ? props.data.items.map((item, index) => ({
          id: item.name ? item.name.toLowerCase().replace(/\s+/g, '-') : `story-${index}`,
          image: item.image || `/career/${(index % 3) + 1}.png`,
          name: item.name || item.title || '',
          description: item.description || item.body || '',
        }))
      : DEFAULT_STORIES;

  return (
    <section className={`${resolved.wrapperClass} bg-about-gradient py-20`}>
      <div className="container mx-auto flex flex-col items-center px-4 pb-16 lg:pb-24">
        {heading.eyebrow ? <Badge variant="outline">{heading.eyebrow}</Badge> : null}
        <h2 className="mt-4 mb-10 font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4 lg:mb-14">
          {heading.title}
        </h2>
        <InspiringStories stories={stories} />
      </div>
    </section>
  );
}
