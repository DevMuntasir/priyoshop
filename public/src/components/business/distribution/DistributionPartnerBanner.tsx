import { Button } from '@/components/ui/Button';
import type { ResolvedSection } from '@/libs/cms/Sections';

function Sparkle(props: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="currentColor" aria-hidden>
      <path d="M12 1.75c.75 6.4 3.85 9.5 10.25 10.25-6.4.75-9.5 3.85-10.25 10.25C11.25 15.85 8.15 12.75 1.75 12 8.15 11.25 11.25 8.15 12 1.75Z" />
    </svg>
  );
}

export function DistributionPartnerBanner(props: { data: ResolvedSection }) {
  const data = props.data;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container px-5 sm:px-8">
        <div className="relative isolate flex min-h-70 items-center justify-center overflow-hidden rounded-ps-lg bg-[radial-gradient(circle_at_8%_50%,rgba(214,28,59,0.9)_0%,rgba(116,18,43,0.72)_35%,transparent_58%),linear-gradient(110deg,#641426_0%,#2a1022_58%,#12101c_100%)] px-6 py-12 text-center sm:px-12">
          <Sparkle className="absolute top-[18%] left-[66%] size-3 text-white/25" />
          <Sparkle className="absolute right-[20%] bottom-[18%] size-6 text-white/15" />
          <Sparkle className="absolute bottom-[20%] left-[32%] size-3 text-white/45" />

          <div className="relative z-10 flex max-w-3xl flex-col items-center">
            <h2 className="m-0 font-display text-ps-h4 leading-tight font-bold tracking-tight text-white text-balance">
              {data.heading.title}
            </h2>
            {data.heading.description && (
              <p className="m-0 mt-4 max-w-2xl font-body text-ps-sm leading-relaxed font-normal text-white/80 text-pretty">
                {data.heading.description}
              </p>
            )}
            {data.heading.ctaLabel && (
              <Button
                href={data.heading.ctaHref ?? '/contact'}
                tone="light"
                className="mt-6"
              >
                {data.heading.ctaLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
