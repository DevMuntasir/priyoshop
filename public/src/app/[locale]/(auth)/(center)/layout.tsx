import { setRequestLocale } from 'next-intl/server';

export default async function CenteredLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-ps-grey-100 px-4 py-10 sm:px-6">
      {props.children}
    </main>
  );
}
