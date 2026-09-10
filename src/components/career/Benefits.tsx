import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';

const BENEFITS = [
  'health',
  'financial',
  'learning',
  'recognition',
  'career',
  'perks',
] as const;

/** Displays employee benefits in a responsive card grid. */
export async function Benefits(props: { locale: string }) {
  const t = await getTranslations({ locale: props.locale, namespace: 'Career' });

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <Badge variant="outline" size="sm">
            {t('benefits_eyebrow')}
          </Badge>
          <h2 className="mt-4 text-center font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4">
            {t('benefits_title')}
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <article
              key={benefit}
              className="group overflow-hidden rounded-ps-md border border-ps-grey-300 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-ps-grey-400 hover:shadow-ps-soft"
            >
              <div
                aria-hidden="true"
                className="h-36 bg-linear-to-br from-white via-ps-grey-100 to-blue-50 transition-transform duration-500 group-hover:scale-[1.03] sm:h-40"
              />
              <div className="min-h-44 border-t border-ps-grey-200 p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold leading-snug text-ps-black">
                  {t(`benefit_${benefit}_title`)}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ps-black-400">
                  {t(`benefit_${benefit}_description`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
