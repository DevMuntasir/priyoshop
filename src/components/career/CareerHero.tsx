'use client';

import { useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DriftWall } from '@/components/ui/DriftWall';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

/**
 * Dynamic Career Hero section rendered from CMS content with an interactive 3D DriftWall background.
 *
 * @param props Section data resolved from CMS.
 * @returns The Career Hero section component.
 */
export function CareerHero(props: { data: ResolvedSection }) {
  const sectionRef = useRef<HTMLElement>(null);
  const resolved = resolveSectionStyle(props.data.style);
  const heading = props.data.heading;

  const cmsItems =
    props.data.items && props.data.items.length > 0
      ? props.data.items
        .filter((item) => Boolean(item.image))
        .map((item) => ({
          image: item.image as string,
          title: item.title || item.imageAlt || undefined,
          href: item.href || undefined,
        }))
      : undefined;

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[680px] lg:min-h-screen overflow-hidden flex items-center justify-center bg-[#060010] ${resolved.wrapperClass || ''}`}
    >
      {/* Interactive 3D DriftWall background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <DriftWall
          items={cmsItems && cmsItems.length > 0 ? cmsItems : undefined}
          columns={10}
          tileWidth={210}
          tileHeight={138}
          gap={18}
          tilt={16}
          turn={-14}
          perspective={1200}
          depth={120}
          speed={40}
          direction="up"
          variance={0.45}
          parallax={0.6}
          lift={64}
          fade={0.6}
          dim={0.9}

        />
      </div>

      {/* Ambient gradient vignette overlay for optimal typography legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-10 "
        aria-hidden="true"
      />

      {/* Hero foreground content */}
      <div className="relative z-20 pointer-events-none container mx-auto flex flex-col items-center justify-center px-4 pt-28 pb-14 text-center sm:px-6 sm:pt-32 lg:px-8 lg:pt-40 lg:pb-20">
        <div className="pointer-events-auto max-w-[850px] rounded-3xl bg-black/40 p-6 sm:p-10 backdrop-blur-[3px] border border-white/10 shadow-2xl">
          {heading.eyebrow ? (
            <Badge
              variant="outline"
              className="mb-4 border-white/20 bg-white/10 text-white backdrop-blur-sm"
            >
              {heading.eyebrow}
            </Badge>
          ) : null}

          <SectionHeading
            title={heading.title}
            titleColor="font-extrabold text-white"
            titleSize="display"
            titleClassName={resolved.titleSizeClass || undefined}
            description={heading.description}
            descriptionColor="text-white/90"
            align={resolved.align}
            scrollFloat={false}
          />
          {heading.ctaLabel ? (
            <Button
              variant="filled"
              tone="light"
              size="md"
              href={heading.ctaHref || '#open-positions'}
              className="mt-7 shadow-lg shadow-black/40 hover:scale-105 transition-transform"
            >
              {heading.ctaLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
