import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { Reveal } from '@/components/ui/Reveal';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function DiptyHero(props: { data: ResolvedSection }) {
  const { heading, style } = props.data;
  const resolved = resolveSectionStyle(style);
  const alignClass
    = resolved.align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <section className={`${resolved.wrapperClass} min-h-[100svh] bg-[url(/dipty/bg.png)] bg-cover bg-center bg-no-repeat lg:min-h-[100dvh]`}>
      <div
        className={`container flex min-h-[100svh] flex-col justify-center px-4 pt-28 pb-12 sm:px-6 lg:min-h-[100dvh] lg:px-8 ${alignClass}`}
      >
        <div className=' max-w-[700px]'>
          <Reveal direction='right' delay={0}>
            <h1
              className={`font-display leading-[1.2] font-extrabold text-balance ${resolved.titleSizeClass || 'text-ps-h4 sm:text-ps-h2 lg:text-ps-h1 xl:text-ps-display'
                } ${resolved.titleColorClass}`}
            >
              <AccentedTitle
                text={heading.title}
                emClass="via-ps-green bg-linear-to-l from-ps-green to-ps-green bg-clip-text text-transparent"
              />
            </h1>
          </Reveal>

          <Reveal direction='left' delay={0}>
            <p className="mt-4 max-w-[500px] font-body text-ps-sm font-semibold sm:mt-5 sm:text-ps-body">
              {heading.description}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
