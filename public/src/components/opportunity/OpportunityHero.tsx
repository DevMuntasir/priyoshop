import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { Reveal } from '@/components/ui/Reveal';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function OpportunityHero(props: { data: ResolvedSection }) {
  const { heading, style } = props.data;
  const resolved = resolveSectionStyle(style);
  const alignClass
    = resolved.align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <section
      className={`min-h-[50svh] bg-ps-white bg-linear-to-b lg:min-h-[120dvh]  ${resolved.wrapperClass}`.trim()}
      style={{ backgroundColor: heading.backgroundImage, backgroundImage: heading.backgroundImage ? `url(${heading.backgroundImage})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div
        className={`container relative mx-auto flex  min-h-[50svh] overflow-hidden px-4 pt-28 pb-12 sm:px-6 lg:min-h-[120dvh] lg:px-8 ${alignClass}`}
      >
        <div className="z-10 w-full max-w-[650px] self-center">
          <Reveal direction="up">
            <h1
              className={`m-0 font-display leading-[1.25] font-extrabold text-balance  ${resolved.titleSizeClass || 'text-ps-h2 xl:text-ps-h1 '
                } ${resolved.titleColorClass}`}
            >
              <AccentedTitle
                text={heading.title}
                emClass="bg-linear-to-r from-ps-gold-500 to-ps-red-500 bg-clip-text text-transparent"
              />
            </h1>
          </Reveal>

          {heading.description && (
            <Reveal direction="up" delay={0.1}>
              <p className="mt-7 max-w-[600px] font-body text-ps-sm font-semibold text-ps-black-400 sm:text-ps-body">
                {heading.description}
              </p>
            </Reveal>
          )}
        </div>
        {/* Animated Bangladesh map with dropping pin closing the hero */}
        {/* {heading.backgroundImage
        || heading.backgroundImageTablet
        || heading.backgroundImageLaptop
        || heading.backgroundImageDesktop ? (
          <picture className="pointer-events-none absolute top-1/2 right-[-25%] w-[90%] max-w-[800px] -translate-y-1/2 opacity-25 sm:right-[-10%] sm:w-[70%] lg:right-0 lg:opacity-100">
            {heading.backgroundImageDesktop || heading.backgroundImageLaptop || heading.backgroundImageTablet || heading.backgroundImage ? (
              <source
                media="(min-width: 1140px)"
                srcSet={heading.backgroundImageDesktop || heading.backgroundImageLaptop || heading.backgroundImageTablet || heading.backgroundImage}
              />
            ) : null}
            {heading.backgroundImageLaptop || heading.backgroundImageTablet || heading.backgroundImage ? (
              <source
                media="(min-width: 1024px)"
                srcSet={heading.backgroundImageLaptop || heading.backgroundImageTablet || heading.backgroundImage}
              />
            ) : null}
            {heading.backgroundImageTablet || heading.backgroundImage ? (
              <source
                media="(min-width: 768px)"
                srcSet={heading.backgroundImageTablet || heading.backgroundImage}
              />
            ) : null}
            <img
              src={heading.backgroundImage || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
              alt=""
              className="h-auto w-full object-contain"
              width={800}
              height={600}
            />
          </picture>
        ) : null} */}
      </div>
    </section>
  );
}
