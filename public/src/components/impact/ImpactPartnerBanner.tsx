import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function ImpactPartnerBanner(props: { data: ResolvedSection }) {
  const heading = props.data.heading;
  const backgroundImage = heading.backgroundImage ?? '/impact/banner.png';

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="container px-4 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-[22px]">
          <Image
            src={backgroundImage}
            alt={heading.title}
            width={1066}
            height={301}
            className="h-[280px] w-full object-cover sm:h-[320px] lg:h-auto"
          />

          <div className="absolute inset-0 bg-linear-to-r from-[#243000]/80 via-[#3d4b11]/55 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[600px] px-6 py-8 sm:px-10 lg:px-12">
              <h2 className="m-0  font-display text-[28px] leading-[1.15] font-semibold text-white sm:text-[34px]">
                {heading.title}
              </h2>

              {heading.description && (
                <p className="mt-3 max-w-md font-body text-sm leading-6 text-white/90 sm:text-base">
                  {heading.description}
                </p>
              )}

              {heading.ctaLabel && (
                <Button
                  href={heading.ctaHref ?? '/contact'}
                  tone="light"
                  className="mt-5 shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                >
                  {heading.ctaLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
