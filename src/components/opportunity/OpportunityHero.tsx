import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { Reveal } from '@/components/ui/Reveal';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';
import Image from 'next/image';

export function OpportunityHero(props: { data: ResolvedSection }) {
  const { heading, style } = props.data;
  const resolved = resolveSectionStyle(style);
  const alignClass
    = resolved.align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <section
      className={`bg-linear-to-b h-screen bg-ps-white ${resolved.wrapperClass}`.trim()}
    >
      <div
        className={`container relative mx-auto flex   ${alignClass} h-full  `}
      >
        <div className="max-w-[700px]  w-full self-center z-10  ">
          <Reveal direction="up">
            <h1
              className={`m-0 font-display leading-[1.25] font-extrabold text-balance  ${resolved.titleSizeClass || 'text-ps-h4 sm:text-ps-h3 lg:text-ps-h2 xl:text-ps-h1 '
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
              <p className="mx-auto mt-7 max-w-2xl font-body text-ps-sm font-semibold text-ps-black-400 sm:text-ps-body">
                {heading.description}
              </p>
            </Reveal>
          )}
        </div>
        {/* Animated Bangladesh map with dropping pin closing the hero */}
        {heading.backgroundImage
          ?

          <Image src={heading.backgroundImage} alt="Bangladesh Map" className='absolute right-0 top-[50%] -translate-y-1/2' width={800} height={600} />



          : null}
      </div>


    </section>
  );
}
