import { Link } from '@/libs/I18nNavigation';
import type { Award } from '../sections/awards/data';

export function AwardCard(props: { award: Award }) {
  const content = (
    <div className="group flex h-full flex-col items-center overflow-hidden rounded-ps-md border-[1px] bg-white ring-1 ring-ps-black-50 transition-all duration-300 hover:-translate-y-1 hover:ring-ps-red-100 hover:shadow-ps-soft">
      <div className="flex max-h-[240px] w-full items-center justify-center overflow-hidden rounded-ps-sm bg-section-gradient ">
        {/* oxlint-disable-next-line next/no-img-element -- static award logo; next/image adds no value for a small inline mark */}
        <img
          src={props.award.logo}
          alt={props.award.name}
          className="min-h-[150px] object-contain w-full  transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-3 text-center sm:p-4">
        <p className="!m-0 font-body text-ps-sm font-semibold text-ps-black sm:text-ps-body">
          {props.award.caption}
        </p>
        {props.award.organization ? (
          <span className="mt-2 block font-body text-ps-xs font-medium text-ps-ink-400">
            {props.award.organization}
          </span>
        ) : null}
      </div>
    </div>
  );

  if (props.award.slug) {
    return (
      <Link href={`/awards/${props.award.slug}`} className="block h-full no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

