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
      className={`container mx-auto px-4 py-12 lg:py-28 xl:py-32 ${resolved.wrapperClass}`.trim()}
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

      <div className="flex flex-wrap w-full  items-center">
        {/* Top-Left: Green Hub Warehouse Illustration */}
        <Image
          src={mainImage}
          alt={heading.title || 'PriyoShop Green Hub Warehouse'}
          width={680}
          height={200}
          className='h-[500px] rounded-ps-md'

        />


        {/* Top-Right: Heading & First Point */}
        <div className="flex  flex-col justify-center gap-4 lg:gap-6 max-w-[400px] pl-10 py-8">
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
            <strong className="font-bold text-ps-black">By integrating renewable energy sources </strong>
            {item1Body}
          </p>
        </div>

        {/* Bottom-Left: Two Key Feature Points */}
        <div className="flex flex-col max-w-[680px] pr-10 justify-center gap-6 font-body text-ps-body leading-relaxed text-ps-black-400">
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
        <div className="w-full overflow-hidden rounded-ps-md max-w-[410px] h-[300px] shadow-xs">
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

