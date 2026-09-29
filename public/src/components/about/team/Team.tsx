import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { TeamConfig, TeamMember } from './data';
import { TEAM_CONFIG } from './data';
import Image from 'next/image';
import Link from 'next/link';

import { TiltedCard } from '@/components/ui/TiltedCard';

function TeamMemberCard(props: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center">
      <TiltedCard
        imageSrc={props.member.image}
        altText={props.member.name}
        captionText={`${props.member.name} • ${props.member.role}`}
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

      <div className="w-full  text-center">
        <SectionHeading
          title={props.member.name}
          description={props.member.role}
          descriptionFontClass="m-0 text-zinc-600"
          titleClassName="m-0 block !font-bold !w-full text-zinc-900"
          titleSize="h5"
          className="w-full !gap-1"
          align="center"
        />
        {props.member.ctaHref && (
          <Link
            href={props.member.ctaHref}
            className="w-full block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/team/l.png"
              alt={props.member.name}
              width={60}
              className="mx-auto mt-4 cursor-pointer hover:opacity-80 transition-opacity"
              height={20}
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export function Team(props: {
  config?: TeamConfig;
}) {
  const config = props.config ?? TEAM_CONFIG;
  return (
    <section className="flex my-10 lg:my-20 px-6 w-full justify-center bg-white">
      <div className="container">
        {/* Header */}
        <Reveal direction="up" distance={40}>
          <SectionHeading
            title={config.title}
            eyebrow={config.badge}
            description={config.description}
            align="center"
          />
        </Reveal>

        {/* Core Team Section */}
        <div className="mt-12">
          {/* Team Members Grid with staggered reveal */}
          <RevealGroup stagger={0.1} delayChildren={0.3}>
            <div className="flex flex-wrap justify-center my-14 gap-10">
              {config.members.map((member) => (
                <Reveal key={member.id} direction="up" distance={48} item>
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
