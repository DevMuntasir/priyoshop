import { setRequestLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { auth } from '@/libs/auth/Auth';

export default async function UserProfilePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="my-4 space-y-4 rounded-ps-lg border border-ps-grey-200 bg-white p-5 shadow-ps-soft sm:my-6 sm:p-8">
      <p className="wrap-break-word">
        <span className="text-ps-ink-400">Name: </span>
        {session?.user.name}
      </p>
      <p className="wrap-break-word">
        <span className="text-ps-ink-400">Email: </span>
        {session?.user.email}
      </p>
    </div>
  );
}
