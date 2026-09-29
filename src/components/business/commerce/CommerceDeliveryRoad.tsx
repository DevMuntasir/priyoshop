'use client';

import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { Image } from '@/components/ui/Image';
import { Reveal } from '@/components/ui/Reveal';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function CommerceDeliveryRoad(props: { data: ResolvedSection }) {
  const { heading } = props.data;
  const imageSrc = heading.backgroundImage?.trim() || '/about/village.webp';

  return (
    <section className="relative bg-white pt-12 sm:pt-16 lg:pt-20">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[780px]">
          <Reveal direction="up">
            <h1 className="m-0 font-display text-ps-h3 font-extrabold leading-[1.35] lg:text-ps-h2">
              <AccentedTitle
                text={heading.title}
                emClass="text-gradient"
              />
            </h1>
          </Reveal>

          {heading.description && (
            <Reveal direction="up" delay={0.1}>
              <p className="mx-auto mt-3 max-w-2xl font-body text-ps-sm font-semibold text-ps-black-400 sm:text-ps-body">
                {heading.description}
              </p>
            </Reveal>
          )}
        </div>
      </div>

      {heading.backgroundImageDesktop || heading.backgroundImageLaptop || heading.backgroundImageTablet ? (
        <picture className="w-full">
          {heading.backgroundImageDesktop && (
            <source media="(min-width: 1140px)" srcSet={heading.backgroundImageDesktop} />
          )}
          {heading.backgroundImageLaptop && (
            <source media="(min-width: 1024px)" srcSet={heading.backgroundImageLaptop} />
          )}
          {heading.backgroundImageTablet && (
            <source media="(min-width: 768px)" srcSet={heading.backgroundImageTablet} />
          )}
          <Image
            src={imageSrc}
            alt={heading.title || ''}
            width={1400}
            height={700}
            className="-mt-[20px] h-auto w-full object-cover lg:-mt-[190px]"
          />
        </picture>
      ) : (
        <Image
          src={imageSrc}
          alt={heading.title || ''}
          width={1400}
          height={700}
          className="-mt-[20px] h-auto w-full object-cover lg:-mt-[190px]"
        />
      )}
    </section>
  );
}
