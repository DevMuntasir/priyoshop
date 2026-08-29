'use client';

import { Badge } from '@/components/ui/Badge';
import { EcosystemCard } from '@/components/ui/EcosystemCard';
import type { EcosystemCardProps } from '@/components/ui/EcosystemCard';
import { ScrollFocusStack } from '@/components/ui/ScrollFocusStack';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function Ecosystems(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);
  const cards: EcosystemCardProps[] = items
    .filter((item) => [item.title, item.image].some(Boolean))
    .map((item) => ({
      title: item.title,
      body: item.body,
      image: item.image,
      imageAlt: item.imageAlt,
      ctaLabel: item.ctaLabel,
      href: item.href,
      reverse: item.reverse,
    }));

  return (
    <ScrollFocusStack
      className={`bg-ps-gray-100 w-full ${resolved.wrapperClass}`.trim()}
      items={cards}
      stage={Section}
      header={
        <>
          {heading.eyebrow && (
            <Badge className="mx-auto mb-4" variant="outline">
              {heading.eyebrow}
            </Badge>
          )}
          <SectionHeading
            title={heading.title}
            description={heading.description}
            align={resolved.align}
            titleColor={resolved.titleColorClass}
          />
        </>
      }
      renderItem={(card) => <EcosystemCard {...card} />}
      getKey={(card, i) => (typeof card.title === 'string' ? card.title : i)}
      // Tune feel without touching any UI:
      config={{
        itemHeight: 348, // keep equal to EcosystemCard height
        vhPerItem: 60, // ~1 scroll = 1 card with snap
        spacing: 285, // peek at next/prev cards
        // maxBlur: 6,
        spring: { stiffness: 80, damping: 18, mass: 0.5 }, // snappier response to scroll
      }}
    />
  );
}
