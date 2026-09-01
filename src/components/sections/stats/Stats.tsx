import { MetricStat } from '@/components/ui/MetricStat';
import { RollingNumber } from '@/components/ui/RollingNumber';

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

export function Stats(props: { items?: StatItem[] }) {
  const items = props.items && props.items.length > 0 ? props.items : DEFAULT_STATS;

  return (
    <div className="absolute -bottom-44 left-1/2 z-50 w-full -translate-x-1/2 px-4 sm:-bottom-24 sm:px-6  lg:px-8">
      <div className="mx-auto flex h-auto w-full max-w-247.5 flex-col divide-y divide-ps-black-50 rounded-ps-xl border-2 border-ps-black-100/20 bg-white p-3  sm:h-45.5! sm:flex-row sm:divide-x sm:divide-y-0 sm:p-5">
        {items.map((item, i) => {
          const { num, suffix } = parseValue(item.value);
          return (
            <MetricStat
              key={`${item.label}-${i}`}
              className=" border-none"
              value={<RollingNumber value={num} suffix={suffix} height={52} />}
              label={item.label}
              size="md"
              align="center"
              icon={
                // oxlint-disable-next-line next/no-img-element -- decorative inline icon; next/image is unnecessary for a static SVG glyph
                <img src={item.icon} alt="" className="h-10 w-10 sm:h-16 sm:w-16 lg:h-18 lg:w-18" />
              }
            />
          );
        })}
      </div>
    </div>
  );
}
