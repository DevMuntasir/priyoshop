import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function OpportunityDipty(props: { data: ResolvedSection }) {
  const { heading, style, items } = props.data;
  const resolved = resolveSectionStyle(style);
  const alignClass
    = resolved.align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <section className={`overflow-hidden bg-section-gradient py-14 sm:py-20 xl:pt-28 my-10 ${resolved.wrapperClass}`.trim()}>
      <div className={`container mx-auto flex flex-col px-4 ${alignClass}`}>
        <Reveal direction="up">
          <SectionHeading
            eyebrow={heading.eyebrow}
            align={resolved.align || 'center'}
            title={heading.title}
            titleSize="h2"
            description={heading.description}
            titleColor={resolved.titleColorClass}
          />
        </Reveal>
      </div>

      <section className="px-4 rounded-t-ps-hero">
        <div className="relative mx-auto container mt-10">
          <div className="grid grid-cols-1 pt-6 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(items ?? []).map((item, index) => {
              const description = item.body ?? item.description;
              if (!item.title && !description && !item.image) {
                return null;
              }

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-orange-100 bg-white p-10 text-center"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title || 'Dipty item'}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  {item.title && (
                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                  )}

                  {description && (
                    <p className="mx-auto max-w-md text-ps-sm text-gray-600">
                      {description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}


