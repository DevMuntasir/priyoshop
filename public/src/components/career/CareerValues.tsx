import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';

const VALUES = [
  'products',
  'quality',
  'pricing',
  'delivery',
  'credit',
  'support',
] as const;

/** Displays PriyoShop's values in a responsive card grid. */
export async function CareerValues(props: { locale: string }) {
  const t = await getTranslations({ locale: props.locale, namespace: 'Career' });

  return (
    <section className="bg-about-gradient py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <Badge variant="outline" size="sm">
            {t('values_eyebrow')}
          </Badge>
          <h2 className="mt-4 text-center font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4">
            {t('values_title')}
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-ps-md border border-ps-grey-200 bg-ps-grey-200 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {VALUES.map((value, index) => (
            <article key={value} className="bg-white p-6 sm:min-h-64 sm:p-7 lg:p-8">
              <Image
                src={`/career/${index + 1}.svg`}
                alt=""
                width={52}
                height={52}
                aria-hidden="true"
                className="h-12 w-12 object-contain"
              />
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-ps-black">
                {t(`value_${value}`)}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ps-black-400">
                {t(`value_${value}_description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
