'use client';

import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function AppBanner(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;

  return (
    <div className="container hidden lg:block mx-auto w-full max-w-full px-3 py-8 sm:px-6 sm:py-16 lg:px-8 xl:py-20">
      <div
        className="flex min-h-0 w-full max-w-full overflow-hidden rounded-ps-lg p-4 sm:min-h-104 sm:p-8 lg:aspect-[7/3.2] lg:min-h-0 lg:p-10"
        style={{
          backgroundImage: 'url(/app-banner/bg.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex h-full max-w-full min-w-0 flex-1 flex-col justify-center gap-4 sm:max-w-120 sm:gap-5 lg:pt-2">
          <SectionHeading
            title={heading.title}
            titleClassName='!text-ps-h5 md:!text-ps-h4 !mt-6'
            description={heading.description}
            descriptionClassName=' text-xs md:text-ps-body  max-w-[200px] md:max-w-[400px] !leading-[1.1]'
            align={style.base.align}
            titleSize="h3"
            className="!gap-2 !sm:gap-3 !lg:gap-5"
          />
          <div className="flex w-full flex-wrap items-center gap-3 pt-1 sm:gap-4 sm:pt-2">
            {items.map(
              (item, index) =>
                item.image && (
                  <Image
                    key={`${item.image}-${index}`}
                    width={120}
                    height={40}
                    alt=""
                    src={item.image}
                    className="h-auto w-auto max-w-full"
                  />
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
