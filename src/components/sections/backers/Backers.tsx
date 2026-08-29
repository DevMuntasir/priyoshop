import { BackersCard } from '@/components/ui/BackersCard';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function Backers(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);

  return (
    <div className={resolved.wrapperClass}>
      <Section>
        <Reveal direction="left" className="mb-11 flex flex-wrap items-start justify-between gap-6">
          <SectionHeading
            titleSize="h2"
            title={heading.title}
            description={heading.description}
            align={resolved.align}
            eyebrow={heading.eyebrow}
            titleColor={resolved.titleColorClass}
          />
        </Reveal>

        <RevealGroup
          stagger={0.08}
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5"
        >
          {items.map((item, index) => (
            <Reveal item direction="up" key={`${item.logo}-${index}`}>
              <BackersCard brand={{ name: item.name ?? '', logo: item.logo ?? '' }} />
            </Reveal>
          ))}
        </RevealGroup>
      </Section>
    </div>
  );
}
