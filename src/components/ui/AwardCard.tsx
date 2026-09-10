import type { Award } from '../sections/awards/data';

export function AwardCard(props: { award: Award }) {
  return (
    <div className="group flex flex-col items-center overflow-hidden rounded-ps-md border-[1px] bg-white ring-1 ring-ps-black-50 transition-colors hover:ring-ps-red-100">
      <div className="flex w-full max-h-[240px] w-full items-center justify-center overflow-hidden rounded-ps-sm bg-section-gradient ">
        {/* oxlint-disable-next-line next/no-img-element -- static award logo; next/image adds no value for a small inline mark */}
        <img
          src={props.award.logo}
          alt={props.award.name}
          className=" w-full"
        />
      </div>
      <p className="!m-0 flex min-h-18.75 flex-col justify-center p-3 text-center font-body text-ps-sm font-semibold sm:p-4 sm:text-ps-body">
        {props.award.caption}
      </p>
    </div>
  );
}
