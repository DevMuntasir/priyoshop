import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

const DEFAULT_BENEFITS: SectionItem[] = [
  {
    title: 'Health & Wellbeing',
    description: 'Supporting employee wellness through a healthy, positive, and caring workplace environment.',
    image: '/career/1.png',
    imageAlt: 'Health & Wellbeing',
  },
  {
    title: 'Financial Benefits',
    description: 'Providing competitive financial benefits and support designed to recognize employees\' contributions.',
    image: '/career/2.png',
    imageAlt: 'Financial Benefits',
  },
  {
    title: 'Learning & Growth',
    description: 'Creating continuous opportunities to learn, develop new skills, and grow professionally.',
    image: '/career/3.png',
    imageAlt: 'Learning & Growth',
  },
  {
    title: 'Recognition & Rewards',
    description: 'Celebrating performance, achievements, and meaningful contributions across the organization.',
    image: '/career/4.png',
    imageAlt: 'Recognition & Rewards',
  },
  {
    title: 'Career Opportunities',
    description: 'Empowering employees to take on new challenges, expand their capabilities, and progress in their careers.',
    image: '/career/5.png',
    imageAlt: 'Career Opportunities',
  },
  {
    title: 'Special Employee Perks',
    description: 'Making work more rewarding through celebrations, engagement activities, special recognition, and employee-focused initiatives.',
    image: '/career/6.png',
    imageAlt: 'Special Employee Perks',
  },
];

/** Displays employee benefits in a responsive card grid with CMS content. */
export function Benefits(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const heading = props.data.heading;
  const items = props.data.items.length > 0 ? props.data.items : DEFAULT_BENEFITS;

  return (
    <section className={`${resolved.wrapperClass} bg-white py-16 lg:py-20`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {heading.eyebrow ? (
            <Badge variant="outline" size="sm">
              {heading.eyebrow}
            </Badge>
          ) : null}
          <h2 className="mt-4 text-center font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4">
            {heading.title}
          </h2>
          {heading.description ? (
            <p className="mt-3 max-w-2xl text-center text-sm text-ps-black-400">
              {heading.description}
            </p>
          ) : null}
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {items.map((item, index) => {
            const fallbackImage = DEFAULT_BENEFITS[index % DEFAULT_BENEFITS.length]?.image;
            const imageSrc = item.image !== undefined ? item.image : fallbackImage;
            const isSvg = imageSrc?.toLowerCase().endsWith('.svg');

            return (
              <article
                key={item.title || index}
                className="group flex flex-col overflow-hidden rounded-ps-md border border-ps-grey-300 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-ps-grey-400 hover:shadow-ps-soft"
              >
                <div className="relative h-44 w-full overflow-hidden bg-linear-to-br from-white via-ps-grey-100 to-blue-50 sm:h-48">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={item.imageAlt || item.title || 'Benefit'}
                      fill
                      unoptimized={isSvg}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`transition-transform duration-500 group-hover:scale-[1.04] ${
                        isSvg ? 'object-contain p-6' : 'object-cover'
                      }`}
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col justify-between border-t border-ps-grey-200 p-5 sm:p-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-ps-black">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-ps-black-400">
                      {item.description || item.body}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
