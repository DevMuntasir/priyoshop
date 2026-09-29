import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { Reveal } from '@/components/ui/Reveal';

export function AwardsHero(props: {
  title: string;
  description: string;
  pill: string;
}) {
  return (
    <header className="container mx-auto flex min-h-[22rem] flex-col items-center justify-center px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-32 lg:px-8 lg:pt-30">
      <Reveal direction="scale" className="flex flex-col items-center max-w-[800px]">
        {/* oxlint-disable-next-line next/no-img-element -- static decorative laurel mark */}
        <img
          src="/awards/icon.png"
          alt=""
          className="mb-4 h-20 w-auto sm:h-28 lg:h-32"
        />
        <span className="inline-flex items-center rounded-full px-4 py-1 font-body text-ps-sm font-semibold text-ps-ink-700 ring-[1.5px] ring-black ring-inset">
          {props.pill}
        </span>
        <h1 className="mt-5 max-w-4xl font-display text-ps-h5 leading-[1.3] font-bold tracking-tight text-balance sm:text-ps-h4 lg:text-ps-h3">
          <AccentedTitle
            text={props.title}
            emClass="bg-linear-to-r from-ps-red-600 to-ps-gold-600 bg-clip-text text-transparent"
          />
        </h1>
        <p className="mt-4 max-w-2xl font-body text-ps-sm leading-relaxed font-semibold text-ps-black-400 sm:text-ps-body">
          {props.description}
        </p>
      </Reveal>
    </header>
  );
}
