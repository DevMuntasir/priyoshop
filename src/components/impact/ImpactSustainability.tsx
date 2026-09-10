import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

/** Individual impact pillar card — icon, title, body, SDG badge. */
function PillarCard(props: { item: SectionItem }) {
  const { item } = props;

  return (
    <div className="flex flex-col gap-4 rounded-ps-md border border-ps-black-100/20 bg-ps-white p-6  transition-shadow duration-200 hover:shadow-md">
      {/* Icon */}
      <div >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt ?? item.title ?? ''}
            width={32}
            height={32}
            className="size-16 object-contain"
          />
        ) : (
          <span className="size-6 rounded bg-ps-black-200" />
        )}
      </div>

      <SectionHeading
        title={item.title}
        description={item.body}
        align='left'
        titleSize='h5'
        titleColor=' max-w-[250px]'

      />

      {/* SDG badge at the bottom */}
      <div className="mt-auto flex flex-wrap w-full gap-2 pt-2 border-t border-ps-black-50">
        {item.groupImages && item.groupImages.map((src) =>
          <Image
            src={src}
            alt={item.imageAlt ?? (item.value ? `SDG ${item.value}` : item.title ?? '')}
            width={44}
            height={44}
            className="size-11 rounded object-cover"
          />
        )}
      </div>
    </div>
  );
}

/**
 * Impact Pillars section — 3-column card grid showing how PriyoShop's
 * business areas map to sustainability goals.
 */
export function ImpactSustainability(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);

  return (
    <section className={`container mx-auto px-4 py-16 lg:py-24 ${resolved.wrapperClass}`.trim()}>
      <SectionHeading
        align={resolved.align}
        eyebrow={heading.eyebrow}
        title={heading.title}
        titleSize="h2"
        description={heading.description}

      />

      <div className="mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:mt-14">
        {items.map((item, index) => (
          <PillarCard key={item.title ?? index} item={item} />
        ))}
      </div>
    </section>
  );
}
