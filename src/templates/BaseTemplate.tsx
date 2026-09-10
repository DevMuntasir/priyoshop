import { useTranslations } from 'next-intl';
import { AppConfig } from '@/utils/AppConfig';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const t = useTranslations('BaseTemplate');

  return (
    <div className="min-h-dvh w-full px-4 text-ps-ink-700 antialiased sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <header className="border-b border-gray-300">
          <div className="pt-10 pb-6 sm:pt-16 sm:pb-8">
            <h1 className="font-display text-ps-h4 font-bold text-ps-ink-900">{AppConfig.name}</h1>
            <h2 className="mt-2 max-w-2xl font-body text-ps-body text-ps-ink-600">{t('description')}</h2>
          </div>

          <div className="flex flex-col gap-4 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <nav aria-label={t('main_navigation_label')}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-base sm:text-lg">{props.leftNav}</ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-base sm:justify-end sm:text-lg">{props.rightNav}</ul>
            </nav>
          </div>
        </header>

        <main className="min-w-0 py-4 sm:py-6">{props.children}</main>

        <footer className="border-t border-gray-300 py-8 text-center text-sm">
          {t.rich('footer_text', {
            year: new Date().getFullYear(),
            name: AppConfig.name,
            author: () => (
              <a
                href="https://nextjs-boilerplate.com"
                className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              >
                all rights reserved
              </a>
            ),
          })}

          {/*
           * PLEASE READ THIS SECTION
           * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
           * The link doesn't need to appear on every pages, one link on one page is enough.
           * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
           */}
        </footer>
      </div>
    </div>
  );
};
