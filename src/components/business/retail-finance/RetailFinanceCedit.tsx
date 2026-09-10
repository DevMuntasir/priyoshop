import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';

function CreditCard(props: { item: SectionItem; iconRight?: boolean }) {
  const { item, iconRight = false } = props;

  return (
    <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-[#E7E7E7] bg-white p-8 transition-shadow duration-300 hover:shadow-lg">
      <div
        className={`flex items-start gap-4 ${iconRight ? 'flex-row' : 'flex-col'}`}
      >
        <div className="flex-1">
          <h3 className="font-display text-ps-h4 font-bold leading-snug text-ps-black">
            {item.title}
          </h3>
          {item.body && (
            <p className="mt-2 font-body text-sm font-semibold leading-relaxed text-ps-black-400">
              {item.body}
            </p>
          )}
        </div>

        {item.image && (
          <div
            className={`shrink-0 overflow-hidden rounded-xl bg-[#FFF0EC] ${
              iconRight ? 'h-20 w-20' : 'h-16 w-16'
            }`}
          >
            <Image
              src={item.image}
              alt={item.title ?? ''}
              width={80}
              height={80}
              className="h-full w-full object-contain p-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function RetailFinanceCedit(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;

  const topRow = items.slice(0, 2);
  const bottomRow = items.slice(2);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section heading — left-aligned, matches screenshot */}
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
          align="left"
          titleSize="h2"
          className="mb-12 max-w-2xl"
        />

        {/* Top row — 2 cards, icon floated to the right */}
        {topRow.length > 0 && (
          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {topRow.map((item, i) => (
              <CreditCard key={i} item={item} iconRight />
            ))}
          </div>
        )}

        {/* Bottom row — up to 3 cards, icon stacked on top */}
        {bottomRow.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bottomRow.map((item, i) => (
              <CreditCard key={i} item={item} iconRight={false} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
