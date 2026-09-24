import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

const DEFAULT_VALUES: SectionItem[] = [
  {
    title: 'Thousands of Products',
    description: 'All groceries essentials are available on one platform.',
    logo: '/career/1.svg',
  },
  {
    title: 'Best in Quality',
    description: 'Eliminating intermediaries, connecting 296+ brands to last-mile retailers.',
    logo: '/career/2.svg',
  },
  {
    title: 'Wholesale Pricing',
    description: 'Retailers get clear, low prices without bargaining or hidden charges.',
    logo: '/career/3.svg',
  },
  {
    title: 'Delivery across Bangladesh',
    description: 'Retail grocery products are delivered directly to store locations.',
    logo: '/career/4.svg',
  },
  {
    title: 'Easy Credit Access',
    description: 'Restock confidently with our hassle-free credit facilities for retailers.',
    logo: '/career/5.svg',
  },
  {
    title: 'Helpful Support',
    description: 'Our dedicated support team is always available to answer your questions.',
    logo: '/career/6.svg',
  },
];

/** Displays PriyoShop's values in a responsive card grid with CMS content. */
export function CareerValues(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const heading = props.data.heading;
  const items = props.data.items.length > 0 ? props.data.items : DEFAULT_VALUES;

  return (
    <section className={`${resolved.wrapperClass} bg-about-gradient py-16 lg:py-20`}>
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

        <div className="mx-auto mt-10  max-w-6xl  overflow-hidden  flex flex-wrap lg:mt-12 justify-center ">
          {items.map((item, index) => {
            const logo = item.logo || item.image || `/career/${(index % 6) + 1}.svg`;
            return (
              <article key={item.title || index} className="bg-white w-1/3 border-[1px] border-gray-100 p-6 sm:min-h-64 sm:p-7 lg:p-8">
                {logo ? (
                  <Image
                    src={logo}
                    alt=""
                    width={52}
                    height={52}
                    aria-hidden="true"
                    className="h-12 w-12 object-contain"
                  />
                ) : null}
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-ps-black">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ps-black-400">
                  {item.description || item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
