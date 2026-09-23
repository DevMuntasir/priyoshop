import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function OpportunityHub(props: { data: ResolvedSection }) {
  const { heading, style, items } = props.data;
  const resolved = resolveSectionStyle(style);
  const alignClass
    = resolved.align === 'center' ? 'items-center text-center' : 'items-start text-left';

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

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {(items ?? []).map((item, index) => {
            const body = item.body ?? item.description;
            if (!item.title && !body && !item.image) {
              return null;
            }

            return (
              <div key={index}>
                <Reveal direction="up" className="flex h-full flex-col border-[1px] border-ps-cream-yellow">
                  {item.image && (
                    <div className="bg-ps-warm-white">
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title || 'Hub item'}
                        width={300}
                        height={200}
                        className="w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-4">
                    {item.title && <h3 className="mt-4 text-lg font-semibold lg:text-2xl">{item.title}</h3>}
                    {body && <p className="mt-2 text-gray-600">{body}</p>}
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

