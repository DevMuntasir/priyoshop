import { Link } from '@/libs/I18nNavigation';

export function AwardDetailHero(props: {
  name: string;
  caption?: string;
  organization?: string;
  year?: string;
  category?: string;
  backLabel: string;
}) {
  return (
    <header className="container mx-auto px-4 pt-28 pb-8 sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
      <div className="mx-auto">
        <Link
          href="/awards"
          className="group inline-flex items-center gap-2 font-body text-ps-sm font-semibold text-ps-ink-500 no-underline transition-colors hover:text-ps-black"
        >
          <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
          <span>{props.backLabel}</span>
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {props.category ? (
            <span className="rounded-full bg-ps-red-50 px-3 py-1 font-body text-ps-xs font-semibold text-ps-red-700">
              {props.category}
            </span>
          ) : null}
          {props.year ? (
            <span className="rounded-full bg-ps-black-50 px-3 py-1 font-body text-ps-xs font-semibold text-ps-black-700">
              {props.year}
            </span>
          ) : null}
        </div>

        <h1 className="mt-4 font-display text-ps-h5 leading-[1.25] font-bold tracking-tight text-ps-black sm:text-ps-h4 lg:text-ps-h3">
          {props.name}
        </h1>

        {props.caption ? (
          <p className="mt-4 font-body text-ps-sm leading-relaxed font-semibold text-ps-black-400 sm:text-ps-body">
            {props.caption}
          </p>
        ) : null}

        {props.organization ? (
          <p className="mt-2 font-body text-ps-xs font-medium text-ps-ink-400">
            Awarded by <span className="font-semibold text-ps-black">{props.organization}</span>
          </p>
        ) : null}
      </div>
    </header>
  );
}
