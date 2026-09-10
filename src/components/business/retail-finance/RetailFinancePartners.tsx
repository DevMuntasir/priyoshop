import { InfiniteMovingCards } from '@/components/ui/InfiniteMovingCards';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function RetailFinancePartners(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;
  const partners = items.map(item => ({ name: item.name ?? '', logo: item.logo ?? '' }));

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />
      </div>

      <div className="mt-16">
        <InfiniteMovingCards
          speed="slow"
          items={partners.map(partner => (
            <div
              key={partner.name}
              className="flex h-30 w-75 items-center justify-center rounded-ps-md bg-ps-grey-100 px-10"
            >
              {/* oxlint-disable-next-line next/no-img-element -- static brand logo; next/image adds no value for a small inline mark */}
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        />
      </div>
    </section>
  );
}
