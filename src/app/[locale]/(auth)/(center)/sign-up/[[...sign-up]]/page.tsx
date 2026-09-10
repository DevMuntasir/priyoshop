import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { buildPageMetadata } from '@/utils/Seo';

type SignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: SignUpPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'SignUp' });

  return await buildPageMetadata({
    path: '/sign-up',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
    robots: { index: false, follow: false },
  });
}

export default async function SignUpPage(props: SignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <SignUpForm />;
}
