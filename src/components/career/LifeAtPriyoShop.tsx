import { getTranslations } from 'next-intl/server';
import { LayoutGrid } from '@/components/ui/layout-grid';

const CARDS = [
  { id: 1, thumbnail: '/career/1.png', className: 'sm:col-span-2 sm:row-span-2' },
  { id: 2, thumbnail: '/career/2.png', className: 'col-span-1' },
  { id: 3, thumbnail: '/career/3.png', className: 'col-span-1' },
  { id: 4, thumbnail: '/career/4.png', className: 'col-span-1' },
  { id: 5, thumbnail: '/career/5.png', className: 'col-span-1' },
  { id: 6, thumbnail: '/career/6.png', className: 'col-span-1' },
];

/* "Life at PriyoShop" gallery: a big photo + two stacked, then a row of three equal photos. */
export async function LifeAtPriyoShop(props: { locale: string }) {
  const t = await getTranslations({ locale: props.locale, namespace: 'Career' });

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 pb-16 lg:pb-24">
        <h2 className="m-0 mb-8 font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4">
          {t('life_title')}
        </h2>

        <LayoutGrid
          cards={CARDS}
          className="auto-rows-[200px] sm:grid-cols-3 sm:grid-rows-[180px_180px_200px] lg:grid-rows-[220px_220px_240px]"
        />
      </div>
    </div>
  );
}
