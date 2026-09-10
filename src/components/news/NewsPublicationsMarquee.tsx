import { Link } from '@/libs/I18nNavigation';
import type { NewsPublicationSummary } from '@/libs/news/Types';
import { SectionHeading } from '../ui/SectionHeading';

export type NewsPublicationsMarqueeProps = {
  publications: NewsPublicationSummary[];
  title: string;
  description: string;
};

/* Auto-scrolling publication logos for the /news landing page. */
export function NewsPublicationsMarquee(props: NewsPublicationsMarqueeProps) {
  if (props.publications.length === 0) {
    return null;
  }

  const shouldAnimate = props.publications.length > 1;
  const items = props.publications.length > 1
    ? [...props.publications, ...props.publications]
    : props.publications;

  return (
    <section className="py-16">
      <div className=" container mx-auto px-4">
        <SectionHeading
          title=""
          eyebrow="As Featured In"
          titleSize='h4'

        />

        <div className="overflow-hidden  bg-white/80 py-4  ">
          <div
            className={`flex min-w-max gap-4 px-4 [--animation-duration:28s] ${shouldAnimate ? 'motion-safe:animate-scroll hover:[animation-play-state:paused]' : ''}`}
          >
            {items.map((publication, index) => (
              <Link
                key={`${publication.publicationId}-${index}`}
                href={`/news/publications/${publication.slug}`}
                className="flex h-16 min-w-40 items-center justify-center rounded-ps-sm bg-white px-6 py-4 no-underline ring-1 ring-ps-grey-200 ring-inset transition-transform duration-200 hover:-translate-y-1 hover:shadow-ps-soft"
              >
                {/* oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns */}
                <div className='max-w-[200px]'>
                  <img
                    src={publication.logo}
                    alt={publication.logoAlt ?? publication.name}
                    className="max-h-10 w-auto w-full object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
