import { Button } from '@/components/ui/Button';

export function AwardDetailBody(props: {
  coverImage?: string;
  coverImageAlt?: string;
  description?: string;
  organization?: string;
  year?: string;
  category?: string;
  externalUrl?: string;
  detailsTitle: string;
  storyTitle: string;
  organizationLabel: string;
  yearLabel: string;
  categoryLabel: string;
  viewOfficialLabel: string;
}) {
  return (
    <article className="rounded-t-4xl bg-white pt-10 pb-16 lg:pb-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {props.coverImage ? (
          <div className="overflow-hidden rounded-ps-xl ">
            {/* oxlint-disable-next-line next/no-img-element -- arbitrary user-provided or local image */}
            <img
              src={props.coverImage}
              alt={props.coverImageAlt ?? 'Award ceremony banner'}
              className="max-h-[460px] w-full object-contain p-6 sm:p-10"
            />
          </div>
        ) : null}

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-ps-h6 font-bold tracking-tight text-ps-black sm:text-ps-h5">
              {props.storyTitle}
            </h2>
            <div className="mt-4 space-y-4 font-body text-ps-sm leading-relaxed text-ps-ink-700 sm:text-ps-body">
              {props.description ? (
                props.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="m-0">
                    {paragraph}
                  </p>
                ))
              ) : null}
            </div>
          </div>

          <aside className="h-fit rounded-ps-lg border border-ps-black-50 bg-ps-warm-white p-6">
            <h3 className="m-0 font-display text-ps-sm font-bold tracking-tight text-ps-black">
              {props.detailsTitle}
            </h3>

            <dl className="mt-4 divide-y divide-ps-black-50 font-body text-ps-sm">
              {props.organization ? (
                <div className="py-2.5">
                  <dt className="text-ps-xs font-medium text-ps-ink-400">
                    {props.organizationLabel}
                  </dt>
                  <dd className="m-0 mt-0.5 font-semibold text-ps-black">
                    {props.organization}
                  </dd>
                </div>
              ) : null}

              {props.year ? (
                <div className="py-2.5">
                  <dt className="text-ps-xs font-medium text-ps-ink-400">{props.yearLabel}</dt>
                  <dd className="m-0 mt-0.5 font-semibold text-ps-black">{props.yearLabel ? props.year : ''}</dd>
                </div>
              ) : null}

              {props.category ? (
                <div className="py-2.5">
                  <dt className="text-ps-xs font-medium text-ps-ink-400">
                    {props.categoryLabel}
                  </dt>
                  <dd className="m-0 mt-0.5 font-semibold text-ps-black">{props.category}</dd>
                </div>
              ) : null}
            </dl>

            {props.externalUrl ? (
              <div className="mt-6 pt-2">
                <a
                  href={props.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full no-underline"
                >
                  <Button size="md" tone="brand" fullWidth>
                    {props.viewOfficialLabel}
                  </Button>
                </a>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  );
}
