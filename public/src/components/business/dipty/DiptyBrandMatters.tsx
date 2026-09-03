import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function DiptyBrandMatters(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;

  return (
    <section className="bg-ps-black rounded-4xl py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={heading.eyebrow}
          eyebrowMode="light"
          title={heading.title}
          titleColor="text-ps-white"
          description={heading.description}
          descriptionColor="text-ps-white-700"
          align="left"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((benefit, i) => (
            <div
              key={benefit.title}
              className={`rounded-ps-md p-px ${i === 0 || i == 3 ? ' bg-linear-to-br from-[#2f6aff00] via-[#167641] via-40% to-[#2f6affd8] ' : ' bg-linear-to-br from-[#2f6aff00] via-[#0a2738] via-40% to-[#2f6affd8] '}`}
            >
              <div className={`flex h-full flex-col gap-6 rounded-ps-md  p-7 ${i === 0 || i == 3 ? 'bg-gradient-to-tr from-[#022216] via-[#01150C] to-black' : 'bg-gradient-to-br from-[#0A2738] via-[#051622] to-black'}`}>
                {/* oxlint-disable-next-line next/no-img-element -- small static illustration */}
                <img
                  src={benefit.image}
                  alt=""
                  aria-hidden="true"
                  className="h-24 w-24 object-contain"
                />
                <div>
                  <h3 className="m-0 font-display text-ps-h5 font-bold text-ps-white">
                    {benefit.title}
                  </h3>
                  <p className="m-0 mt-2 font-body text-ps-sm text-ps-white-600">
                    {benefit.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
