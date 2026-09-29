import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

function getGridColSpan(index: number, total: number) {
  if (total === 5) {
    if (index < 3) {
      return 'md:col-span-1 lg:col-span-2';
    }
    return index === 4 ? 'md:col-span-2 lg:col-span-3' : 'md:col-span-1 lg:col-span-3';
  }

  if (total === 2 || total === 4) {
    return 'md:col-span-1 lg:col-span-3';
  }

  if (total === 1) {
    return 'col-span-1 md:col-span-2 lg:col-span-6';
  }

  return 'md:col-span-1 lg:col-span-2';
}

export function OpportunityHub(props: { data: ResolvedSection }) {
  const heading = props.data.heading;
  const style = props.data.style;
  const items = props.data.items;
  const resolved = resolveSectionStyle(style);
  const alignClass
    = resolved.align === 'center' ? 'items-center text-center' : 'items-start text-left';

  const validItems = (items ?? []).filter(
    item => Boolean(item.title || item.body || item.description || item.image),
  );

  return (
    <section className={`overflow-hidden bg-white pt-14 sm:pt-20 ${resolved.wrapperClass}`.trim()}>
      <div className={`container mx-auto flex flex-col px-4 ${alignClass}`}>
        <Reveal direction="up">
          <SectionHeading
            align={resolved.align || 'center'}
            title={heading.title}
            titleSize="h2"
            eyebrow={heading.eyebrow}
            description={heading.description}
            titleColor={resolved.titleColorClass}
          />
        </Reveal>

        <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-6 lg:gap-8">
          {validItems.map((item, index) => {
            const body = item.body ?? item.description;
            const spanClass = getGridColSpan(index, validItems.length);

            return (
              <div key={item.title || index} className={spanClass}>
                <Reveal direction="up" delay={index * 0.08} className="flex h-full flex-col text-left">
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-ps-cream sm:h-56 lg:h-64">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title || 'Hub item'}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col pt-4">
                    {item.title && (
                      <h3 className="text-lg font-bold text-ps-black sm:text-xl lg:text-2xl">
                        {item.title}
                      </h3>
                    )}
                    {body && (
                      <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                        {body}
                      </p>
                    )}
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

