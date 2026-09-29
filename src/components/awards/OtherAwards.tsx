import type { Award } from '@/components/sections/awards/data';
import { AwardCard } from '@/components/ui/AwardCard';
import { Button } from '@/components/ui/Button';
import { Link } from '@/libs/I18nNavigation';

export function OtherAwards(props: {
  awards: Award[];
  title: string;
  viewAllLabel: string;
}) {
  if (props.awards.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-ps-black-50 bg-ps-warm-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="m-0 font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4">
              {props.title}
            </h2>
          </div>
          <Link href="/awards" className="inline-block no-underline">
            <Button size="md" tone="dark">
              {props.viewAllLabel}
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {props.awards.slice(0, 3).map((award, index) => (
            <AwardCard award={award} key={`${award.slug}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
