import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';

function QualityCard(props: { pillar: SectionItem }) {
  return (
    <article className="flex min-h-[200px] items-center justify-between gap-6 rounded-ps-md bg-linear-to-r from-[#edf8ef] to-[#f8faf8] px-6 py-5 sm:min-h-[250px] sm:px-8 lg:px-10">
      <div className="min-w-0 ">
        <h3 className="m-0 font-display text-ps-h4 leading-snug font-bold text-ps-green">
          {props.pillar.title}
        </h3>
        <p className="m-0 mt-3 max-w-72 font-body text-ps-sm leading-relaxed text-ps-black-400">
          {props.pillar.body}
        </p>
      </div>

      {props.pillar.image && (
        // oxlint-disable-next-line next/no-img-element -- CMS-managed static illustration
        <img
          src={props.pillar.image}
          alt=""
          aria-hidden="true"
          className="size-18 shrink-0 rounded-full object-cover sm:size-20"
        />
      )}
    </article>
  );
}

export function DiptyQuality(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="container grid items-start gap-12 px-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14 lg:gap-24">
        <div className="md:sticky md:top-28 max-w-[400px]">
          {heading.eyebrow && (
            <p className="m-0 inline-flex rounded-ps-pill border border-ps-black px-3 py-1 font-body text-xs leading-none font-semibold text-ps-black">
              {heading.eyebrow}
            </p>
          )}

          <h2 className="m-0 mt-6 max-w-md font-display text-ps-h2 leading-[1.25] font-bold tracking-tight  text-ps-black">
            {heading.title}
          </h2>

          {heading.description && (
            <p className="m-0 mt-6 max-w-md font-body text-ps-sm leading-relaxed text-ps-black-400">
              {heading.description}
            </p>
          )}
        </div>

        <div className="grid gap-5">
          {items.map((pillar) => (
            <QualityCard key={pillar.title} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
