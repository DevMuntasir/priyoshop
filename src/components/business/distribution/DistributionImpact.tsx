import Image from 'next/image';
import type { ResolvedSection } from '@/libs/cms/Sections';

function FeatureCheck() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-5 shrink-0"
      fill="none"
      aria-hidden
    >
      <circle cx="10" cy="10" r="10" fill="#2EC971" />
      <path
        d="m6.25 10.15 2.35 2.35 5.15-5.15"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DistributionImpact(props: { data: ResolvedSection }) {
  const data = props.data;

  const features = data.items
    .map(item => item.title)
    .filter((title): title is string => Boolean(title));

  return (
    <section className="bg-[#020404] py-16 sm:py-20 lg:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="relative grid overflow-hidden rounded-ps-lg border border-[#1b8390]/70 bg-[radial-gradient(circle_at_top_left,#0a3342_0%,#051b25_52%,#03131b_100%)] lg:grid-cols-[52%_48%]">
          <div className="flex flex-col justify-center  px-6 py-10 sm:px-10 sm:py-12 lg:min-h-155 lg:px-12 lg:py-14">
            {data.heading.eyebrow && (
              <span className="mb-5 w-fit rounded-full border border-[#a6d8df]/70 px-3 py-1 font-body text-[11px] leading-none font-semibold text-white sm:text-xs">
                {data.heading.eyebrow}
              </span>
            )}

            <h2 className="m-0 max-w-110 font-display text-ps-h3 leading-[1.15] font-bold tracking-tight text-white text-balance">
              {data.heading.title}
            </h2>

            {data.heading.description && (
              <p className="m-0 mt-5 max-w-110 font-body text-ps-sm leading-relaxed font-normal text-white/80">
                {data.heading.description}
              </p>
            )}

            {features.length > 0 && (
              <ul className="m-0 mt-7 grid list-none gap-3 p-0">
                {features.map((feature, index) => (
                  <li
                    key={`${feature}-${index}`}
                    className="flex items-center gap-2.5 font-body text-ps-xs leading-snug font-semibold text-white/90"
                  >
                    <FeatureCheck />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative min-h-72 overflow-hidden border-t border-[#9c7de8]/70 sm:min-h-96 lg:min-h-[530px] lg:rounded-tl-3xl lg:border-t-0 lg:border-l">
            <Image
              src={data.heading.backgroundImage ?? '/distribution/impact.png'}
              alt={data.heading.backgroundImage ?? data.heading.title}
              width={400}
              height={400}
              // sizes="(min-width: 1024px) 550px, 100vw"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
