import { setRequestLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { auth } from '@/libs/auth/Auth';

export default async function UserProfilePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="my-6 space-y-2">
      <p>
        <span className="text-gray-500">Name: </span>
        {session?.user.name}
      </p>
      <p>
        <span className="text-gray-500">Email: </span>
        {session?.user.email}
      </p>
    </div>
  );
}
