import { getTranslations } from 'next-intl/server';

/* Blue callout box telling candidates where to send their resume and the required subject line. */
export async function ApplyCallout(props: { locale: string; email: string; title: string }) {
  const t = await getTranslations({ locale: props.locale, namespace: 'CareerSlug' });

  return (
    <div className="rounded-ps-sm border-l-4 border-blue-500 bg-blue-50 p-5">
      <p className="m-0 font-body text-ps-sm font-semibold text-ps-black">
        {t.rich('apply_callout', {
          email: props.email,
          title: props.title,
          a: (chunks) => (
            <a href={`mailto:${props.email}`} className="font-bold text-blue-600 underline">
              {chunks}
            </a>
          ),
        })}
      </p>
    </div>
  );
}
