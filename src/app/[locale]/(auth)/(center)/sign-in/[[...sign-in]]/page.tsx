import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SignInForm } from '@/components/auth/SignInForm';
import { buildPageMetadata } from '@/utils/Seo';

type SignInPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: SignInPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'SignIn' });

  return await buildPageMetadata({
    path: '/sign-in',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
    robots: { index: false, follow: false },
  });
}

export default async function SignInPage(props: SignInPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <SignInForm />;
}
