import { getTranslations } from 'next-intl/server';

/* Cream-gradient hero: "Media" pill over the H1 and supporting copy. */
export async function NewsHero(props: { locale: string }) {
  const t = await getTranslations({ locale: props.locale, namespace: 'News' });

  return (
    <div className="container mx-auto flex flex-col items-center px-4 pt-32 pb-10 text-center lg:pt-40">
      <span className="inline-flex items-center rounded-full px-4 py-1 font-body text-ps-sm font-semibold text-ps-ink-700 ring-[1.5px] ring-black ring-inset">
        {t('hero_pill')}
      </span>
      <h1 className="mt-5 max-w-3xl font-display text-ps-h5 leading-[1.3] font-bold tracking-tight text-balance text-ps-black sm:text-ps-h4 lg:text-ps-h3">
        {t('hero_title')}
      </h1>
      <p className="mt-4 max-w-xl font-body text-ps-sm font-semibold text-ps-black-400">
        {t('hero_description')}
      </p>
    </div>
  );
}
