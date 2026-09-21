import { MetricStat } from '@/components/ui/MetricStat';
import { RollingNumber } from '@/components/ui/RollingNumber';
import type { ResolvedSection } from '@/libs/cms/Sections';

export type StatItem = { value: string; label: string; icon: string };

const DEFAULT_STATS: StatItem[] = [
  { value: '296', label: 'Brands', icon: '/stats/s1.svg' },
  { value: '100K+', label: 'MSMEs', icon: '/stats/s2.svg' },
  { value: '1428', label: 'Route Coverage', icon: '/stats/s3.svg' },
];

// Splits a display value like "100K+" into the rolling number and its suffix.
function parseValue(value: string): { num: number; suffix: string } {
  const match = /^(\d+)(.*)$/u.exec(value);
  return { num: match ? Number(match[1]) : 0, suffix: match?.[2] ?? '' };
}

export function StatsList(props: { items?: StatItem[] }) {
  const items = props.items && props.items.length > 0 ? props.items : DEFAULT_STATS;

  return (
    <div className="mx-auto flex h-auto w-full max-w-240.5 divide-y divide-ps-black-50 rounded-ps-sm lg:rounded-ps-md border-2 border-ps-black-100/20 bg-white sm:h-35.5! sm:flex-row sm:divide-x sm:divide-y-0">
      {items.map((item, i) => {
        const { num, suffix } = parseValue(item.value);
        return (
          <MetricStat
            key={`${item.label}-${i}`}
            className="border-none text-ps-red-500 !bg-transparent"
            value={<RollingNumber value={num} suffix={suffix} height={52} />}
            label={item.label}
            size="sm"
            align="center"
            icon={
              // oxlint-disable-next-line next/no-img-element -- decorative inline icon; next/image is unnecessary for a static SVG glyph
              <img src={item.icon} alt="" className="h-8 w-8 sm:h-16 sm:w-16 lg:h-18 lg:w-18" />
            }
          />
        );
      })}
    </div>
  );
}

export function HeroStats(props: { data: ResolvedSection }) {
  const items: StatItem[] =
    props.data.items && props.data.items.length > 0
      ? props.data.items.map((item) => ({
          value: item.value ?? '',
          label: item.name ?? '',
          icon: item.logo ?? '',
        }))
      : DEFAULT_STATS;

  return (
    <div className="relative z-40 -mt-18 sm:-mt-20 w-full px-4 md:px-6 mb-24 sm:mb-12 lg:mb-0">
      <StatsList items={items} />
    </div>
  );
}

export function Stats(props: { items?: StatItem[] }) {
  return (
    <div className="absolute -bottom-18 left-1/2 z-50 w-full -translate-x-1/2 sm:-bottom-20 md:px-6">
      <StatsList items={props.items} />
    </div>
  );
}

