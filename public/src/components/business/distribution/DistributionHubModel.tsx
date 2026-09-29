import { HubModelCard } from '@/components/business/distribution/HubModelCard';
import type { HubModelCardProps } from '@/components/business/distribution/HubModelCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function DistributionHubModel(props: { data: ResolvedSection }) {
  const steps: HubModelCardProps[] = props.data.items.map(item => ({
    icon: item.image ?? '',
    title: item.title ?? '',
    description: item.body ?? '',
  }));
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-25">
      <div className="container px-5 sm:px-8">
        <SectionHeading
          align="left"
          eyebrow={props.data.heading.eyebrow}
          title={props.data.heading.title}
          titleSize="h2"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={cn(
                index < 2 ? 'lg:col-span-3' : 'lg:col-span-2',
                'sm:last:col-span-2 lg:last:col-span-2',
              )}
            >
              <HubModelCard {...step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
