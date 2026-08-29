'use client';

import type { Align } from '@/libs/cms/StyleTokens';
import { Button } from './Button';
import { Icon } from './Icon';
import { MediaCard } from './MediaCard';
import { Reveal, RevealGroup } from './Reveal';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';

type Post = {
  tag?: string;
  ttl: string;
  date: string;
  img: string;
  href?: string;
};

export type BlogsBlockProps = {
  base?: string;
  align?: Align;
  eyebrow?: string;
  title?: string;
  posts?: Post[];
  cta?: string;
  ctaHref?: string;
};

const DEFAULT_POSTS: Post[] = [
  {
    tag: 'Retail Tips',
    ttl: "Five ways smart restocking boosts a corner shop's monthly margin",
    date: '08 Jun 2026',
    img: '/blogs/1.png',
  },
  {
    tag: 'Distribution',
    ttl: 'What last-mile logistics looks like across 48 districts',
    date: '29 May 2026',
    img: '/blogs/2.png',
  },
  {
    tag: 'Finance',
    ttl: 'Working capital, explained: stocking more without the cash-flow gap',
    date: '14 May 2026',
    img: '/blogs/3.png',
  },
];

/* "Read our Blogs" — insights cards grid. */
export function BlogsBlock({
  base = '',
  align = 'left',
  eyebrow = 'Insights',
  title = 'Read our Blogs',
  posts = DEFAULT_POSTS,
  cta = 'Read All Blogs',
  ctaHref,
}: BlogsBlockProps) {
  return (
    <Section>
      <div className="mx-auto w-full">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
          <Reveal direction="left">
            <SectionHeading titleSize="h2" eyebrow={eyebrow} title={title} align={align} />
          </Reveal>
          {cta ? (
            <Reveal direction="right" delay={0.15}>
              <Button variant="ghost" iconRight={<Icon name="arrow-right" />} href={ctaHref}>
                {cta}
              </Button>
            </Reveal>
          ) : null}
        </div>
        <RevealGroup
          stagger={0.12}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((b) => (
            <Reveal item direction="up" key={b.ttl}>
              <MediaCard
                image={`${base}${b.img}`}
                title={b.ttl}
                date={b.date}
                href={b.href ?? '#'}
                onClick={
                  b.href
                    ? undefined
                    : (e) => {
                        e.preventDefault();
                      }
                }
              />
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
