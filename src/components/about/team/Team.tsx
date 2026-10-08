import Image from 'next/image';
import Link from 'next/link';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltedCard } from '@/components/ui/TiltedCard';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

function TeamMemberCard(props: { member: SectionItem }) {
  return (
    <div className="flex flex-col items-center">
      <TiltedCard
        imageSrc={props.member.image || '/team/s1.png'}
        altText={props.member.imageAlt ?? props.member.title ?? ''}
        captionText={`${props.member.title ?? ''} • ${props.member.body ?? ''}`}
        containerHeight="330px"
        containerWidth="400px"
        imageHeight="450px"
        imageWidth="400px"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={false}
        innerStyle={{
          background: 'url(/team/s1.png) center/cover no-repeat',
          borderRadius: '20px',
        }}
        borderRadius="20px"
      />

      <div className="w-full text-center">
        <SectionHeading
          title={props.member.title ?? ''}
          description={props.member.body}
          descriptionFontClass="m-0 text-zinc-600"
          titleClassName="m-0 block !font-bold !w-full text-zinc-900"
          titleSize="h5"
          className="w-full !gap-1"
          align="center"
        />
        {props.member.href && (
          <Link
            href={props.member.href}
            className="block w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/team/l.png"
              alt={props.member.ctaLabel ?? props.member.title ?? ''}
              width={60}
              className="mx-auto mt-4 cursor-pointer transition-opacity hover:opacity-80"
              height={20}
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export function Team(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);

  return (
    <section
      className={`${resolved.wrapperClass} my-10 flex w-full justify-center bg-white px-6 lg:my-20`}
    >
      <div className="container">
        {/* Header */}
        <Reveal direction="up" distance={40}>
          <SectionHeading
            title={props.data.heading.title}
            eyebrow={props.data.heading.eyebrow}
            description={props.data.heading.description}
            align="center"
          />
        </Reveal>

        {/* Core Team Section */}
        <div className="mt-12">
          {/* Team Members Grid with staggered reveal */}
          <RevealGroup stagger={0.1} delayChildren={0.3}>
            <div className="my-14 flex flex-wrap justify-center gap-10">
              {props.data.items.map((member) => (
                <Reveal key={member.title} direction="up" distance={48} item>
                  <TeamMemberCard member={member} />
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
