'use client';

import type * as React from 'react';
import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { Badge } from '@/components/ui/Badge';
import { EcosystemCard } from '@/components/ui/EcosystemCard';
import type { EcosystemCardProps } from '@/components/ui/EcosystemCard';
import { ScrollFocusStack } from '@/components/ui/ScrollFocusStack';
import { Section } from '@/components/ui/Section';
import { findLastTextMatch, resolveAccent, SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

function renderEcosystemTitle(item: SectionItem): React.ReactNode {
  const title = item.title ?? '';
  const accentWords = item.accentWords?.trim();
  const accentColor =
    item.accentGradientFrom && item.accentGradientTo
      ? `linear-gradient(90deg, ${item.accentGradientFrom}, ${item.accentGradientTo})`
      : item.accentColor;

  if (accentWords) {
    const resolvedAccent = resolveAccent(accentColor || 'text-ps-red-600');
    const match = findLastTextMatch(title, accentWords);
    if (match) {
      return (
        <>
          {title.slice(0, match.index)}
          <span className={resolvedAccent.className} style={resolvedAccent.style}>
            {title.slice(match.index, match.index + match.length)}
          </span>
          {title.slice(match.index + match.length)}
        </>
      );
    }
  }

  if (title.includes('*') || title.includes('~') || title.includes('_') || title.includes('\n')) {
    return <AccentedTitle text={title} />;
  }

  return title;
}

export function Ecosystems(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const cards: EcosystemCardProps[] = props.data.items
    .filter((item) => [item.title, item.image].some(Boolean))
    .map((item) => ({
      title: renderEcosystemTitle(item),
      body: item.body,
      image: item.image,
      imageAlt: item.imageAlt,
      ctaLabel: item.ctaLabel,
      href: item.href,
      reverse: item.reverse,
      design: item.style,
    }));

  return (
    <ScrollFocusStack
      className={`bg-ps-gray-100 w-full ${resolved.wrapperClass}`.trim()}
      items={cards}
      stage={Section}
      header={
        <>
          {props.data.heading.eyebrow && (
            <Badge className="mx-auto mb-4" variant="outline">
              {props.data.heading.eyebrow}
            </Badge>
          )}
          <SectionHeading
            title={
              <AccentedTitle text={props.data.heading.title} emClass="bg-gradient-to-r font-extrabold from-ps-red-500 to-yellow-500 bg-clip-text text-transparent" />
            }
            description={props.data.heading.description}
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

