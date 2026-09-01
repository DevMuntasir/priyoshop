import { setRequestLocale } from 'next-intl/server';

export default async function DashboardPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="my-4 min-h-48 rounded-ps-lg border border-ps-grey-200 bg-white p-5 shadow-ps-soft sm:my-6 sm:p-8 [&_p]:my-6">
      hello dashboard
    </div>
  );
}
