import { Badge } from '@/components/ui/Badge';
import { LayoutGrid } from '@/components/ui/layout-grid';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

const DEFAULT_CARDS = [
  { id: 1, thumbnail: '/career/1.png', className: 'sm:col-span-2 sm:row-span-2' },
  { id: 2, thumbnail: '/career/2.png', className: 'col-span-1' },
  { id: 3, thumbnail: '/career/3.png', className: 'col-span-1' },
  { id: 4, thumbnail: '/career/4.png', className: 'col-span-1' },
  { id: 5, thumbnail: '/career/5.png', className: 'col-span-1' },
  { id: 6, thumbnail: '/career/6.png', className: 'col-span-1' },
];

/** "Life at PriyoShop" gallery: photo grid with CMS content. */
export function LifeAtPriyoShop(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const heading = props.data.heading;

  const cards =
    props.data.items.length > 0
      ? props.data.items.map((item, idx) => ({
          id: idx + 1,
          thumbnail: item.image || `/career/${(idx % 6) + 1}.png`,
          className: idx === 0 ? 'sm:col-span-2 sm:row-span-2' : 'col-span-1',
        }))
      : DEFAULT_CARDS;

  return (
    <section className={`${resolved.wrapperClass} bg-white py-20`}>
      <div className="container mx-auto px-4 pb-16 lg:pb-24">
        {heading.eyebrow ? (
          <Badge variant="outline" className="mb-3">
            {heading.eyebrow}
          </Badge>
        ) : null}
        <h2 className="m-0 mb-8 font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4">
          {heading.title}
        </h2>
        {heading.description ? (
          <p className="mb-6 max-w-3xl text-sm text-ps-black-400">
            {heading.description}
          </p>
        ) : null}

        <LayoutGrid
          cards={cards}
          className="auto-rows-[200px] sm:grid-cols-3 sm:grid-rows-[180px_180px_200px] lg:grid-rows-[220px_220px_240px]"
        />
      </div>
    </section>
  );
}
