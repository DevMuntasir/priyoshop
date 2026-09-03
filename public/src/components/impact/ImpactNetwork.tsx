import Image from 'next/image';
import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AccentedTitle } from '@/components/ui/AccentedTitle';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

/** Editorial Green Hub Network section with asymmetric 2x2 layout. */
export function ImpactNetwork(props: { data: ResolvedSection }) {
  const { heading, items = [], style } = props.data;
  const resolved = resolveSectionStyle(style);

  const mainImage = '/impact/green.png';
  const videoPoster = '/impact/green.png';
  const videoPath = heading.videoPath || '/video/1.mp4';

  const cardTitle =
    "~Building a Greener Tomorrow: Innovation Through PriyoShop's Green Hub.~";

  const item0Title = items[0]?.title ?? 'By integrating renewable energy sources';
  const item0Body =
    items[0]?.body ??
    'By integrating renewable energy sources (like solar power) and energy-efficient lighting, a green hub significantly cuts greenhouse gas emissions compared to fossil-fuel-reliant traditional warehouses.';

  const item1Title = items[1]?.title ?? 'While the initial setup requires investment,';
  const item1Body =
    items[1]?.body ??
    'green hubs utilize smart energy management, eco-friendly packaging, and waste reduction systems that drastically lower long-term utility and material expenses.';

  const item2Title = items[2]?.title ?? 'Green hubs are specifically designed';
  const item2Body =
    items[2]?.body ??
    'to seamlessly integrate with electric vehicle (EV) fleets, utilizing specialized charging infrastructure to ensure zero-emission last-mile deliveries.';

  return (
    <section
      className={`container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-28 xl:py-32 ${resolved.wrapperClass}`.trim()}
    >
      {heading.eyebrow && (
        <div className="mb-10 lg:mb-14">
          <SectionHeading
            eyebrow={heading.eyebrow}

            title={
              <AccentedTitle
                text={heading.title}
                gradientClass="bg-linear-to-r from-ps-green to-ps-green bg-clip-text text-transparent"
              />
            }
            description={heading.description}
            align="left"
            titleSize="h2"
            descriptionFontClass="font-normal"
            titleColor="font-semibold"

          />
        </div>
      )}

      <div className="grid w-full min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,1fr)] lg:gap-10">
        {/* Top-Left: Green Hub Warehouse Illustration */}
        <Image
          src={mainImage}
          alt={heading.title || 'PriyoShop Green Hub Warehouse'}
          width={680}
          height={200}
          className="h-auto max-h-[500px] w-full rounded-ps-md object-cover"

        />


        {/* Top-Right: Heading & First Point */}
        <div className="flex min-w-0 max-w-[400px] flex-col justify-center gap-4 py-2 lg:gap-6 lg:py-8 lg:pl-10">
          <SectionHeading
            titleSize='h5'
            descriptionFontClass='!text-ps-body'
            align='left'
            title={

              <AccentedTitle
                text={cardTitle}
                gradientClass="bg-linear-to-r from-ps-green to-green-800 bg-clip-text text-transparent"
              />
            }
          />
          <p className=' text-ps-md'>
            <strong className="font-bold text-ps-black">{item0Title} </strong>
            {item0Body}
          </p>
        </div>

        {/* Bottom-Left: Two Key Feature Points */}
        <div className="flex max-w-[680px] min-w-0 flex-col justify-center gap-6 font-body text-ps-body leading-relaxed text-ps-black-400 lg:pr-10">
          <p>
            <strong className="font-bold text-ps-black">{item1Title} </strong>
            {item1Body}
          </p>
          <p>
            <strong className="font-bold text-ps-black">{item2Title} </strong>
            {item2Body}
          </p>
        </div>

        {/* Bottom-Right: Video Thumbnail Container */}
        <div className="aspect-video h-auto w-full max-w-[410px] overflow-hidden rounded-ps-md shadow-xs lg:h-[300px] lg:aspect-auto">
          <ClickToPlayVideo
            videoPath={videoPath}
            poster={videoPoster}
            title={cardTitle}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
