import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactOffices } from '@/components/contact/ContactOffices';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ContactPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Contact' });

  return await buildPageMetadata({
    path: '/contact',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function ContactPage(props: ContactPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Contact' });

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: t('breadcrumb_home'), path: '' },
      { name: t('title'), path: '/contact' },
    ],
    locale,
  );

  return (
    <div className="bg-white">
      <JsonLd data={breadcrumb} />
      <div className="bg-linear-to-b from-ps-peach/70 via-ps-warm-white to-white">
        <ContactHero locale={locale} />
      </div>
      <ContactForm />
      <ContactOffices locale={locale} />
    </div>
  );
}
